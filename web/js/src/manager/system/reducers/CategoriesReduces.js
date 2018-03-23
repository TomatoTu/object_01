import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';
import Immutable from 'immutable';
import {sortBy} from '../../../common/utils/array'

const init = {
  categoriesArr:[],
  categories:[],
  categoriesObj:{}
};

export const categories = createReducer(init, {
  // 加载分类
  [ActionTypes.CATEGORIES_PRODUCT_LOAD_SUCCESS](state, action) {
	  action.response.unshift({'id':0,'name':'未分类'});
    return Object.assign({}, state,{categories:action.response});
  },
  // 加载分类
  [ActionTypes.CATEGORIES_LOAD_SUCCESS](state, action) {
    return Object.assign({}, state, setPages(action.response));
  },
  // 提交分类
  [ActionTypes.CATEGORIES_UPDATE_SUCCESS](state, action) {
    // let newcategories = [];
    // if(state.categoriesObj[action.response['id']]){
    //   for(let category of state.categories){
    //     if(category['id'] == action.response['id']){
    //       newcategories.push(action.response);
    //     }else{
    //       newcategories.push(category);
    //     }
    //   }
    // }else{
    //   newcategories.push(action.response);
    //   for(let category of state.categories){
    //       newcategories.push(category);
    //   }
    // }
    
    // return Object.assign({}, state, setPages(newcategories));
    return Object.assign({}, state, setPages(action.response));
  },
  // 删除分类
  [ActionTypes.CATEGORIES_DELETE_SUCCESS](state, action) {
    let newcategories = [];
    for(let category of state.categories){
      if(category['id'] != action.response){
        newcategories.push(category);
      }
    }
    return Object.assign({}, state, setPages(newcategories));
  },
});

function setPages(pages){
  var Arr = {};
  var Obj = {};
  pages.map(function(elem,index) {

    if(!Arr[elem['parent_id']]) Arr[elem['parent_id']]=[];

    Arr[elem['parent_id']].push(elem);
    Obj[elem['id']] = elem;
  })
  var pagesArr = [];
  pages.map(function(elem,index) {

    if(Arr[elem['id']]){
      elem['scategories'] = Arr[elem['id']];
    }

    if(elem['parent_id'] == '0'){
      pagesArr.push(elem);
    }
  })

  return {categoriesArr:pagesArr,categories:pages,categoriesObj:Obj};
}