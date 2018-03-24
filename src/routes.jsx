import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AsyncProfile from './components/AsyncProfile';
import AsyncStream from './components/lectures/AsyncStream';
import AsyncStreams from './components/lectures/AsyncStreams';
import AsyncNotes from './components/notes/async-notes';
import Banned from './components/Banned';
import Error404 from './components/Error404';
import Logout from './components/Logout';


const Routes = () =>
  <div className='routes'>
    <Switch>
      <Route exact path='/lectures' component={AsyncStreams} />
      <Route exact path='/notes' component={AsyncNotes} />
      <Route path='/strims' component={AsyncStreams} />
      <Route path='/profile' component={AsyncProfile} />
      <Route path='/logout' component={Logout} />
      <Route path='/beand' component={Banned} />
      <Route path='/:service/:channel(.+)' component={AsyncStream} />
      <Route path='/:streamer' component={AsyncStream} />
      <Route component={Error404} />
    </Switch>
  </div>
  ;

export default Routes;
