import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default class List extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleChangeSelect(index){
    this.props.onUpdate(index);
  }
  render() {
    const {value,lists} = this.props;
    let _this = this;
    return (
        <dd className="dd2">
           <div className="img-style-list">
               <ul>
                  {lists.map(function(list,index){
                     let cls = value == list['id'] ? 'selected':'';
                     return (
                      <li className={cls} onClick={()=>(::_this.handleChangeSelect(list['id']))} key={index}>
                        <div className={list['name']}></div>
                      </li>
                     )
                  })}
               </ul>
           </div>
        </dd>
    );
  }
}