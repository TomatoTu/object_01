import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import * as ActionTypes from '../constants/ActionTypes';

import OrderList from '../components/order/OrderList';
import Order from '../components/order/Order';



export default class ContentApp extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    $(this.refs.systemsroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  getComponent(menuStr){
    if(this.props.menu.name == menuStr){
      return true;
    }
    return false;
  }
  render() {
    console.log('ContentApp1');
    console.log(this.props);
    return (
    	<div className="slide-body-in" style={{overflow: 'hidden',width: 'auto',height: '100%'}} ref='systemsroll'> 
    		{::this.getComponent(ActionTypes.MENU_ORDER_LIST) && <OrderList />}
        {::this.getComponent(ActionTypes.MENU_ORDER_SINGLE) && <Order order={this.props.order} cstatus={this.props.status}/>}
        {::this.getComponent(ActionTypes.MENU_MEMBER_LIST) && <ThemeApp />}
        {::this.getComponent(ActionTypes.MENU_MEMBER_SINGLE) && <ThemeApp />}
        {::this.getComponent(ActionTypes.MENU_MEMBER_CREATE) && <ThemeApp />}
        {::this.getComponent(ActionTypes.MENU_PAYMENT) && <ThemeApp />}
        {::this.getComponent(ActionTypes.MENU_STOREMENT) && <ThemeApp />}
    	</div>
    )
  }
}

function menu(state) {
  return {
    ctl: state.store.ctl.menu,
  };
}

export default connect(menu,{})(ContentApp);
