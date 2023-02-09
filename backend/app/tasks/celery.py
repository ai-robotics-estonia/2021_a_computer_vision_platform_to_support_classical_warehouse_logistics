from datetime import datetime

from celery import Celery
from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.db.models import PointCloud
from app.dependencies import get_db, get_ssh_client, point_cloud_resolver

import app.services.point_cloud_service as point_cloud_service

BROKER_URL = 'redis://laosysteem-cache:6379/0'
celery_app = Celery('tasks', broker=BROKER_URL)


@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(250.0, check_colmap.s(), name='Running job check')


@celery_app.task
def init_remote_job(pc_id: int, colmap_attr_str):
    db: Session = next(g := get_db())
    pc = point_cloud_resolver(pc_id, db)
    ssh = next(gen := get_ssh_client())
    point_cloud_service.initialize_remote_job(db, ssh, pc, colmap_attr_str)


@celery_app.task
def init_point_cloud(pc_id: int):
    g = get_db()
    db: Session = next(g)
    pc = point_cloud_resolver(pc_id, db)
    point_cloud_service.copy_result_from_remote(pc)
    point_cloud_service.init_new_cloud(db, pc)


@celery_app.task
def check_colmap():
    print("Checking colmap progress")
    db: Session = next(get_db())
    not_finished = db.query(PointCloud).filter(and_(PointCloud.queued_at.is_not(None),
                                                    PointCloud.finished_at.is_(None),
                                                    PointCloud.slurm_state.in_(
                                                        ("RUNNING", "COMPLETED", "COMPLETING", "FAILED", "PENDING")
                                                    ))).all()
    if not_finished:
        ssh_client = next(g := get_ssh_client())
        for pc in not_finished:
            print(f"Checking point cloud {pc.id}")
            job_progress = point_cloud_service.query_progress(ssh_client, pc)
            if job_progress[0] == pc.slurm_state:
                continue
            pc.slurm_state = job_progress[0]
            if job_progress[0] in ["COMPLETED", "FAILED"]:
                pc.slurm_exit_code = int(job_progress[3].split(":")[0])
                pc.finished_at = datetime.fromisoformat(job_progress[2])
                if not pc.started_at:
                    pc.started_at = datetime.fromisoformat(job_progress[1])
                if job_progress[0] == "COMPLETED":
                    init_point_cloud.delay(pc.id)
            elif job_progress[0] == "RUNNING":
                pc.started_at = datetime.fromisoformat(job_progress[1])
            db.commit()


if __name__ == '__main__':
    celery_app.start()
