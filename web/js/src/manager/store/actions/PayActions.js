import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'store/pay/'+api,
      data:data
    }
  }
}


// 加载
export function load() {
  return (dispatch, getState) => {
      return dispatch(fetch('load',ActionTypes.PAY_LOAD));
  }
}

// 取消
export function alipay(data) {
  return (dispatch, getState) => {
      return dispatch(fetch('alipay',ActionTypes.PAY_LOAD,data.config));
  }
}

// 取消
export function weixin(data) {
  return (dispatch, getState) => {
      return dispatch(fetch('weixin',ActionTypes.PAY_LOAD,data.config));
  }
}

// 取消
export function payDelete(id) {
  return (dispatch, getState) => {
      return dispatch(fetch('delete',ActionTypes.PAY_LOAD,{id}));
  }
}


