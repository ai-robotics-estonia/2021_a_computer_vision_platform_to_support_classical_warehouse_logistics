import { useState } from 'react';

export default function useTriggerArray(
  keys: string[],
  defaultValues: string[] = []
) {
  const [triggers, setTriggers] = useState(defaultValues);

  const handleTriggers = (states: string[]) => setTriggers(states);
  const handleAllOff = () => setTriggers([]);
  const handleAllOn = () => setTriggers(keys);

  const values: { [key: string]: boolean } = Object.fromEntries(
    keys.map(k => [k, triggers.includes(k)])
  );

  return {
    handleTriggers,
    handleAllOff,
    handleAllOn,
    values,
  };
}
