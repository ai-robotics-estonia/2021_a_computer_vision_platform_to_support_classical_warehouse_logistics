import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useQuery } from 'react-query';
import FullHoverIconButton from '../../../../../../components/FullHoverIconButton';
import ImgCard from '../../../../../../components/ImgCard';
import LabelValue from '../../../../../../components/LabelValue';
import ModalTriggerBtn from '../../../../../../components/ModalTriggerBtn';
import MatrixModal from '../MatrixModal';
import ColmapConfigurationModal from '../ColmapConfigurationModal';
import PointCloudType from '../../../../../../types/api/PointCloudType';
import LogModal from '../../../../../../components/LogModal';
import { SLURM_STATE } from '../../../../../../utils/classifiers';
import PointCloudService from '../../../../../../services/PointCloudService';

interface PropsType {
  pointCloud: PointCloudType;
  onOpen?(): void;
}

const ItemFinished = ({ pointCloud, onOpen }: PropsType) => {
  const {
    id,
    matrix,
    colmapAttributes,
    pointCount,
    additional,
    slurmExitCode,
    slurmState,
    finishedAt,
    startedAt,
  } = pointCloud;
  const { thumbnail, avgBlurriness, ISO } = JSON.parse(additional ?? '{}');
  const { data: log = '' } = useQuery(['log', pointCloud.id], () =>
    PointCloudService.getLog(pointCloud)
  );
  return (
    <Row>
      {slurmState === SLURM_STATE.COMPLETED && (
        <Col xs={12} md={6} lg={3}>
          <FullHoverIconButton onClick={onOpen} icon="fa-solid fa-eye">
            <ImgCard src={thumbnail ?? '/image/thumbnail.png'} />
          </FullHoverIconButton>
        </Col>
      )}
      {slurmState === SLURM_STATE.COMPLETED && (
        <Col xs={12} md={6} lg={3}>
          <h5>Details</h5>
          <LabelValue label="Id:" value={id} row />
          <LabelValue
            label="Points:"
            value={((pointCount ?? 0) / 1_000_000).toFixed(1) + 'M'}
            row
          />
          <LabelValue label="Transformation:" row empty dep={!!matrix}>
            <ModalTriggerBtn
              variant="link"
              className="p-0"
              render={onHide => (
                <MatrixModal
                  title="Tranformation"
                  matrix={matrix?.flat() ?? []}
                  columns={4}
                  onHide={onHide}
                />
              )}
            >
              View
            </ModalTriggerBtn>
          </LabelValue>
        </Col>
      )}
      <Col md={12} lg={3}>
        <h5>Generation</h5>
        <LabelValue label="Configuration:" row>
          <ModalTriggerBtn
            variant="link"
            className="p-0"
            render={onHide => (
              <ColmapConfigurationModal
                attributes={JSON.parse((colmapAttributes as string) ?? '{}')}
                onHide={onHide}
              />
            )}
          >
            View
          </ModalTriggerBtn>
        </LabelValue>
        <LabelValue label="Slurm State:" value={slurmState} row />
        <LabelValue label="Slurm Exit Code:" value={slurmExitCode} row />
        <LabelValue
          label="Avg blurriness:"
          value={`${(avgBlurriness ?? 0) * 100}%`}
          row
          empty
          dep={avgBlurriness}
        />
        <LabelValue label="ISO:" value={ISO} row empty />
        <LabelValue label="Time taken:" value="2h23m" row />
        <LabelValue
          label="Started At:"
          value={startedAt?.toDisplayDateTime()}
          row
        />
        <LabelValue
          label="Finished At:"
          value={finishedAt?.toDisplayDateTime()}
          row
        />

        <ModalTriggerBtn
          render={onHide => <LogModal onHide={onHide} log={log} />}
        >
          Open full log
        </ModalTriggerBtn>
      </Col>
    </Row>
  );
};

export default function PointCloudItem({ pointCloud, onOpen }: PropsType) {
  return <ItemFinished pointCloud={pointCloud} onOpen={onOpen} />;
}
