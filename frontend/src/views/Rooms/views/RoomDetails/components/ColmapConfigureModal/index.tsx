import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import AppFormGroup from '../../../../../../components/AppFormGroup';
import colmapAttributes from '../../../../../../colmapAttributes';
import matchers, { VocabTree, Exhaustive } from './matchers';
import { objectKeyReplacer } from '../../../../../../utils/mappers/objectMappers';
import ColmapFormType from './ColmapFormType';
import { formHookDotDecoder, formHookDotEncoder } from './utils';
import ColmapAttributeSection from './ColmapAttributeSection';
import MAPPER_ATTRIBUTES from '../../../../../../colmapAttributes/mapperAttributes';
import SIFT_EXTRACTION_ATTRIBUTES from '../../../../../../colmapAttributes/siftExtractionAttributes';
import PATCH_MATCH_STEREO_ATTRIBUTES from '../../../../../../colmapAttributes/patchMatchStereoAttributes';
import STEREO_FUSION_ATTRIBUTES from '../../../../../../colmapAttributes/stereoFusionAttributes';
import VOCAB_TREE_MATCHING_ATTRIBUTES from '../../../../../../colmapAttributes/vocabTreeMatchingAttributes';
import EXHAUSTIVE_MATCHER_ATTRIBUTES from '../../../../../../colmapAttributes/exhaustiveMatchingAttributes';

interface PropsType {
  onHide?(): void;
  onSubmit?(attributes: ColmapFormType): void;
}

const getDefaultValues = () => {
  const defaultValues: ColmapFormType = {};
  for (const attribute of colmapAttributes)
    defaultValues[attribute.name] = attribute.defaultValue;
  return defaultValues;
};

export default function ColmapConfigureModal({
  onSubmit = () => {},
  onHide = () => {},
}: PropsType) {
  const form = useForm<ColmapFormType>({
    defaultValues: objectKeyReplacer(getDefaultValues(), formHookDotEncoder),
  });
  const { handleSubmit, watch } = form;
  const _onSubmit: SubmitHandler<ColmapFormType> = async encoded => {
    const data = objectKeyReplacer(encoded, formHookDotDecoder);
    const ret: ColmapFormType = {};
    const defaults = getDefaultValues();
    for (const field in data) {
      if (field === 'matcher') {
        ret[field] = data[field];
        continue;
      }
      const value = Number(data[field]);
      if (defaults[field] !== value) ret[field] = value;
    }
    onSubmit(ret);
  };
  const matcher = watch('matcher') as unknown as string;

  return (
    <Modal show onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Colmap attributes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ColmapAttributeSection
          title="Mapper"
          attributes={MAPPER_ATTRIBUTES}
          form={form}
        />
        <ColmapAttributeSection
          title="Stereo Fusion"
          attributes={STEREO_FUSION_ATTRIBUTES}
          form={form}
        />
        <ColmapAttributeSection
          title="Patch Match Stereo"
          attributes={PATCH_MATCH_STEREO_ATTRIBUTES}
          form={form}
        />
        <ColmapAttributeSection
          title="Sift Extraction"
          attributes={SIFT_EXTRACTION_ATTRIBUTES}
          form={form}
        />
        <br />
        <AppFormGroup.Select
          getLabel={s => s.label}
          getKey={s => s.key}
          options={matchers}
          name="matcher"
          form={form}
          label="Matcher"
          isRequired
        />
        <br />
        {matcher === VocabTree.key && (
          <ColmapAttributeSection
            title="Vocab Tree Matcher"
            attributes={VOCAB_TREE_MATCHING_ATTRIBUTES}
            form={form}
          />
        )}
        {matcher === Exhaustive.key && (
          <ColmapAttributeSection
            title="Exhaustive Matcher"
            attributes={EXHAUSTIVE_MATCHER_ATTRIBUTES}
            form={form}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(_onSubmit)}>Run colmap</Button>
      </Modal.Footer>
    </Modal>
  );
}
