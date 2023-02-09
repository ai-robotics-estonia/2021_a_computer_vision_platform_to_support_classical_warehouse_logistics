import React, {
  Component,
  createRef,
  MouseEventHandler,
  ReactNode,
  MouseEvent,
} from 'react';
import { coordinatesToXYWidthHeight } from '../../utils/mappers/geometryMappers';
import './style.scss';

interface MaskRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Size {
  w: number;
  h: number;
}

const getMaskCanvas = (
  original: Size,
  current: Size,
  areas: MaskRectangle[]
) => {
  const canvas = document.createElement('canvas');
  canvas.width = original.w;
  canvas.height = original.h;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.fillStyle = `#fff`;
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  for (const area of areas) {
    ctx.fillStyle = `#000`;
    ctx.beginPath();
    const x = Math.round((area.x * original.w) / current.w);
    const y = Math.round((area.y * original.h) / current.h);
    const width = Math.round((area.width * original.w) / current.w);
    const height = Math.round((area.height * original.h) / current.h);
    ctx.fillRect(x, y, width, height);
    ctx.fill();
  }
  return canvas;
};

interface PropsType {
  children: ReactNode;
  minArea?: number;
}
interface StateType {
  areas: MaskRectangle[];
  start?: number[];
  end?: number[];
}

class Masking extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      areas: [],
      start: undefined,
      end: undefined,
    };
  }

  containerRef = createRef<HTMLDivElement>();

  getSize = (): Size => {
    const container = this.containerRef.current;
    if (!container) return { w: 0, h: 0 };
    return {
      w: container.offsetWidth,
      h: container.offsetHeight,
    };
  };

  getAreasCount = () => this.state.areas.length;

  getCanvas = (originalSize?: Size) =>
    getMaskCanvas(
      originalSize ?? this.getSize(),
      this.getSize(),
      this.state.areas
    );

  handleMaskStart: MouseEventHandler<HTMLDivElement> = e => {
    if (e.button !== 0) return;
    this.setState({
      start: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
    });
  };

  handleMaskScale: MouseEventHandler<HTMLDivElement> = e => {
    if (e.buttons === 0) {
      this.setState({
        start: undefined,
        end: undefined,
      });
      return;
    }
    this.setState({
      end: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
    });
  };

  handleMaskFinish: MouseEventHandler<HTMLDivElement> = e => {
    const { minArea } = this.props;
    const { start, end } = this.state;
    if (!start || !end || start[0] === end[0] || start[1] === end[1]) {
      this.setState({
        start: undefined,
        end: undefined,
      });
      return;
    }
    const area = coordinatesToXYWidthHeight(
      start[0],
      start[1],
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    if (minArea && area.height * area.width < minArea) return;
    this.setState(({ areas }) => ({
      areas: [...areas, area],
      start: undefined,
      end: undefined,
    }));
  };

  handleAreaRemove = (e: MouseEvent<SVGRectElement>, area: MaskRectangle) => {
    if (e.button !== 2) return;
    this.setState(({ areas }) => ({
      areas: areas.filter(ar => ar !== area),
    }));
  };

  render() {
    const { children } = this.props;
    const { areas, start, end } = this.state;

    return (
      <div
        className="masking"
        ref={this.containerRef}
        onMouseDown={this.handleMaskStart}
        onMouseUp={this.handleMaskFinish}
        onMouseMove={this.handleMaskScale}
      >
        {children}
        <svg
          className="fill-parent masking-canvas"
          onContextMenu={e => e.preventDefault()}
        >
          {areas.map(a => (
            <rect
              onMouseUp={e => this.handleAreaRemove(e, a)}
              onContextMenu={e => e.preventDefault()}
              key={`${a.x},${a.y},${a.width},${a.height}`}
              {...a}
            />
          ))}
          {start && end && (
            <rect
              {...coordinatesToXYWidthHeight(
                start[0],
                start[1],
                end[0],
                end[1]
              )}
            />
          )}
        </svg>
      </div>
    );
  }
}
export default Masking;
