import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import CheckBox from './CheckBox';
import Select from './Select';
import {updatePageSystem} from '../actions/PagesActions';

class SystemPage extends Component {

  render() {

    const {fields: {id, name, status,system_id,page_title, page_keywords, page_description, footer_code, header_code}, handleSubmit,submitting,resetForm,updatePageSystem} = this.props;
    return (
        <div className="slide-body-hasfoot" id="standardpage">
            <div className="title-body">
                <h2>编辑-系统页面</h2>
            </div>
            <form onSubmit={handleSubmit(data=>updatePageSystem(data))}>
                <input type="hidden" {...id}/>
                <div className="standard-page">
                    <p className="color-burn">页面名称</p>
                    <div>
                        <input type="text" className="input-text-b input-text-w380" placeholder="名称" {...name}/>
                    </div>
                    <CheckBox {...status}/>
                    <p className="color-burn">系统选择</p>
                    <div className="div-select-b clearfix">
                        <Select {...system_id}/>
                    </div>
                    <div className="title-border hide-show-control mt30">
                        <h3>SEO</h3>
                    </div>
                    <div className="div-input-normal-b advanced-setting ">
                        <div className="div-input-b">
                            <label className="input-label">页面标题</label>
                            <input type="text" className="input-text-b" placeholder="" {...page_title}/>
                        </div>
                        <div className="div-input-b">
                            <label className="input-label">页面描述</label>
                            <input type="text" className="input-text-b" placeholder="" {...page_description}/>
                        </div>
                        <div className="div-input-b">
                            <label className="input-label">关键词</label>
                            <input type="text" className="input-text-b" placeholder="" {...page_keywords}/>
                        </div>
                        <div className="div-input-b">
                            <label className="input-label">页脚代码</label>
                            <textarea  className="input-textarea-b" placeholder="" {...footer_code}></textarea>
                        </div>
                        <div className="div-input-b">
                            <label className="input-label">页首代码</label>
                            <textarea  className="input-textarea-b" placeholder="" {...header_code}></textarea>
                        </div>
                    </div>
                </div>
                <div className="foot-fixed-b">
                    <div className="foot-save">
                        <div className="btns-b btns-right">
                            <input type="button" value="重置" className="btn btn-nocolor-b" onClick={resetForm}/>
                            <input type="submit" value="保存" className="btn btn-green-b"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
  }
}

SystemPage = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'standard',                           // a unique name for this form
    fields: ['id', 'name', 'status','system_id','page_title', 'page_keywords', 'page_description', 'footer_code', 'header_code'], // all the fields in your form
    // validate,
},
state => ({ // mapStateToProps
  initialValues: state.page.pagesObj[state.page.showid], // will pull state into form's initialValues
}),
{ updatePageSystem}  
)(SystemPage);

export default SystemPage;

