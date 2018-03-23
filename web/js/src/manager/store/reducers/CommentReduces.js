import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {
  cur:0,
  system_id:0,
  models:[],
  count:0,
  size:20,
  systems:[],
}

export const commentList = createReducer(initi, {
  // 切换按钮-订单列表
  [ActionTypes.COMMENTLIST_LOAD](state, action) {
    return Object.assign({}, state,action.response);
  },
});
