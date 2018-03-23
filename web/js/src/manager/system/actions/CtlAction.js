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


// 切换按钮
export function changeMenu(menu) {
  return {type:actionTypes.CTL_MENUS_CHANGE,menu}
}
// 返回系统
export function returnSystems() {
  return {type:actionTypes.CTL_SYSTEM_BACK}
}
// 修改系统
export function changeSystem(showSystemId,systemTypeId) {
  return {type:actionTypes.CTL_SYSTEM_CHANGE,showSystemId,systemTypeId}
}

// 修改产品
export function changeEdit(id) {

  return {type:actionTypes.CTL_EDIT_CHANGE,id}
}
// 修改分类
export function changeEditCategory(id) {

  return {type:actionTypes.CTL_EDIT_CATEGORY,id}
}
// 关闭分类
export function closEditCategory() {

  return {type:actionTypes.CTL_CLOSE_CATEGORY}
}

