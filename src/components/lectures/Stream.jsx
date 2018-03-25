import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';
import setPropTypes from 'recompose/setPropTypes';
import renderNothing from 'recompose/renderNothing';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import branch from 'recompose/branch';
import get from 'lodash/get';

import {
  setStream,
  fetchProfileIfLoggedIn,
} from '../../actions';

import MainLayout from '../index';
import Resizeable from '../Resizeable';
import StreamEmbed from './StreamEmbed';


export const Stream = ({
  history,
  service,
  channel,
  rustlerCount,
}) => {
  let stream = (
    <div>
      <StreamEmbed channel={channel} service={service} />
    </div>
  );

  return (
    <MainLayout history={history} rustlerCount={rustlerCount}>
        { stream }
    </MainLayout>
  );
};

Stream.propTypes = {
  history: PropTypes.object.isRequired,
  service: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  rustlerCount: PropTypes.arrayOf(PropTypes.number),
};

export default compose(
  connect(
    state => ({
      rustlerCount: state.streams[state.stream] ? [state.streams[state.stream].rustlers, state.streams[state.stream].viewers] : null,
      isFetchingProfile: state.self.profile.isFetching,
    }),
    {
      setStream,
      fetchProfileIfLoggedIn,
    },
  ),
  setPropTypes({
    streamer: PropTypes.string,
    service: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    setStream: PropTypes.func.isRequired,
  }),
  lifecycle({
    componentDidMount() {
      const { channel, service, streamer } = this.props;
      if (streamer) {
        document.title = `${streamer} - OverRustle`;
        return this.props.setStream(streamer);
      }
      document.title = `${channel} on ${service} - OverRustle`;
      this.props.setStream(channel, service);
      this.props.fetchProfileIfLoggedIn();
    },

    // Catch updates to this component, which usually happen when the user goes
    // to a another stream after having been watching one already.
    componentDidUpdate(prevProps) {
      const { channel, service, streamer } = this.props;

      // Only dispatch action if user has navigated to a different stream.
      const hasChanged = (
        prevProps.channel !== channel ||
        prevProps.service !== service ||
        prevProps.streamer !== streamer
      );
      if (hasChanged) {
        if (streamer) {
          return this.props.setStream(streamer);
        }
        this.props.setStream(channel, service);
      }
    },
  }),
  branch(
    ({ isFetchingProfile }) => isFetchingProfile,
    renderNothing,
    Component => Component,
  ),
)(Stream);
