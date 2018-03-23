import React, { Component, PropTypes } from 'react';
import clickaway from '../../../common/higherorder/clickaway';
import { PAGE_STANDTARD, PAGE_SYSTEM, PAGE_EXTERNAL } from '../constants/ActionTypes';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';
import { changePage,deletePage,copyPage,updateMenu,pageHide } from '../actions/PagesActions'

class MenuList extends Component {
  componentDidMount (){
    this.props.pageHide();
    $(this.refs.menulistscroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  end(li){
    var ul = li.parent('ul');
    var Li = ul.parent('li');
    var retArr = {};
    
    if(Li.length == 0){
        retArr['parent'] = 0;
    }else{
        retArr['parent'] = Li.attr('data-id');
    }
    retArr['index'] = $('>li',ul).index(li);
    retArr['current'] = li.attr('data-id');
    this.props.pageHide();
    this.props.updateMenu(retArr);
  }
  bindLi(){
    const end = ::this.end;

    $(this.refs.menulistdrag).liDrag({
        ver:true,
        end:end
    });
  }
  handleCheckMenuList(pageId,e){
    e.stopPropagation();
    console.log('handleCheckMenuList');
    let {pages,deletePage} = this.props;
    if(pages.pagesArr.length>1){
      deletePage(pageId,e);
    }
  }
  render() {
    let {pages,deletePage,...handles} = this.props;
    const bindLi = ::this.bindLi;
    deletePage = ::this.handleCheckMenuList;
    return (
        <div className="pagesnav-manage-box">
            <div className="pagesnav-manage scroll-div" ref="menulistscroll">
                <div className="pagesnav-manage-in">
                    <div className="pagesnav"  ref="menulistdrag">
                        {!isEmpty(pages) && pages.isshow && <MenuUl pages={pages.pagesArr} showid={pages.showid} {...handles} bindLi={bindLi} deletePage={deletePage}/>}
                    </div>
                </div>
            </div>
        </div>
        
    );
  }
}
class MenuUl extends Component {
  render() {
    let {pages,showid,...handles} = this.props;
    return (
        <ul>
            {pages.map(function(page,index){
                return <MenuLi page={page} key={index} showid={showid} {...handles}/>
            })}
        </ul>
    );
  }
}

class MenuLi extends Component {
  componentDidMount (){
    this.props.bindLi();
  }
  render() {
    let {page,showid,changePage,deletePage,copyPage,bindLi} = this.props;
    let hasChildLi = !isEmpty(page['spages']);
    let divclass = showid == page['id'] ? 'active' : '';
    const refName = 'li'+page['id'];
    return (
        <li className="drag" data-id={page['id']}>
            <div className={divclass}><a href="javascript:void(0);" onClick={(e)=>changePage(page['id'],e)}><i className="glyphicon glyphicon-move"></i>{this.props.page.name}<div className="opts"><div onClick={(e)=>copyPage(page['id'],e)}><i className="glyphicon glyphicon-duplicate"></i></div><div onClick={(e)=>deletePage(page['id'],e)}><i className="glyphicon glyphicon-trash"></i></div></div></a></div>
            {hasChildLi && <MenuUl pages={page['spages']} showid={showid} changePage={changePage} deletePage={deletePage} copyPage={copyPage} bindLi={bindLi}/>}
        </li>
    );
  }
}
function select(state) {

  return {
    pages: state.page,
  };
}

MenuList = connect(select,{changePage,deletePage,copyPage,updateMenu,pageHide})(MenuList);
export default MenuList;