import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';

// import { setStream } from '../../actions';

import MainLayout from '../index';
import NotesFeed from './feed';


const Notes = () => {
  return (
    <MainLayout history={history}>
      <NotesFeed />
    </MainLayout>
  );
};


export default Notes;
