import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from '../components/MenuList';
import Systems from '../components/Systems';
import Content from './ContentApp';


class SystemApp extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    $(this.refs.systemsroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  render() {
  	const {isShowSystems} = this.props;
    let style = {};
    if(isShowSystems){
      style = {marginLeft:'0'};
    }
    return (

    	<div className="slide-edit-containt"> 
        	<div className="slide-mask-b"></div>
          
          <div className="slide-edit-containt-in">
            {!isShowSystems&&<Menu />}
            <div className="slide-right-body" style={style}>
                    {isShowSystems&&<Systems onChangeMenu={this.props.onChangeMenu}/>}
                    {!isShowSystems&&<Content />}
            </div>
          </div>
      </div>
    );
  }
}

function systemStatus(state) {
  return {
    isShowSystems: state.system.ctl.isShowSystems
  };
}

export default connect(systemStatus)(SystemApp);
