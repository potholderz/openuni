import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class NoteCard extends Component {

  render() {
    return (
        <div className='message-wrapper'>
          <Link to={'/notes/'+this.props.id} >
          <img className='profile-image'/>
            { this.props.title }
            { this.props.name }
          </Link>
        </div>
    )
  }
}


export default NoteCard;
