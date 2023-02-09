"""Initial

Revision ID: a7a1b8429fba
Revises: 
Create Date: 2022-06-27 12:38:46.954365

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a7a1b8429fba'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
    op.create_table('_user',
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('is_validated', sa.Boolean(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix__user_email'), '_user', ['email'], unique=True)
    op.create_index(op.f('ix__user_id'), '_user', ['id'], unique=False)
    op.create_table('room',
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('file_path', postgresql.UUID(), server_default=sa.text('uuid_generate_v4()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_room_id'), 'room', ['id'], unique=False)
    op.create_table('image',
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('type', sa.Enum('camera', 'cctv', 'mask', name='imagetypevalues'), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=False),
    sa.Column('file_size', sa.Integer(), nullable=True),
    sa.Column('resolution', sa.String(length=25), nullable=True),
    sa.Column('blurriness', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['room.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('room_id', 'type', 'name', name='UQ_image_room_id_type_name')
    )
    op.create_index(op.f('ix_image_id'), 'image', ['id'], unique=False)
    op.create_table('landmark',
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=False),
    sa.Column('data', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['room_id'], ['room.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_landmark_id'), 'landmark', ['id'], unique=False)
    op.create_table('point_cloud',
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=False),
    sa.Column('file_path', postgresql.UUID(), server_default=sa.text('uuid_generate_v4()'), nullable=False),
    sa.Column('colmap_attributes', sa.Text(), nullable=True),
    sa.Column('additional', sa.Text(), nullable=True),
    sa.Column('matrix', sa.PickleType(), nullable=False),
    sa.Column('queued_at', sa.DateTime(), nullable=True),
    sa.Column('started_at', sa.DateTime(), nullable=True),
    sa.Column('finished_at', sa.DateTime(), nullable=True),
    sa.Column('log', sa.Text(), nullable=True),
    sa.Column('slurm_id', sa.Integer(), nullable=True),
    sa.Column('slurm_exit_code', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['room.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_point_cloud_id'), 'point_cloud', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_point_cloud_id'), table_name='point_cloud')
    op.drop_table('point_cloud')
    op.drop_index(op.f('ix_landmark_id'), table_name='landmark')
    op.drop_table('landmark')
    op.drop_index(op.f('ix_image_id'), table_name='image')
    op.drop_table('image')
    op.drop_index(op.f('ix_room_id'), table_name='room')
    op.drop_table('room')
    op.drop_index(op.f('ix__user_id'), table_name='_user')
    op.drop_index(op.f('ix__user_email'), table_name='_user')
    op.drop_table('_user')
    # ### end Alembic commands ###