import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'system/system/'+api,
      data:data
    }
  }
}

function fetchAndCompleted(api,type,completeType,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      completeType:completeType,
      endpoint: 'system/system/'+api,
      data:data
    }
  }
}

// 初始化system数据
export function loadSystem(id) {
  return (dispatch, getState) => {
    return dispatch(fetchAndCompleted('load',ActionTypes.SYSTEM_LOAD_SUCCESS,ActionTypes.CTL_LOAD_COMPLETED,{id}))
  }
}

// 提交
export function updateSystem(data) {
  data['config'] = JSON.stringify(data['config']);
  return (dispatch, getState) => {
    return dispatch(fetch('update',ActionTypes.SYSTEM_SUBMIT_SUCCESS,data))
  }
}
