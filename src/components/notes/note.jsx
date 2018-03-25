import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';

import MainLayout from '../index';
import { fetchNote } from '../../actions/notes';

class Note extends Component {
  componentWillMount() {
    console.log(this.props)
    this.props.dispatch(fetchNote(this.props.match.params.noteid))
  }
  render(){
    return (
      <MainLayout history={history}>
        <h1>{ this.props.note.title }</h1>
        <a href= {this.props.note.link}>Link</a>
        <p>{ this.props.note.name }</p>
        <p>{this.props.note.description}</p>
      </MainLayout>
    );
  }
};

function mapStateToProps(state) {
  return {
    note: state.note.note,
  };
}

export default connect(mapStateToProps)(Note);
