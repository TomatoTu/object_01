import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'store/order/'+api,
      data:data
    }
  }
}

// 加载
export function loadList(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('loadlist',ActionTypes.ORDERLIST_LOAD,status));
  }
}

// 加载
export function load(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('load',ActionTypes.ORDER_LOAD,status));
  }
}

// 加载
export function update(data) {
  data['products'] = JSON.stringify(data['products']);
  return (dispatch, getState) => {
      let state = getState();
      console.log(state);
      let orderList = state.store.orderList;
      data.orderListStatus=orderList.status;
      data.orderListCur=orderList.cur;
      return dispatch(fetch('update',ActionTypes.MENU_ORDER_LIST,data));
  }
}

// 取消
export function orderCancel(status) {
  return (dispatch, getState) => {
      if(true === window.confirm("确定取消订单?")){
        return dispatch(fetch('cancel',ActionTypes.ORDER_CANCEL,status));
      }
  }
}

// 支付
export function orderPay(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('pay',ActionTypes.ORDER_PAY,status));
  }
}

// 发货
export function orderShip(data) {
  return (dispatch, getState) => {
     let state = getState();
      console.log(state);
      let orderList = state.store.orderList;
      data.orderListStatus=orderList.status;
      data.orderListCur=orderList.cur;
      return dispatch(fetch('ship',ActionTypes.MENU_ORDER_LIST,data));
  }
}

// 收货
export function orderReceiv(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('load',ActionTypes.ORDER_RECEIV,{status}));
  }
}

// 删除
export function orderDelete(status) {
  return (dispatch, getState) => {
      if(true === window.confirm("确定删除订单?")){
        return dispatch(fetch('delete',ActionTypes.ORDER_DELETE,status));
      }
  }
}

