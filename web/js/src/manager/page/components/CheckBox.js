import React, { Component, PropTypes } from 'react';
import clickaway from '../../../common/higherorder/clickaway';
import { PAGE_STANDTARD, PAGE_SYSTEM, PAGE_EXTERNAL } from '../constants/ActionTypes';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';
import { changePage } from '../actions/PagesActions'


export default class CheckBox extends Component {
  render() {
    const {value} = this.props;
    let checkedClass = value?'checked':'';
    let className = 'checkboxnew '+checkedClass;
    return (
        <p>
            <label className="checkbox-new checkbox-gray">
                
                <input className={className} type="checkbox" data-role="none" id="hide-page" 
                    checked={value}
                    {...this.props}
                    />
                <label htmlFor="hide-page"></label>
                <span>在菜单中显示</span>
            </label>
        </p>
    );
  }
}