import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {
  title:'',
  domains:[],
  refrence:{},
  email:''
}

export const site = createReducer(initi, {
  // 加载完成
  [ActionTypes.SITE_LOAD](state, action) {
    return Object.assign({}, state,action.response)
  },
  // 更新title
  [ActionTypes.SITE_UPDATE_TITLE](state, action) {
    return Object.assign({}, state,{title:action.response})
  },
  // 添加域名
  [ActionTypes.SITE_CREATE_DOMAIN](state, action) {
    return Object.assign({}, state,{domains:action.response})
  },
  // 删除域名
  [ActionTypes.SITE_DELETE_DOMAIN](state, action) {
    return Object.assign({}, state,{domains:action.response})
  },
  // 修改图标
  [ActionTypes.SITE_UPDATE_FACTOR](state, action) {
    return Object.assign({}, state,{refrence:action.response})
  },
  // 修改email
  [ActionTypes.SITE_UPDATE_EMAIL](state, action) {
    return Object.assign({}, state,{email:action.response})
  },
});
