"""fk_cascade

Revision ID: 3f7377751ab6
Revises: 6afc560531e4
Create Date: 2022-07-12 11:54:39.917388

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f7377751ab6'
down_revision = '6afc560531e4'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('image_room_id_fkey', 'image', type_='foreignkey')
    op.create_foreign_key('image_room_id_fkey', 'image', 'room', ['room_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('landmark_room_id_fkey', 'landmark', type_='foreignkey')
    op.create_foreign_key('landmark_room_id_fkey', 'landmark', 'room', ['room_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('point_cloud_room_id_fkey', 'point_cloud', type_='foreignkey')
    op.create_foreign_key('point_cloud_room_id_fkey', 'point_cloud', 'room', ['room_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('point_cloud_room_id_fkey', 'point_cloud', type_='foreignkey')
    op.create_foreign_key('point_cloud_room_id_fkey', 'point_cloud', 'room', ['room_id'], ['id'])
    op.drop_constraint('landmark_room_id_fkey', 'landmark', type_='foreignkey')
    op.create_foreign_key('landmark_room_id_fkey', 'landmark', 'room', ['room_id'], ['id'])
    op.drop_constraint('image_room_id_fkey', 'image', type_='foreignkey')
    op.create_foreign_key('image_room_id_fkey', 'image', 'room', ['room_id'], ['id'])
    # ### end Alembic commands ###
