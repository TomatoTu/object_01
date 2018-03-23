import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'set/site/'+api,
      data:data
    }
  }
}

function fetchAndCompleted(api,type,completeType,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      completeType:completeType,
      endpoint: 'system/article/'+api,
      data:data
    }
  }
}


// 加载产品
export function load() {
  return (dispatch, getState) => {
      return dispatch(fetch('load',ActionTypes.SITE_LOAD))
  }
}

// Title
export function updateTitle(data) {
  return (dispatch, getState) => {
    return dispatch(fetch('updatetitle',ActionTypes.SITE_UPDATE_TITLE,data))
  }
}

// update Domain
export function createDomain(domain_name) {
  return (dispatch, getState) => {
    return dispatch(fetch('createdomain',ActionTypes.SITE_CREATE_DOMAIN,{domain_name}))
  }
}
// delete Domain
export function deleteDomain(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('deletedomain',ActionTypes.SITE_DELETE_DOMAIN,{id}))
  }
}

// Factor
export function updateFactor(data) {
  return (dispatch, getState) => {
    return dispatch(fetch('updateicon',ActionTypes.SITE_UPDATE_FACTOR,data))
  }
}

// Email
export function updateEmail(data) {
  return (dispatch, getState) => {
    return dispatch(fetch('updateemail',ActionTypes.SITE_UPDATE_EMAIL,data))
  }
}


