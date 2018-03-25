import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import setPropTypes from 'recompose/setPropTypes';
import renderNothing from 'recompose/renderNothing';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import branch from 'recompose/branch';
import get from 'lodash/get';

import Header from './Header';
import Footer from './Footer';
import Resizeable from './Resizeable';
import Chat from './Chat';

import {
  setChatSize,
  fetchProfileIfLoggedIn,
} from '../actions';

/**
 * Radio Home Page
 * List current streams featured by cozy.nyc
 *
 * ToDo: div id 'radio-featured' should display image or preview of stream.
 */
 export const MainLayout = ({
   chatClosed,
   closeChat,
   history,
   service,
   channel,
   chatSize = window.innerWidth - e.pageX,
   setChatSize,
   rustlerCount,
   showLeftChat = false,
 }) => {
    return (
      <div>
        <Header />
        <div className="row">
        <div id="feed" className='eight columns'>
            <div>
              <h1>[Featured Streams Here]</h1>
            </div>
            <div>
              <h1>[Feature Notes Here]</h1>
            </div>
        </div>
        <div id='chat' className='four columns'>
            [Chat Goes Here]
        </div>
        </div>
      </div>
    )
  }

MainLayout.propTypes = {
  rustlerCount: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(connect(
  state => ({
    chatSize: state.ui.chatSize,
    rustlerCount: state.streams[state.stream] ? [state.streams[state.stream].rustlers, state.streams[state.stream].viewers] : null,
    isFetchingProfile: state.self.profile.isFetching,
  }),
  {
    fetchProfileIfLoggedIn,
  },
),
setPropTypes({
  history: PropTypes.object.isRequired,

  // chatSize: PropTypes.number.isRequired,
  rustlerCount: PropTypes.arrayOf(PropTypes.number),
  showLeftChat: PropTypes.bool,

  // setChatSize: PropTypes.func.isRequired,
}),
branch(
  ({ isFetchingProfile }) => isFetchingProfile,
  renderNothing,
  Component => Component,
),
withState('chatClosed', 'setChatClosed', false),
withHandlers({
  closeChat: ({ setChatClosed }) => () => setChatClosed(true),
}),
)(MainLayout);
