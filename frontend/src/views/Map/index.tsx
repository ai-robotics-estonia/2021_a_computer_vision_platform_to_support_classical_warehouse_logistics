import React  from 'react';
import Viewer from '../../components/Viewer';
import MainView from '../../components/MainView';

const Map = () => {
  return (
    <MainView>
      <Viewer pan maxHeight={600}/>

      <MainView.Header title="ITC 265" />
    </MainView>
  );
};

export default Map;
