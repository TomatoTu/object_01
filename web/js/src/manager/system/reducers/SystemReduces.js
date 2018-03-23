import { combineReducers } from 'redux';
import systems  from './SystemsReduces';
import {set} from './SetReduces';
import {products} from './ProductListReduces';
import {product} from './ProductReduces';
import {ctl} from './CtlReduces';
import {categories} from './categoriesReduces';


const systemReducer = combineReducers({
  systems,set,products,product,ctl,categories
});

export default systemReducer;