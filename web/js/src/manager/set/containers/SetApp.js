import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action名称
import { MENU_INFO, MENU_SEO, MENU_CONTACT } from '../constants/ActionTypes';
// 模板层
import Mask from '../components/Mask';
// 左边按钮
import LeftMenu from '../components/LeftMenu';
// 右边模板
import ContentInfo from '../components/ContentInfo';
import ContentContacts from '../components/ContentContacts';
import ContentSeo from '../components/ContentSeo';
// 表单组件
import {initialize} from 'redux-form';
// actions
import {loadSeo} from '../actions/SeoActions';

class SetApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {setMenu: MENU_INFO};
  }
  handleChangeMenu(setMenu){
      this.setState({ setMenu });
  }
  getContent(menu){
    if(this.state.setMenu == menu){
      return true;
    }
    return false;
  }
  render() {

    return (
  		<div className="slide-edit-containt"> 
  			<Mask />
        <div className="slide-edit-containt-in"> 
          <LeftMenu onSetMenuChange={::this.handleChangeMenu} setMenu={this.state.setMenu} {...this.props}/>
          {this.getContent(MENU_INFO) && <ContentInfo />}
          {this.getContent(MENU_SEO) && <ContentSeo />}
          {this.getContent(MENU_CONTACT) && <ContentContacts />}
        </div>
  		</div>
    );
  }
}

export default connect(() => ({}),{initialize,loadSeo})(SetApp);
