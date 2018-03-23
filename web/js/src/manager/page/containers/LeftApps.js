import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Left from '../components/Left';
import PageAdd from '../components/PageAdd';
import MenuList from '../components/MenuList';

class LeftApps extends Component {
  render() {
    return (
    	
        <div className="pages-setting-left">
            <PageAdd />
            <MenuList />
        </div>
    );
  }
}

export default LeftApps;
