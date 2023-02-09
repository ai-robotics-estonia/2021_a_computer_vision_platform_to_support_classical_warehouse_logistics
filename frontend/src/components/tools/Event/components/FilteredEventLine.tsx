import React from 'react';

interface PropsType {
  test: string;
}

export default function FilteredEventLine(props: PropsType) {
  let random;
  if ((random = ['SOmething', props.test])) return null;
  else if ((random = ['sdasd', 'sdasdasd'])) return null;
  return <div></div>;
}
