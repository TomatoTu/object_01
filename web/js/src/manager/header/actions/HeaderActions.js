import * as actionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';


// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'manager/'+api,
      data:data
    }
  }
}

// 创建页面
export function publish() {
  return (dispatch, getState) => {
      return dispatch(fetch('publish',actionTypes.BUTTON_PUBLISH));
  }
}

