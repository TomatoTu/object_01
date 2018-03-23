import React, { Component, PropTypes } from 'react';

import {reduxForm} from 'redux-form';

import {memberUpdate,memberCreate} from '../../actions/MemberActions'

const fields = [
	'id',
	'email',
    "password",
    'info.uname',
    'info.utel',
    'info.uphone',
    'info.uaddress',
];

export default class Member extends Component {

  render() {
  	const {
      fields: { id, email, password, info},
      handleSubmit,
      resetForm,
      submitting,
      memberUpdate,
      memberCreate,
      } = this.props;
      const isNew = !!!id.value;
    return (
        <div className="slide-body-hasfoot" id="slide_body1">
        	<form>
	            <div className="title-body">
	                {isNew && <h2>新增会员</h2>}
	                {!isNew && <h2>会员编辑</h2>}
	            </div>
	            <div className="prdSys-sets">
	                {!isNew && (<div className="prdSys-setAll">
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">会员账号：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...email} disabled="true"/></dd>
	                    </dl>
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">用户昵称：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...info.uname} disabled="true"/></dd>
	                    </dl>
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">联系电话：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...info.utel} disabled="true"/></dd>
	                    </dl>
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">手机号码：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...info.uphone} disabled="true"/></dd>
	                    </dl>
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...info.uaddress} disabled="true"/></dd>
	                    </dl>
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...password}/></dd>
	                    </dl>
	                </div>)}
		            {isNew && (<div className="prdSys-setAll">
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">会员账号：</dd>
	                        <dd className="dd2"><input type="text" placeholder="邮箱" className="input-text-b input-text250-b" {...email}/></dd>
	                    </dl>
	                    <dl className="dl_dd_global clearfix">
	                        <dd className="dd1 lh2">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</dd>
	                        <dd className="dd2"><input type="text" placeholder="" className="input-text-b input-text250-b" {...password}/></dd>
	                    </dl>
	                </div>)}
	            </div>
	            <div className="foot-fixed-b">
	                <div className="foot-save">
	                    <div className="btns-b btns-right">
	                        <input type="button" className="btn btn-nocolor-b" value="取消" onClick={resetForm}/>
	                        {isNew && <input type="button" className="btn btn-green-b" value="新增" onClick={handleSubmit((data)=>memberCreate(data))}/>}
	                        {!isNew && <input type="button" className="btn btn-green-b" value="修改" onClick={handleSubmit((data)=>memberUpdate(data))}/>}
	                    </div>
	                </div>
	            </div>
        	</form>
        </div>
    );
  }
}

Member = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'order',                           // a unique name for this form
    fields: fields, // all the fields in your form
},
state => ({ // mapStateToProps
  initialValues: state.store.ctl.menu.member // will pull state into form's initialValues
}),
{memberUpdate,memberCreate}  
)(Member);

export default Member;