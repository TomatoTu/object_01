import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {publish} from '../actions/HeaderActions'

class HeaderApp extends Component {
  render() {
  	const { onChangeMenu,menu,publish,onChangeSite,name} = this.props;
    return (
          <Header onChangeMenu={onChangeMenu} menu={menu} publish={publish} sites={this.props.sites} host={this.props.host} onChangeSite={onChangeSite} name={name}/>
    );
  }
}

function sites(state){
	return {
    name:state.init.site.language.name,
		sites:state.init.sites,
		host:state.init.host,
	}
}

export default connect(sites,{publish})(HeaderApp);
