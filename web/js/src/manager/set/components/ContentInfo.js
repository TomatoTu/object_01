import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {load,updateTitle,createDomain,deleteDomain,updateFactor,updateEmail} from '../actions/SiteActions'
import {UploadLi} from './UploadLi';

const fields = [
    "title",
    'domains[].id',
    'domains[].domain_name',
    'domains[].domain_type',
    'refrence.resource_id',
    'refrence.path',
    'email',
]

class ContentInfo extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    $(this.refs.ContentInfo).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
    this.props.load();
  }
  trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
  render() {
     const {
      fields: { title, domains, refrence, email},
      handleSubmit,
      resetForm,
      submitting,
      load,updateTitle,createDomain,deleteDomain,updateFactor,updateEmail
      } = this.props;
      const trimStr = ::this.trimStr;
      let _sel = this;

    return (
        <div className="slide-right-body">
	        <div className="slide-body-in" style={{overflow: 'hidden',width: 'auto',height: '100%'}}  ref='ContentInfo'> 
	            <div className="slide-body-nofoot" id="slide_body1">
	                <div className="title-body">
	                    <h2>网站管理</h2>
	                </div>
                  <form>
	                <div className="siteInfo-box-b">
	                	  <div className="div-siteTitle">
                          <div className="title-border">
                              <h3>网站名称</h3>
                          </div>
                          <div className="site-title clearfix">
                              <div className="fl">
                                  <input type="text" className="input-text-b input-text-w380" placeholder="名称" {...title}/>
                              </div>
                              <div className="fr">
                                  <input type="button" value="更新" className="btn btn-nocolor-b btn-w100" onClick={handleSubmit((data)=>updateTitle(data))}/>
                              </div>
                          </div>
                      </div>
                      <div className="div-siteTitle">
                          <div className="title-border">
                              <h3>网站域名</h3>
                          </div>
                          <div className="site-title clearfix">
                              <div className="fl">
                                  <input type="text" className="input-text-b input-text-w380" placeholder="域名" ref='domain'/>
                              </div>
                              <div className="fr">
                                  <input type="button" value="添加" className="btn btn-nocolor-b btn-w100" onClick={function(){
                                    if(trimStr(_sel.refs.domain.value) != ''){
                                      let handle = handleSubmit((data)=>createDomain(_sel.refs.domain.value));
                                      handle();
                                      _sel.refs.domain.value = '';
                                    }
                                  }}/>
                              </div>
                          </div>
                      </div>
                      <div className="domain">
                          <table width="100%" border="1" cellSpacing="0" cellPadding="0"  className="slide-tb slide-tb-center prd-tb">
                              <thead>
                                  <tr>
                                      <th width="70%">网站域名</th>
                                      <th width="30%">操作</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  
                                      {domains.map(function(domain,index){
                                        if(domain.domain_type.value == '0'){
                                          return (
                                              <tr key={index}>
                                                  <td>{domain.domain_name.value}</td>
                                                  <td></td>
                                              </tr>
                                          );
                                        }else{
                                          return (
                                              <tr key={index}>
                                                  <td>{domain.domain_name.value}</td>
                                                  <td>
                                                  <a href="javascript:void(0);" onClick={function(){
                                                      if(domain.domain_type.value == '1'){
                                                          handleSubmit(()=>deleteDomain(domain.id.value))();
                                                      }
                                                  }}>删除</a>
                                                  </td>
                                              </tr>
                                          );
                                        }
                                      })}
                                  
                              </tbody>
                          </table>
                      </div>
                      <div className="div-icon">
                          <div className="title-border">
                              <h3>网站图标</h3>
                          </div>
                          <UploadLi updateFactor={updateFactor} refrence={refrence} handleSubmit={handleSubmit}/>
                      </div>
                      <div className="div-siteTitle" style={{display:'none'}}>
                          <div className="title-border">
                              <h3>网站邮箱</h3>
                          </div>
                          <div className="site-title clearfix">
                              <div className="fl">
                                  <input type="text" className="input-text-b input-text-w380" placeholder="Email" {...email}/>
                              </div>
                              <div className="fr">
                                  <input type="button" value="更新" className="btn btn-nocolor-b btn-w100" onClick={handleSubmit((data)=>updateEmail(data))}/>
                              </div>
                          </div>
                      </div>
	                </div>
                  </form>
	            </div>
	        </div>
	    </div>
    );
  }
}

ContentInfo = reduxForm({
    form: 'siteInfo',
    fields: fields,
},
state => ({
  initialValues: state.set.site
}),
{load,updateTitle,createDomain,deleteDomain,updateFactor,updateEmail}  
)(ContentInfo);

export default ContentInfo;