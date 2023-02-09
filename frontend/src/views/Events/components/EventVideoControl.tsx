import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FileUpload from '../../../components/AppFileUpload/FileUpload';
import VideoFramePicker from '../../../components/VideoFramePicker';

interface PropsType {
  frame?: number;
  video?: string;
}

export function EventVideoControl({ frame, video }: PropsType) {
  const [_video, setVideo] = useState<string | undefined>(video);
  return (
    <>
      {!_video && (
        <Card>
          <Card.Img src="/image/camera/1.jpg" />
          <FileUpload
            multiple={false}
            onAccepted={() => setVideo('/video/events/1.mp4')}
          />
        </Card>
      )}
      {_video && <VideoFramePicker value={frame ?? 0} src={_video} />}
    </>
  );
}
