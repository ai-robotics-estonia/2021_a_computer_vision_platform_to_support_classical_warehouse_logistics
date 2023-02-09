import React, { useRef } from 'react';
import usePan from '../../hooks/viewer/usePan';
import './style.scss';

interface PropsType {
  maxHeight?: number;
  maxWidth?: number;
  pan?: boolean;
}

const Viewer = ({ pan, maxHeight, maxWidth }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  usePan(ref, pan);
  return (
    <div className="svg-viewer" style={{ maxHeight, maxWidth }} ref={ref}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2496"
        height="1872"
        x="640"
        y="480"
        overflow="visible"
      >
        <svg
          width="801"
          height="601"
          x="200"
          y="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="layer">
            <title>undefined</title>
            <g id="svg_1">
              <path
                d="m55.97297,25.36037l454.02703,-2.36037l277.72414,136.95402l3.27586,213.04598c0,0 -734.97297,5.33334 -735.02703,5.33334c-0.05405,0 -0.08108,-352.08108 0,-352.97297z"
                fill="none"
                id="svg_4"
                stroke="#000000"
                strokeWidth="5"
              />
              <polyline
                fill="none"
                id="svg_11"
                points="54.48980712890625,124.33334350585938 55.98981475830078,238.33334350585938 57.48981475830078,352.3333435058594 "
                stroke="#d61313"
                strokeWidth="5"
                transform="rotate(1 55.9898 238.333)"
              />
              <ellipse
                cx="652"
                cy="235.33334"
                fill="none"
                id="svg_12"
                rx="21"
                ry="23"
                stroke="#000000"
                strokeWidth="5"
              />
              <rect
                fill="none"
                height="0"
                id="svg_22"
                stroke="#d61313"
                strokeWidth="5"
                width="0"
                x="40.77777"
                y="54.11112"
              />
              <g id="svg_2">
                <path
                  d="m508,41.33334l-108,12.66666c0,0 149,81.33334 147,80.33334c-2,-1 -39,-93 -39,-93z"
                  fill="#ffaaaa"
                  fillOpacity="0.5"
                  id="svg_15"
                  stroke="#c91010"
                  strokeWidth="5"
                />
                <ellipse
                  cx="507"
                  cy="40.33334"
                  fill="none"
                  id="svg_13"
                  rx="10"
                  ry="10"
                  stroke="#c91010"
                  strokeWidth="5"
                />
              </g>
            </g>
          </g>
          <g className="layer">
            <title>Layer 2</title>
            <image height="0" id="svg_5" width="0" x="73" y="3" />
          </g>
        </svg>
      </svg>
    </div>
  );
};

export default Viewer;
