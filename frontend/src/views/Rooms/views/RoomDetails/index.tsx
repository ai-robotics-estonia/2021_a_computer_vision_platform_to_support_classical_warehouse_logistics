import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainView from '../../../../components/MainView';
import URLS, { GET_PATH } from '../../../../utils/urls';
import useBaseServiceQueries from '../../../../hooks/useBaseServiceQueries';
import RoomType from '../../../../types/api/RoomType';
import RoomService from '../../../../services/RoomService';
import useIdParam from '../../../../hooks/useIdParam';
import LabelValue from '../../../../components/LabelValue';
import ColmapConfigureModal from './components/ColmapConfigureModal';
import ModalTriggerBtn from '../../../../components/ModalTriggerBtn';
import PointCloudList from './components/PointCloudList';
import useRoomImageQueries from '../../../../hooks/useRoomImageQueries';
import { IMAGE_TYPE } from '../../../../utils/classifiers';
import CameraImages from './components/CameraImages';
import DirectFileUpload from '../../../../components/AppFileUpload/DirectFileUpload';
import { FileUploadProgress } from '../../../../services/interfaces/IFileService';
import ImageService from '../../../../services/ImageService';
import RoomImages from './components/RoomImages';
import PointCloudService from '../../../../services/PointCloudService';
import PointCloudType from '../../../../types/api/PointCloudType';
import { byId } from '../../../../utils/sorters/apiTypeSorts';
import './style.scss';

const RoomDetails = () => {
  const id = useIdParam();
  const history = useHistory();
  const { useGetQuery } = useBaseServiceQueries<RoomType>(RoomService);
  const { data: room, refetch: refetchRoom } = useGetQuery(id ?? 0);

  const handleRoomDelete = async () => {
    if (!room?.id) return;
    if (await RoomService.delete(room.id)) history.push(URLS.ROOMS);
  };

  const { useSearchQuery } = useRoomImageQueries();
  const { data: cameraImages = [], refetch: cameraRefetch } = useSearchQuery([
    ['type_type', IMAGE_TYPE.CAMERA],
    ['room_id', room?.id.toString() ?? '0'],
  ]);
  const { data: cctvImages = [], refetch: cctvRefetch } = useSearchQuery([
    ['type_type', IMAGE_TYPE.CCTV],
    ['type_type', IMAGE_TYPE.MASK],
    ['room_id', room?.id.toString() ?? '0'],
  ]);

  const handleImageDelete = (id: number) => ImageService.delete(id);

  const handleOpenPointCloud = (pointCloud: PointCloudType) => {
    if (!id) return;
    window.open(GET_PATH.ROOM_POINT_CLOUD(pointCloud.id), '_blank');
  };

  const handleColmapStart = (attribute: { [key: string]: number }) => {
    if (!room?.id) return;
    const colmapAttributes = Object.fromEntries(
      Object.keys(attribute).map(aKey => [
        aKey.replace('.', '_'),
        attribute[aKey],
      ])
    );
    return PointCloudService.save({
      roomId: room.id,
      colmapAttributes,
    } as PointCloudType);
  };

  const { name, description, createdAt, updatedAt } = room ?? {};

  const handleFileUpload = async (
    file: File,
    fileType: string,
    onProgress: FileUploadProgress = () => {},
    onError: (msg: string) => void = () => {}
  ): Promise<boolean> => {
    if (!room) return false;
    return await ImageService.upload(file, room.id, fileType, {
      onProgress,
      onError,
    });
  };

  const isPointCloud = !!room?.pointClouds?.length;

  return (
    <MainView>
      <MainView.Header title="Room Details" />
      <MainView.Content>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col>
                <h2>{name}</h2>
              </Col>
              <Col>
                <NavLink className="float-end" to={GET_PATH.ROOM_EDIT(id ?? 0)}>
                  <Button variant="link">
                    <i className="fa-solid fa-pencil" />
                  </Button>
                </NavLink>
              </Col>
            </Row>
            <LabelValue label="Description:" value={description} />

            <Row>
              <Col sm={12} md={6}>
                <LabelValue
                  label="Is pointcloud:"
                  value={isPointCloud.toString()}
                  row
                />
                <LabelValue label="Location:" value="58.5953 25.0136" row />
                <LabelValue label="Area:" row>
                  43m<sup>2</sup>
                </LabelValue>
                <LabelValue label="Doors:" value="2" row />
              </Col>
              <Col>
                <LabelValue
                  label="Created at:"
                  value={createdAt?.toDisplayDateTime()}
                  row
                />
                <LabelValue
                  label="Updated at:"
                  value={updatedAt?.toDisplayDateTime()}
                  row
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {!isPointCloud && (
          <Card className="mb-3">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Upload room images</Form.Label>
                <DirectFileUpload
                  existingFileNames={cameraImages.map(i => i.name)}
                  onAdd={async (file, progress, onError) => {
                    const res = await handleFileUpload(
                      file,
                      IMAGE_TYPE.CAMERA,
                      progress,
                      onError
                    );
                    cameraRefetch();
                    return res;
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload camera images</Form.Label>
                <DirectFileUpload
                  existingFileNames={cctvImages.map(i => i.name)}
                  onAdd={async (file, progress, onError) => {
                    const res = await handleFileUpload(
                      file,
                      IMAGE_TYPE.CCTV,
                      progress,
                      onError
                    );
                    cctvRefetch();
                    return res;
                  }}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        {room && (
          <CameraImages
            room={room}
            images={cctvImages}
            onDelete={
              isPointCloud
                ? undefined
                : async ({ id }) => {
                    await handleImageDelete(id);
                    cctvRefetch();
                  }
            }
            onMask={async file => {
              const res = await handleFileUpload(file, IMAGE_TYPE.MASK);
              cctvRefetch();
              return res;
            }}
          />
        )}

        {room && (
          <RoomImages
            room={room}
            images={cameraImages}
            onDelete={
              isPointCloud
                ? undefined
                : async ({ id }) => {
                    await handleImageDelete(id);
                    cameraRefetch();
                  }
            }
          />
        )}

        <ModalTriggerBtn
          render={onHide => (
            <ColmapConfigureModal
              onHide={onHide}
              onSubmit={async attributes => {
                await handleColmapStart(attributes);
                refetchRoom();
                onHide();
              }}
            />
          )}
          className="mb-3"
        >
          Create point cloud
        </ModalTriggerBtn>

        <PointCloudList
          onOpen={handleOpenPointCloud}
          pointClouds={room?.pointClouds?.sort(byId) ?? []}
        />

        <Button variant="danger" onClick={handleRoomDelete}>
          Delete Room
        </Button>
      </MainView.Content>
    </MainView>
  );
};

export default RoomDetails;
