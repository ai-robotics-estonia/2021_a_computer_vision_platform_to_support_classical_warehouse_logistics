import React from 'react';
import { Switch, Route } from 'react-router-dom';
import URLS, { PATHS } from './utils/urls';
import Home from './views/Home';
import Rooms from './views/Rooms';
import RoomEdit from './views/Rooms/views/RoomEdit';
import RoomNew from './views/Rooms/views/RoomNew';
import RoomDetails from './views/Rooms/views/RoomDetails';
import Buildings from './views/Buildings';
import BuildingEdit from './views/Buildings/views/BuildingEdit';
import BuildingNew from './views/Buildings/views/BuildingNew';
import BuildingDetails from './views/Buildings/views/BuildingDetails';
import Map from './views/Map';
import Components from './views/Components';
import PointCloudMap from './views/Tools/views/PointCloudMap';
import CameraMatrix from './views/Tools/views/CameraMatrix';
import CameraCollection from './views/Tools/views/CameraCollection';
import Event from './views/Tools/views/Event';
import Events from './views/Events';
import EventNew from './views/Events/views/EventNew';
import EventDetails from './views/Events/views/EventDetails';

const Router = () => (
  <Switch>
    <Route exact path={URLS.ROOT} component={Home} />

    <Route exact path={URLS.ROOMS} component={Rooms} />
    <Route exact path={URLS.ROOMS_NEW} component={RoomNew} />
    <Route exact path={PATHS.ROOM} component={RoomDetails} />
    <Route exact path={PATHS.ROOM_EDIT} component={RoomEdit} />

    <Route exact path={URLS.EVENTS} component={Events} />
    <Route exact path={URLS.EVENTS_NEW} component={EventNew} />
    <Route exact path={PATHS.EVENT} component={EventDetails} />

    <Route exact path={URLS.BUILDINGS} component={Buildings} />
    <Route exact path={URLS.BUILDINGS_NEW} component={BuildingNew} />
    <Route exact path={PATHS.BUILDING} component={BuildingDetails} />
    <Route exact path={PATHS.BUILDING_EDIT} component={BuildingEdit} />

    <Route exact path={URLS.COMPONENTS} component={Components} />
    <Route exact path={URLS.TOOLS.MAP} component={Map} />
    <Route exact path={URLS.TOOLS.POINT_CLOUD} component={PointCloudMap} />
    <Route exact path={URLS.TOOLS.CAMERA_MATRIX} component={CameraMatrix} />
    <Route exact path={URLS.TOOLS.EVENT} component={Event} />
    <Route
      exact
      path={URLS.TOOLS.CAMERA_COLLECTION}
      component={CameraCollection}
    />
  </Switch>
);

export default Router;
