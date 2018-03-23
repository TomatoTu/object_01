import { combineReducers } from 'redux';
import seo from './SeoReducer';
import {site} from './SiteReducer';

const setReducer = combineReducers({
  seo,site
});

export default setReducer;
