import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';

// import { setStream } from '../../actions';

import MainLayout from '../index';
// import StreamThumbnail from './StreamThumbnail';


const Notes = () => {
  return (
    <MainLayout history={history}>
      [Notes go here]
    </MainLayout>
  );
};


export default Notes;
