import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'store/member/'+api,
      data:data
    }
  }
}

// 加载
export function loadList(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('loadlist',ActionTypes.MEMBERLIST_LOAD,status));
  }
}

// 加载
export function load(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('load',ActionTypes.ORDER_LOAD,status));
  }
}

// 加载
export function memberUpdate(data) {
  return (dispatch, getState) => {
      return dispatch(fetch('update',ActionTypes.MENU_MEMBER_LIST,data));
  }
}

// 取消
export function memberCreate(data) {
  return (dispatch, getState) => {
      return dispatch(fetch('create',ActionTypes.MENU_MEMBER_LIST,data));
  }
}

// 取消
export function memberDelete(ids) {
  return (dispatch, getState) => {
      let state = getState();
      let cur = state.store.memberList.cur;
      return dispatch(fetch('delete',ActionTypes.MEMBERLIST_LOAD,{ids,cur}));
  }
}


