import React from 'react';

interface PropTypes {
  step?: number;
  matrix?: number[];
  onChange?(matrix: number[]): void;
}

const MatrixInput = ({
  step = 0.1,
  matrix,
  onChange = () => {},
}: PropTypes) => {
  if (!matrix || matrix.length < 12) return null;

  const handleChange = (ind: number, value: number) => {
    const t = [...matrix];
    t[ind] = value;
    onChange(t);
  };

  return (
    <>
      {matrix.map((val, ind) => (
        <input
          key={val.toString() + ind.toString()}
          type="number"
          step={step}
          value={val}
          onChange={e => handleChange(ind, Number(e.target.value) ?? 0)}
        />
      ))}
    </>
  );
};

export default MatrixInput;
