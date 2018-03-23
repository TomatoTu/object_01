import { combineReducers } from 'redux';
import pages from './Pages';

const pageReducer = combineReducers({
  pages,
});

export default pageReducer;
