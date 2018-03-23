import React, { Component, PropTypes } from 'react';
import {isEmpty}  from '../../../../common/utils/objects';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadCategories,submitCategories,deleteCategory} from '../../actions/ProductCategoriesActions';
import {changeEditCategory,closEditCategory} from '../../actions/CtlAction'
import Select from '../Select';
import List from '../List';

const fields = [
    "id",
    'name',
    'parent_id',
    'system_id',
    'seo.page_title',
    'seo.page_keywords',
    'seo.page_description',
]

class Category extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {ctl,loadCategories} = this.props;
    loadCategories(ctl.showSystemId);
  }
  render() {
    const {ctl,categories,...actions} = this.props;
    return (
    <div classNameName="slide-body-hasfoot" id="slide_body3">
        <CategorysContent categories={categories} {...actions}/>
        {ctl.isShowEditCategory && <CategoryModal categories={categories} />}
    </div>
    )
  }
}


class CategoryModal extends Component {

  render() {
    const {
      fields: { id, name,parent_id, seo,system_id },
      handleSubmit,
      resetForm,
      submitting,
      submitCategories,
      closEditCategory
      } = this.props;
    let {categories} = this.props;
    let newcategories = [];
    for(let newcategory of categories.categories){
        if(newcategory['id'] != id.value && newcategory['parent_id'] != id.value){
            newcategories.push(newcategory);
        }
    }
    newcategories.unshift({'id':0,'name':'一级分类'});
    return (
        <div className="pop-prd-option-set-b pop-prdClassfiy-set" style={{display: 'block'}}>
            <form onSubmit={handleSubmit(data=>submitCategories(data))}>
                <input type="hidden" {...id}/>
                <div className="pop-header">
                    <h2>产品分类</h2>
                </div>
                <div className="pop-main">
                  <div className="pop-prdClassfiy">
                   <dl className="p_dl_dd clearfix">
                            <dd className="dd1">分类名称：</dd>
                            <dd className="dd2" style={{width:'560px'}}><input type="text" placeholder="" className="input-text-b" {...name}/></dd>
                        </dl>
                        <dl className="p_dl_dd clearfix" style={{zIndex: '998'}}>
                            <dd className="dd1">分类选择：</dd>
                            <dd className="dd2" style={{width:'560px'}}>

                                <Select selects={newcategories} {...parent_id}/>
                            </dd>
                        </dl>
                   <div className="title-border hide-show-control open">
                        <h3>SEO<span><i className="icon-other icon-hide-show"></i></span></h3>
                    </div>
                    <div className="hide-show-control-content " style={{display: 'block'}}>
                        <dl className="p_dl_dd clearfix">
                            <dd className="dd1">分类页面Title：</dd>
                            <dd className="dd2" style={{width:'527px'}}><input type="text" placeholder="" className="input-text-b" {...seo.page_title}/></dd>
                        </dl>
                        <dl className="p_dl_dd clearfix">
                            <dd className="dd1">分类页面关键字：</dd>
                            <dd className="dd2" style={{width:'517px'}}><input type="text" placeholder="" className="input-text-b"  {...seo.page_keywords}/></dd>
                        </dl>
                        <dl className="p_dl_dd clearfix">
                            <dd className="dd1">分类页面描述：</dd>
                            <dd className="dd2" style={{width:'530px'}}><textarea placeholder="" className="input-textarea-b" {...seo.page_description}></textarea></dd>
                        </dl>
                    </div>
               </div>
               </div>
               <div className="pop-footer">
                   <div className="btns-b btns-right">
                       <input type="button" className="btn btn-nocolor-b" value="取消" onClick={closEditCategory}/>
                       <input type="button" className="btn btn-nocolor-b" value="重置" onClick={resetForm} />
                       <input type="submit" className="btn btn-green-b btn-save-b" value="确认" />
                   </div>
               </div>
            </form>
        </div>
    )
  }
}

CategoryModal = reduxForm({
  form: 'CategoryModal',
  fields,
},
function(state){

    let initialValues = state.system.categories.categoriesObj[state.system.ctl.showCategoryId];

    if(!initialValues){
        initialValues={
            "id":-1,
            'name':'新分类',
            'parent_id':0,
            'system_id':state.system.ctl.showSystemId,
        }
        
    }

    if(typeof(initialValues['seo']) == 'undefined' 
        || !initialValues['seo']){

        initialValues['seo']={
            page_title:'',
            page_keywords:'',
            page_description:'',
        };

    }

   return {initialValues}
},
{submitCategories,closEditCategory}
)(CategoryModal)


export class CategorysContent extends Component {

  render() {
    let {categories,changeEditCategory,deleteCategory} = this.props;
    return (
        <div className="slide-body-nofoot" id="slide_body2">
            <div className="title-body title-body-lr">
                <h2>产品分类</h2>
                <a className="btn btn-nocolor-b ar" href="javascript:void(0);" onClick={()=>(changeEditCategory(0))}>新建分类</a> 
            </div>
            <div className="prd-classfiyBox">
                <div className="categories-tb">
                    <div className="categories-header">
                        <div className="col-cate">
                            <div className="cate-left">分类名称</div>
                            <div className="cate-right">操作</div>
                        </div>
                    </div>
                    <div className="categories-list">
                        <MenuUl categories={categories.categoriesArr} changeEditCategory={changeEditCategory} deleteCategory={deleteCategory}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

class MenuUl extends Component {

  render() {
    let {categories,...handles} = this.props;
    return (
        <ul>
            {categories.map(function(category,index){
                return <MenuLi category={category} key={index} {...handles}/>
            })}
        </ul>
    );
  }
}

class MenuLi extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleDeleteConform(id){
    if(confirm('确定删除？')){
        this.props.deleteCategory(id);
    }
  }
  render() {
    let {category,deleteCategory,changeEditCategory} = this.props;
    let hasChildLi = !isEmpty(category['scategories']);
    return (
        <li>
            <div className="col-cate">
                <div className="cate-left"><span>{category.name}</span> </div>
                <div className="cate-right"> 
                    <a href="javascript:void(0);" className="a-edit-link" onClick={()=>(changeEditCategory(category['id']))}>编辑</a>
                    <a href="#" className="a-delete-link" onClick={()=>(::this.handleDeleteConform(category['id']))}>删除</a>
                </div>
            </div>
            {hasChildLi && <MenuUl categories={category['scategories']} deleteCategory={deleteCategory} changeEditCategory={changeEditCategory}/>}
        </li>
    );
  }
}

// CategorysContent = connect((state)=>({categories:state.system.categories.categoriesArr}),{changeEditCategory,deleteCategory})(CategorysContent);

export default connect((state)=>({ctl:state.system.ctl,categories:state.system.categories}),{loadCategories,changeEditCategory,deleteCategory})(Category);