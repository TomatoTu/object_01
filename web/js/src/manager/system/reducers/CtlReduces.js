import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {
	isShowSystems:true,
	showSystemId:0,
	showListId:0,
	isShowEdit:false,
  isShowEditCategory:false,
  showCategoryId:0,
	menu:'',
	loaded:false,
	systemTypeId:0,
}

export const ctl = createReducer(initi, {
  // 系统切换
  [ActionTypes.CTL_SYSTEM_CHANGE](state, action) {
    return Object.assign({}, state,{showSystemId:action.showSystemId,systemTypeId:action.systemTypeId,menu:'LIST',isShowSystems:false,loaded:false,})
  },
  // 菜单切换
  [ActionTypes.CTL_MENUS_CHANGE](state, action) {
    action.menu = action.menu?action.menu:'LIST';
    return Object.assign({}, state,{menu:action.menu,isShowEdit:false,loaded:false,isShowEditCategory:false});
  },
  // 返回多系统
  [ActionTypes.CTL_SYSTEM_BACK](state, action) {
    return Object.assign({}, state,{isShowSystems:true,isShowEdit:false,loaded:false,isShowEditCategory:false})
  },
  // 切换编辑
  [ActionTypes.CTL_EDIT_CHANGE](state, action) {
    return Object.assign({}, state,{isShowEdit:true,showListId:action.id,loaded:false,})
  },
  // 切换分类编辑
  [ActionTypes.CTL_EDIT_CATEGORY](state, action) {
    return Object.assign({}, state,{isShowEditCategory:true,showCategoryId:action.id,})
  },
  // 加载完成
  [ActionTypes.CTL_CLOSE_CATEGORY](state, action) {
    return Object.assign({}, state,{isShowEditCategory:false})
  },
  // 加载完成
  [ActionTypes.CTL_LOAD_COMPLETED](state, action) {
    return Object.assign({}, state,{loaded:true})
  }
});
