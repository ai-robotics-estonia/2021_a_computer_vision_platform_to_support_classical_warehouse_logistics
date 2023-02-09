import { RefObject, useEffect } from 'react';

export default function usePan(ref: RefObject<HTMLElement>, pan?: boolean) {
  useEffect(() => {
    if (!ref.current || !pan) return;
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const ele = ref.current;
    const cursor = ele.style.cursor;

    const mouseMoveHandler = function (e: MouseEvent) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');
    };

    const mouseDownHandler = function (e: MouseEvent) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,

        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousedown', mouseDownHandler);

    return () => {
      ele.style.cursor = cursor;
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  }, [pan]);
}
