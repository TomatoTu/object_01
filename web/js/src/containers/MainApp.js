import React, { Component } from 'react';
import {fetch} from '../common/actions/fetch';
import { connect } from 'react-redux';
import DesignApp from '../manager/design/containers/DesignApp';
import HeaderApp from '../manager/header/containers/HeaderApp';
import ThemeApp from '../manager/theme/containers/ThemeApp';
import SystemApp from '../manager/system/containers/SystemApp';
import SetApp from '../manager/set/containers/SetApp';
import StoreApp from '../manager/store/containers/StoreApp';
import PageApp from '../manager/page/containers/PageApp';
import MaskApp from '../manager/mask/containers/MaskApp';
import { MENU_DESIGN, MENU_THEME, MENU_PAGE, MENU_SYSTEM, MENU_SET, MENU_STORE } from '../manager/header/constants/ActionTypes';
import {COMMON_INIT_DATA,CHANGE_SITE}from '../constants/Common'


class MainApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {headerMenu: MENU_DESIGN,template:{},urlstate:1};
  }
  componentWillMount(){
    this.props.getInit();
  }
  handleChangeMenu(headerMenu,isTrue=false,template={}){
      if(headerMenu == MENU_DESIGN&&isTrue){
        $.RefreshPage();
      }
      this.setState({ headerMenu,template});
  }
  getApp(headerMenu){
    if(this.state.headerMenu == headerMenu){
      return true;
    }
    return false;
  }
  onChangeSite(id,istrue){
    if(!istrue){
        this.props.changeSite(::this.handleChangeUrl,id);
    }
  }
  handleChangeUrl(){
    window.location.reload();
  }
  render() {
    const onChangeMenu=::this.handleChangeMenu;
    const onChangeSite=::this.onChangeSite;
    return (
      <div>
          <HeaderApp onChangeMenu={::this.handleChangeMenu} menu={this.state.headerMenu} onChangeSite={onChangeSite}/>
          <DesignApp onChangeMenu={::this.handleChangeMenu} urlstate={this.state.urlstate}/>
          {::this.getApp(MENU_THEME) && <ThemeApp template={this.state.template} onChangeMenu={::this.handleChangeMenu}/>}
          {::this.getApp(MENU_PAGE) && <PageApp onChangeMenu={onChangeMenu}/>}
          {::this.getApp(MENU_SYSTEM) && <SystemApp onChangeMenu={onChangeMenu}/>}
          {::this.getApp(MENU_SET) && <SetApp onChangeMenu={onChangeMenu}/>}
          {::this.getApp(MENU_STORE) && <StoreApp onChangeMenu={onChangeMenu}/>}
          <MaskApp />
      </div>
    );
  }
}



export default connect(() => ({}),{getInit,changeSite})(MainApp);

function getInit() {
  return (dispatch, getState) => {
      return dispatch(fetch('manager/initdata',COMMON_INIT_DATA));
  }
}
function changeSite(func,id) {
  return (dispatch, getState) => {
      return dispatch(fetch('manager/site',CHANGE_SITE,{id},func));
  }
}