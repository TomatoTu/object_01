import React, { Component, PropTypes } from 'react';
import clickaway from '../../../../common/higherorder/clickaway';
import { connect } from 'react-redux';
import {loadCategoriesForProduct} from '../../actions/ProductCategoriesActions';


export default class Radio extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleChangeSelect(index){
    this.props.onUpdate(index);
  }
  render() {
    const {value,classes} = this.props;
    let _this = this;
    return (
        <dd class="dd2">
           <div class="img-style-list">
               <ul>
                  {classes.map(function(className,index){
                     let cls = value == index ? 'selected':'';
                     return (
                      <li className={cls} onClick={()=>(::_this.handleChangeSelect(index))}>
                        <div className={className}></div>
                      </li>
                     )
                  })}
               </ul>
           </div>
        </dd>
    );
  }
}