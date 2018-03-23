import * as actionTypes from '../constants/ActionTypes';
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

// 初始化system数据
export function load() {
  return (dispatch, getState) => {
    return dispatch(fetch('systems',actionTypes.SYSTEMS_LOAD_SUCCESS))
  }
}

// 删除系统
export function deleteSystem(id) {

  if(window.confirm('是否确认删除！')){
      return (dispatch, getState) => {
        return dispatch(fetch('delete',actionTypes.SYSTEMS_DELETE_SUCCESS,{id}))
      }
  }
}
// 新建系统
export function addSystem(data) {
  return (dispatch, getState) => {
    return dispatch(fetch('create',actionTypes.SYSTEMS_CREATE_SUCCESS,data))
  }
}
