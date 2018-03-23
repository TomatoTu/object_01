import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {load,deleteSystem,addSystem} from '../actions/SystemsAction';
import {changeSystem} from '../actions/CtlAction';

const MENU_DESIGN = 'DESIGN';

class Systems extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    this.props.load();
    $(this.refs.systemssroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  render() {
    let {systems,...actions} = this.props;
    return (
      <div className="slide-body-in" style={{overflow: 'hidden',width: 'auto',height: '100%'}} ref='systemssroll'> 
        <div className="slide-close" onClick={() => this.props.onChangeMenu(MENU_DESIGN)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
        <div className="slide-body-nofoot system-start" id="slide_body3">
            <div className="system-list-b">
                <ul>
                    {systems.map(function(system,index){
                        return <MenuLi system={system} key={index} {...actions}/>
                    })}
                    <MenuEnd />
                </ul>   
            </div>
        </div>
      </div>
    )
  }
}

class MenuLi extends Component {

  render() {
    let {system,changeSystem,deleteSystem} = this.props;
    let systemStr = '';
    let img = '';
    if(system['system_type_id'] == '1'){
      systemStr = <dl className="clearfix"><dd className="dd1">产品数量：</dd><dd className="dd2">{system['productscount']?system['productscount']['count']:0}</dd></dl>;
      img = '/images/prd.png';
    }else{
      systemStr = <dl className="clearfix"><dd className="dd1">文章数量：</dd><dd className="dd2">{system['articlescount']?system['articlescount']['count']:0}</dd></dl>;
      img = '/images/news.png';
    }

    return (
        <li>
          <div className="sysItem">
              <div className="sysItem-in">
                  <div className="sysImg"><img src={img}/></div>
                  <div className="sysText">
                      <div className="sys_dl_dd">
                          <dl className="clearfix">
                              <dd className="dd1">系统名称：</dd>
                              <dd className="dd2">{system['name']}</dd>
                          </dl>                              
                          {systemStr}
                      </div>
                      <div className="sysBtns"> 
                          <a href="javascript:void(0);" className="btn-sysgreen" onClick={(e)=>{changeSystem(system['id'],system['system_type_id'])}}>进入系统</a>
                          <a href="javascript:void(0);" className="btn-sysnoColor" onClick={()=>{deleteSystem(system['id'])}}>删除系统</a> 
                      </div>
                  </div>
              </div>
          </div>
      </li>
    )
  }
}

class MenuEnd extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {addSystem: false};
  }
  handleAddSystem(addSystem){
      this.setState({ addSystem });
  }
  render() {
    return (
        <li>
          <div className="sysItem">
              <div className="sysItem-in">
                  <div className="sysImg"><img src="/images/sysadd.png" /></div>
                  <div className="sysText">
                      {!this.state.addSystem && <LiAddBefore handleAddSystem={::this.handleAddSystem}/>}
                      {this.state.addSystem && <LiAdd handleAddSystem={::this.handleAddSystem}/>}
                  </div>
              </div>
          </div>
      </li>
    )
  }
}

class LiAddBefore extends Component {

  render() {
    let {handleAddSystem} = this.props;
    return (
        <div className="sysEmpty">
            <p>一键新建</p>
            <p>开启高效系统管理工具</p>
            <div className="sysBtns"> 
              <a href="javascript:void(0);" className="btn-sysgreen" onClick={()=>{handleAddSystem(true)}}>创建新系统</a> 
            </div>
        </div>
    )
  }
}

class LiAdd extends Component {

  render() {
    const {fields: {name, system_type_id}, handleSubmit,submitting,resetForm,addSystem,handleAddSystem} = this.props;
    return (
        <div className="sysadd" style={{display:'block'}}>
          <form onSubmit={handleSubmit(data=>addSystem(data))}>
            <div className="sys_dl_dd">
                <dl className="clearfix">
                    <dd className="dd1" style={{lineHeight:'2'}}>系统名称：</dd>
                    <dd className="dd2">
                        <input type="text" className="sysInput" {...name} />
                    </dd>
                </dl>
                <dl className="clearfix">
                    <dd className="dd1">系统类型：</dd>
                    <dd className="dd2">
                        <label className="label label-radio-slide">
                            <input type="radio" name="radio" {...system_type_id} value='1' checked={system_type_id.value == '1'}/>
                            <span>产品系统</span>
                        </label>
                        <label className="label label-radio-slide">
                            <input type="radio" name="radio" {...system_type_id} value='2' checked={system_type_id.value == '2'}/>
                            <span>文章系统</span>
                        </label>
                    </dd>
                </dl>
            </div>
            <div className="sysBtns"> 
              <a href="javascript:void(0);" className="btn-sysgreen" onClick={handleSubmit(data=>{addSystem(data),handleAddSystem(false)})}>确认</a> 
              <a href="javascript:void(0);" className="btn-sysnoColor" onClick={()=>{handleAddSystem(false)}}>取消</a> 
            </div>
          </form>
        </div>
    )
  }
}


LiAdd = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'systems',                           // a unique name for this form
    fields: ['name', 'system_type_id'], // all the fields in your form
    // validate,
},
state => ({ // mapStateToProps
  initialValues: {
    'name':'',
    'system_type_id':1,
  } // will pull state into form's initialValues
}),
{ addSystem}  
)(LiAdd);


function systems(state) {
  return {
    systems: state.system.systems
  };
}

export default connect(systems,{load,changeSystem,deleteSystem})(Systems);

