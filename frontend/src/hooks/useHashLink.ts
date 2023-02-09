import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function includeHashes(hashes: string[]): string[] {
  return hashes.map(hash => (hash[0] === '#' ? hash : `#${hash}`));
}

export default function useHashLink(
  hashTabs: string[]
): [string, (hashTab: string | null) => void] {
  const index = includeHashes(hashTabs).findIndex(
    tab => tab === window.location.hash
  );

  const [hashTabIndex, setSelectedTabIndex] = useState<number>(
    index === -1 ? 0 : index
  );

  const history = useHistory();

  const handleHashTab = (eventKey: string | null) => {
    if (eventKey === null) {
      history.push({ ...window.location, hash: '' });
      setSelectedTabIndex(0);
    } else {
      history.push({ ...window.location, hash: eventKey });
      setSelectedTabIndex(hashTabs.findIndex(tab => tab === eventKey));
    }
  };
  const hashTab = hashTabs[hashTabIndex];

  return [hashTab, handleHashTab];
}
