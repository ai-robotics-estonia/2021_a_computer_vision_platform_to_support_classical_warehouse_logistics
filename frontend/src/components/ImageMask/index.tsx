import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import Masking from '../Masking';
import { imgDataUrlToBlobUrl } from '../../utils/fileUtils';
import './style.scss';

type Props = {
  src: string;
  onClose?(): void;
  onSave?(file: File): Promise<boolean> | boolean;
};

const body = document.getElementsByTagName('body')[0];

export default function ImageMask({
  src,
  onClose = () => {},
  onSave = () => true,
}: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const maskRef = useRef<Masking>(null);

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key.toLowerCase() === 's') {
        const img = ref.current;
        const masking = maskRef.current;
        if (!img || !masking) return toast.error('Elements not found!');
        if (masking.getAreasCount() === 0)
          return toast.warning('No areas selected!');
        const name = img.src.replace(/^.*[\\/]/, '');
        const originalSize = { w: img.naturalWidth, h: img.naturalHeight };
        const canvas = masking.getCanvas(originalSize);
        canvas.toBlob(async blob => {
          if (!blob) return toast.error('Mask file generation error!');
          const file = new File([blob], name + '.png');
          if (await onSave(file)) return toast.success('Mask saved!');
          toast.error('Mask save failed!');
        });
      }
      if (e.key.toLowerCase() === 't') {
        const img = ref.current;
        const masking = maskRef.current;
        if (!img || !masking) return toast.error('Elements not found!');
        if (masking.getAreasCount() === 0)
          return toast.warning('No areas selected!');
        const originalSize = { w: img.naturalWidth, h: img.naturalHeight };
        const canvas = masking.getCanvas(originalSize);

        window.open(imgDataUrlToBlobUrl(canvas.toDataURL()), '_blank');
      }
    };
    document.addEventListener('keydown', eventListener);
    document.body.classList.add('masking-noscroll');
    return () => {
      document.removeEventListener('keydown', eventListener);
      document.body.classList.remove('masking-noscroll');
    };
  }, []);

  return createPortal(
    <div className="img-mask">
      <Masking ref={maskRef} minArea={255}>
        <img
          ref={ref}
          alt="maskable"
          src={src}
          className="max-view"
          draggable={false}
        />
      </Masking>
    </div>,
    body
  );
}
