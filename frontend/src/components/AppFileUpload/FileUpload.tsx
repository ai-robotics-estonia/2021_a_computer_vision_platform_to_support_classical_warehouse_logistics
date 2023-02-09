import React, { useEffect, useMemo, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DropEvent, useDropzone } from 'react-dropzone';
import IFileDto from './IFileDto';
import './style.scss';
import Button from 'react-bootstrap/Button';

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface PropsType {
  multiple?: boolean;
  onAccepted?(files: File[], event: DropEvent): void;
  files?: IFileDto[];
}
const SHOW_STEP = 10;

function FileUpload({ multiple = true, onAccepted, files = [] }: PropsType) {
  const [maxShow, setMaxShow] = useState(SHOW_STEP);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ multiple, onDropAccepted: onAccepted });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (files.length < maxShow)
      setMaxShow(Math.max(Math.ceil(files.length / SHOW_STEP), 1) * SHOW_STEP);
  }, [files.length]);

  return (
    <div className="app-file-upload">
      <div
        className="upload"
        // @ts-ignore
        {...getRootProps({ style })}
      >
        <input {...getInputProps()} />
        <p className="text-center">
          Drag &apos;n&apos; drop file(s) here, or click to upload
        </p>
      </div>

      <div className="files">
        <ul>
          {files.map(({ progress, fileObject, error }, i) =>
            i >= maxShow ? null : (
              <li key={fileObject.name + i}>
                <Row>
                  <Col>{fileObject.name}</Col>
                  <Col className="align-self-center">
                    {progress !== 100 && !error && (
                      <ProgressBar variant="warning" max={100} now={progress} />
                    )}
                    {progress === 100 && !error && (
                      <ProgressBar variant="success" max={100} now={progress} />
                    )}
                    {error && <span className="text-danger">{error}</span>}
                  </Col>
                </Row>
              </li>
            )
          )}
          {files.length > maxShow && (
            <Button
              variant="link"
              className="p-0"
              onClick={() => setMaxShow(maxShow + SHOW_STEP)}
            >
              Show more...
            </Button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
