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
import Streams from './lectures/Streams'

import {
  fetchProfileIfLoggedIn,
} from '../actions';

import { fetchStreams } from '../actions/stream';
import { fetchNotes } from '../actions/notes';

import NoteCard from './notes/note-card';
import LectureCard from './lectures/lecture-card';
/**
 * Radio Home Page
 * List current streams featured by cozy.nyc
 *
 * ToDo: div id 'radio-featured' should display image or preview of stream.
 */
class Home extends Component {
  componentWillMount() {
    console.log(this.props)
    this.props.dispatch(fetchStreams()),
    this.props.dispatch(fetchNotes())
  }

  createListNotes() {
    return this.props.notes.map((note) => {
      return (
        <div className='feed' key={ note.id }>
            <NoteCard
              id={ note.id }
              title={ note.title }
              name={ note.name }
              type={ note.noteType }
              />
          <div className='u-cf'></div>
        </div>
      );
    });
  }

  createListStreams() {
    return this.props.streams.map((stream) => {
      return (
        <div className='feed' key={ stream.id }>
            <LectureCard
              id={ stream.id }
              title={ stream.title }
              name={ stream.streamer.name }
              live={ stream.live }
              />
          <div className='u-cf'></div>
        </div>
      );
    });
  }

  render(){
    return (
      <div>
        <Header />

        <div id="feed" className='eight columns'>
          <div className="row">
              <h1>Featured Streams</h1>
              {this.createListStreams()}
          </div>

          <div className="row">
              <h1>Featured Notes</h1>
              {this.createListNotes()}
          </div>
        </div>
        <div id='chat' className='four columns'>
            [Chat Goes Here]
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    streams: state.basicStreams.streams,
    notes: state.notes.notes,
  };
}

export default connect(mapStateToProps)(Home);
