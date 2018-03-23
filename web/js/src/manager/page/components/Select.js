import React, { Component, PropTypes } from 'react';
import clickaway from '../../../common/higherorder/clickaway';
import { PAGE_STANDTARD, PAGE_SYSTEM, PAGE_EXTERNAL } from '../constants/ActionTypes';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';
import { loadSystems } from '../actions/PagesActions'
import slide from '../../../common/utils/slide'


class Select extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  handleChangeSelect(name,id,update){
    // this.refs.selected.innerHTML = name
    this.close();
    this.props.onUpdate(id);
  }
  componentClickAway () {
    this.close();
  }
  open () {
    this.refs.options.style.display = 'block';
    this.unbindClickAway();
    this.bindClickAway();
  }
  close () {
    this.refs.options.style.display = 'none';
    this.unbindClickAway();
  }
  render() {
    const {value,systems,...selects} = this.props;
    let checkedClass = value?'checked':'';
    let className = 'checkboxnew '+checkedClass;
    let _this = this;
    return (
        <div className="select-box" style={{zIndex: '999', position: 'relative'}}>
            <input type="hidden" value={value}  {...selects} ref="innn"/>
            <div className="select-dl">
                <div className="select-dt" ref="dt" onClick={::this.open}>
                    <div className="selected">
                        <span ref="selected">
                            {systems.map(function(system,index){
                                if(system['id'] == value){
                                    return system['name'];
                                }
                            })}
                        </span>
                    </div>
                    <div className="select-icon"></div>
                </div>
                <div className="select-option" ref="options" >
                    {systems.map(function(system,index){
                        return <div className="" onClick={()=>(::_this.handleChangeSelect(system['name'],system['id']))} key={index}><span>{system['name']}</span></div>
                    })}
                </div>
            </div>
        </div>
    );
  }
}

function systems(state) {
  return {
    systems: state.page.systems,
  };
}

clickaway(Select);

export default connect(systems,{loadSystems})(Select)