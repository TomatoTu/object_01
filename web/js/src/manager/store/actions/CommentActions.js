import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'store/comment/'+api,
      data:data
    }
  }
}

// 加载
export function loadList(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('loadlist',ActionTypes.COMMENTLIST_LOAD,status));
  }
}

// 加载
export function load(status) {
  return (dispatch, getState) => {
      return dispatch(fetch('load',ActionTypes.ORDER_LOAD,status));
  }
}

// 加载
export function commentUpdate(data) {
  return (dispatch, getState) => {
      return dispatch(fetch('update',ActionTypes.MENU_COMMENT_LIST,data));
  }
}

// 取消
export function memberCreate(data) {
  return (dispatch, getState) => {
      return dispatch(fetch('create',ActionTypes.MENU_COMMENT_LIST,data));
  }
}

// 取消
export function commentDelete(ids) {
  return (dispatch, getState) => {
      let state = getState();
      let cur = state.store.commentList.cur;
      let system_id = state.store.commentList.system_id;
      return dispatch(fetch('delete',ActionTypes.COMMENTLIST_LOAD,{ids,cur,system_id}));
  }
}


