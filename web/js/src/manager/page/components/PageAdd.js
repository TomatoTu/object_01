import React, { Component, PropTypes } from 'react';
import clickaway from '../../../common/higherorder/clickaway';
import { PAGE_STANDTARD, PAGE_SYSTEM, PAGE_EXTERNAL } from '../constants/ActionTypes';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';
import { createPage } from '../actions/PagesActions'

class PageAdd extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {isShowAddMenus: false};
  }
  // 按钮事件
  handleAddPage(e,addPage='',type=0){
    e.preventDefault();
    
    if(this.state.isShowAddMenus){
        this.close();
    }else{
        this.open();
    }
    
    if(addPage!=''){
        if(this.state.isShowAddMenus)this.close();

        console.log('click:'+addPage);
        this.props.createPage({type:type});
    }
  }
  componentClickAway () {
    this.close();
  }
  open () {
    let isShowAddMenus = true;
    this.bindClickAway();
    this.setState({ isShowAddMenus });
  }
  close () {
    this.unbindClickAway();
    let isShowAddMenus = false;
    this.setState({ isShowAddMenus });
  }
  render() {
    return (
        <div className="pages-setting-left-top">
            <span className="pages-tt">页面</span>
            <a className="a-btn-glyphicon a-btn-green" href="javascript:void(0);" onClick={(e)=>(::this.handleAddPage(e,''))}> 
                <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
                添加
            </a>
            {this.state.isShowAddMenus && 
                (<div className="pages-add-b">
                    <div className="pop-down-arrow-b"></div>
                    <div className="pages-add-list-b">
                        <ul>
                            <li><a href="javascript:void(0);" onClick={(e)=>(::this.handleAddPage(e,PAGE_STANDTARD,1))}><i className="icon-other icon-standtardPage"></i>普通页面</a></li>
                            <li><a href="javascript:void(0);" onClick={(e)=>(::this.handleAddPage(e,PAGE_SYSTEM,2))}><i className="icon-other icon-productPage"></i>系统页面</a></li>
                            <li><a href="javascript:void(0);" onClick={(e)=>(::this.handleAddPage(e,PAGE_EXTERNAL,3))}><i className="icon-other icon-storePage"></i>外链页面</a></li>
                        </ul>
                    </div>
                </div>)
            }
        </div>
    );
  }
}


clickaway(PageAdd);
export default  connect(()=>({}),{createPage})(PageAdd);