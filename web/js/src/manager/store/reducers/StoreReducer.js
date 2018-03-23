import { combineReducers } from 'redux';

import {ctl} from './CtlReduces';
import {orderList} from './OrderListReduces';
import {memberList} from './MemberReduces';
import {commentList} from './CommentReduces';
import {pays} from './PayReduces';

const storeReducer = combineReducers({
  ctl,orderList,memberList,commentList,pays
});

export default storeReducer;
