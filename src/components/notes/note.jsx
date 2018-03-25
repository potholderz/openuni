import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';

import MainLayout from '../index';


const Note = () => {
  return (
    <MainLayout history={history}>
      hi
    </MainLayout>
  );
};


export default Note;
