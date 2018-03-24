import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';


class Note extends Component {
  componentWillMount() {
     this.props.dispatch(fetchNote(this.props.note.id ))
  }

  render() {
    return (
      <div className='message-wrapper'>
        <img className='profile-image' src={ this.props.user.avatarUrl } />
          { this.props.user.username }
          { this.props.message }
          { this.props.date }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    note: state.note,
  };
}

export default connect(mapStateToProps)(Note);
