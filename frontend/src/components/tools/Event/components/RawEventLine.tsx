import React from 'react';
import EventFilteredResultType from '../../../../types/event/EventFilteredResultType';

const ColorMap: { [key: number]: string } = {
  1: 'red',
  2: 'green',
};

interface Props {
  eventLines: EventFilteredResultType[];
  color?: string;
  activeAt?: number;
}

export default function RawEventLine({
  eventLines,
  color,
  activeAt = -1,
}: Props) {
  return (
    <>
      {eventLines.map((ep, inx, arr) => {
        if (inx === 0) return null;
        return (
          <line
            key={ep.x.toString() + ep.y.toString()}
            color={color ?? undefined}
            x1={arr[inx - 1].x}
            y1={arr[inx - 1].y}
            x2={ep.x}
            y2={ep.y}
          />
        );
      })}
      {eventLines.map((ep, inx) => (
        <circle
          key={ep.x.toString() + ep.y.toString()}
          cx={ep.x}
          cy={ep.y}
          r={4}
          color={ColorMap[ep.status]}
          strokeWidth={activeAt !== -1 && activeAt === inx ? 4 : undefined}
        />
      ))}
    </>
  );
}
