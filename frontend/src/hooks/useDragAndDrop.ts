import { useEffect, useRef } from 'react';
import { dragAndDropMouseEventInstaller } from '../utils/eventListenerUtils';

export default () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    dragAndDropMouseEventInstaller(ref.current as HTMLDivElement);
  }, []);

  return ref;
};
