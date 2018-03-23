import { MENUS_CHANGE,SYSTEM_BACK } from '../constants/ActionTypes';
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

// 切换按钮
export function changeMenu(menu) {
  return {type:MENUS_CHANGE,menu}
}
// 返回系统
export function returnSystems() {
  return {type:SYSTEM_BACK}
}


