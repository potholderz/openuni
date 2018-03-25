import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import Note from './note';
import { fetchNotes } from '../../actions/notes';

class NotesFeed extends Component {
  componentWillMount() {
     this.props.dispatch(fetchNotes())
  }

  createListItems() {
    return this.props.notes.map((note) => {
      return (
        <div className='feed' key={ note.id }>
          <Post
            id={ note.id }
            user={ note.poster }
            image={ note.image }
            message={ note.message }
            date={ note.date } />
          <div className='u-cf'></div>
        </div>
      );
    });
  }

  render() {
    return (
      <div id='feed' className='eight columns'>
        {this.createListItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes.notes,
  };
}

export default connect(mapStateToProps)(NotesFeed);
