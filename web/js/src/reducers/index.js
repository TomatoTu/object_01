import { combineReducers } from 'redux';
import counter from './counter';

import set from '../manager/set/reducers/SetReducers';
import page from '../manager/page/reducers/PagesReducers';
import status from '../manager/mask/reducers/MaskReducers';
import system from '../manager/system/reducers/SystemReduces';
import store from '../manager/store/reducers/StoreReducer';
import header from '../manager/header/reducers/HeadersReducers';
import {init} from './counter';

import accounting from '../common/utils/accounting';

import { reducer as form } from 'redux-form';
const ZERO = 0;
const rootReducer = combineReducers({
  header,set,page,status,system,store,init,
  form
});

export default rootReducer;
