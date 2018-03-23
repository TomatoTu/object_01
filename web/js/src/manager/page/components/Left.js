import React, { Component, PropTypes } from 'react';
import clickaway from '../../../common/higherorder/clickaway';
import { PAGE_STANDTARD, PAGE_SYSTEM, PAGE_EXTERNAL } from '../constants/ActionTypes';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';
import { changePage } from '../actions/PagesActions'


export default class Left extends Component {
  
  render() {
    console.log('left');
    return (
        <div className="pages-setting-left">
            <PageAdd />
            <MenuList />
        </div>
    );
  }
}


