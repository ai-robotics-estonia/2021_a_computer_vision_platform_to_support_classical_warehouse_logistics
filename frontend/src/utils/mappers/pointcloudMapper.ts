import PointcloudCoordinate from '../../types/PointcloudCoordinate';

interface PointcloudParserResult {
  coordinates: PointcloudCoordinate[];
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  xD: number;
  yD: number;
}

export const pointcloudStringParser = (points: string, colors: string): PointcloudParserResult => {
  const result = [];

  const coordArr = points.split(":");
  const colorArr = colors.split(":");
  const coordsCount = coordArr.length / 2

  let xOffsetMax = 0;
  let yOffsetMax = 0;
  let xOffsetMin = 0;
  let yOffsetMin = 0;

  for (let i = 0; i < coordsCount; i++) {
    const x = parseFloat(coordArr[i*2]);
    const y = parseFloat(coordArr[i*2+1]);

    xOffsetMax = Math.max(x, xOffsetMax)
    yOffsetMax = Math.max(y, yOffsetMax)
    xOffsetMin = Math.min(x, xOffsetMin)
    yOffsetMin = Math.min(y, yOffsetMin)

    result.push({ x, y, r: colorArr[i*3], g: colorArr[i*3+1], b: colorArr[i*3+2] })
  }

  return {
    coordinates: result,
    xMax: xOffsetMax,
    yMax: yOffsetMax,
    xMin: xOffsetMin,
    yMin: yOffsetMin,
    xD: xOffsetMax - xOffsetMin,
    yD: yOffsetMax - yOffsetMin,
  };
}