import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import {
  TextContainer,
  TextContainerContent,
  textToContainers,
} from '../../utils/textContainer';
import TextModal from '../TextModal';
import './style.scss';

interface ContainerPropsType {
  container: TextContainer;
}
const getKey = (c: TextContainerContent, inx: number): string =>
  (typeof c === 'string' ? c : c.match) + inx;

const TextContainerEl = ({
  container: { match, content },
}: ContainerPropsType) => {
  return (
    <Accordion>
      <Accordion.Item eventKey={match}>
        <Accordion.Header>{match}</Accordion.Header>
        <Accordion.Body>
          {content.map((c, inx) => (
            <TextContainerContentEl key={getKey(c, inx)} children={c} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const TextContainerContentEl = ({
  children: c,
}: {
  children: TextContainerContent;
}) => {
  return typeof c === 'string' ? <>{c}</> : <TextContainerEl container={c} />;
};

interface PropsType {
  log?: string;
  onHide?(): void;
}

export default function LogModal({ log, onHide }: PropsType) {
  const [formatted, setFormatted] = useState(true);
  return (
    <TextModal
      className="container-log"
      monospace
      title="Log"
      onHide={onHide}
      size="xl"
    >
      {!log && 'Log not available'}
      {!!log && (
        <Stack className="mb-3">
          {formatted && (
            <Button onClick={() => setFormatted(false)} className="ms-auto">
              Raw
            </Button>
          )}
          {!formatted && (
            <Button onClick={() => setFormatted(true)} className="ms-auto">
              Formatted
            </Button>
          )}
        </Stack>
      )}
      {formatted &&
        textToContainers(log ?? '', [
          [/Environmental variables:/g],
          [
            /Running command: \n/g,
            [
              /={78}\n.*\n={78}\n/g,
              [/Processed file \[\d*\/\d*]\n/g],
              /Elapsed time:/g,
            ],
          ],
        ]).map((c, inx) => (
          <TextContainerContentEl key={getKey(c, inx)} children={c} />
        ))}
      {!formatted && log}
    </TextModal>
  );
}
