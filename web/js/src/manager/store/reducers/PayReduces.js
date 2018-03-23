import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = [];

export const pays = createReducer(initi, {
  // 切换按钮-订单列表
  [ActionTypes.PAY_LOAD](state, action) {
    return action.response;
  },
});
