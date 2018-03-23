import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {changeMenu,returnSystems} from '../actions/CtlAction'

export default class MenuList extends Component {

  render() {
  	const {ctl,changeMenu,returnSystems} = this.props;
  	const isProduct = ctl.systemTypeId == 1;
  	const name = isProduct?'产品':'文章';
  	const menu = ctl.menu;
    return (
        <div className="slide-left-box">
	        <div className="slide-left-menu-scroll scroll-div">
	            <div className="slide-left-menu">
	                <div className="btn-back"><a href="javascript:void(0);" onClick={returnSystems}>返回</a></div>
	                <div className="menu-list">
	                    <ul>
	                        <li data-tab="1" className={menu=='LIST'?'cur':''} onClick={()=>{changeMenu('LIST')}}>
	                            <div className="li-link"> <i className="icon-design icon-sysSet1"></i> <span className="span_name">{name}列表</span> </div>
	                        </li>
	                        <li data-tab="2" className={menu=='CATEGORY'?'cur':''} onClick={()=>{changeMenu('CATEGORY')}}>
	                            <div className="li-link"> <i className="icon-design icon-sysSet2"></i> <span className="span_name">{name}分类</span> </div>
	                        </li>
	                        <li data-tab="3" className={menu=='SET'?'cur':''} onClick={()=>{changeMenu('SET')}}>
	                            <div className="li-link"> <i className="icon-design icon-sysSet3"></i> <span className="span_name">系统设置</span> </div>
	                        </li>
	                        <li data-tab="4" className={menu=='RECYCLE'?'cur':''} onClick={()=>{changeMenu('RECYCLE')}}>
	                            <div className="li-link"> <i className="icon-design icon-sysSet4"></i> <span className="span_name">{name}回收站</span> </div>
	                        </li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	    </div>
    )
  }
}

function system(state) {
  return {
    ctl: state.system.ctl
  };
}

export default connect(system,{changeMenu,returnSystems})(MenuList);