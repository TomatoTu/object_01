import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {
}

export const headerR = createReducer(initi, {
  [ActionTypes.BUTTON_PUBLISH](state, action) {
  	$.ShowResultMag("发布成功！",true);
    return state;
  },
});
