import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';


const MainLayout = ({
  showHeader = true,
  rustlerCount,
  history,
  children,
}) =>
  <div>
    {showHeader ? <Header rustlerCount={rustlerCount} history={history} /> : null}
    <div className='eight columns'>
      {children}
    </div>
    <div id='chat' className='four columns'>
      [Chat Goes Here]
    </div>
    <div className='u-cf'></div>
  </div>
  ;

MainLayout.propTypes = {
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  rustlerCount: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
};

export default MainLayout;
