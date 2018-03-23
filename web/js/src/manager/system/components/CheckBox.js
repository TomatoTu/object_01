import React, { Component, PropTypes } from 'react';


export default class CheckBox extends Component {
  render() {
    const {isChecked,handleCheckBox,value} = this.props;
    let checkedClass = isChecked?'checked':'';
    let className = 'checkboxnew '+checkedClass;
    return (
        <label className="checkbox-new checkbox-gray">
            
            <input className={className} type="checkbox" data-role="none" id={'checkbox'+value} value={value} checked={isChecked} onChange={()=>handleCheckBox(value)}/>
            <label htmlFor={'checkbox'+value}></label>
        </label>
    );
  }
}