import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {load,update} from '../../actions/ArticleActions';
import Select from './Select';
import {Ueditor} from './Ueditor';
import {UploadLi} from './UploadLi';
import {UploadDiv} from './UploadDiv';
import {changeMenu} from '../../actions/CtlAction'

const fields = [
    "id",
    "title",
    'system_id',
    "category_id",
    "synopsis",
    'resources[].id',
    'resources[].path',
    'info',
]

class ListEditArticle extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {ctl,load} = this.props;
    load(ctl.showListId,ctl.showSystemId);
  }
  render() {
    const {ctl} = this.props;
    return (
    <div className="slide-body-hasfoot" id="prdEdit">
        {!ctl.loaded && <div className="title-body"><h2>加载中。。。</h2></div>}
        {ctl.loaded && <ArticleForm />}
    </div>
    )
  }
}

class ArticleForm extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){
    }
    render() {
        const { fields: { id,category_id,synopsis,info,resources,title,system_id }, handleSubmit, submitting,resetForm,update,changeMenu} = this.props;
        const imgPath = HOSTCONFIG.WEB_URL;
        return (
            <form onSubmit={handleSubmit((data)=>(update(data)))}>
                <input type="hidden" {...id}/>
                <div className="title-body">
                    <h2>文章编辑</h2>
                </div>
                <div className="prd-con-set">
                    <div className="div-sechalf clearfix">
                        <div className="div-secL">
                            <div className="color-burn">文章基本属性</div>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章名称：</dd>
                                <dd className="dd2">
                                    <input type="text" placeholder="" className="input-text-b" {...title}/>
                                </dd>
                            </dl>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章分类：</dd>
                                <dd className="dd2">
                                    <Select {...category_id}/>
                                </dd>
                            </dl>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章简介：</dd>
                                <dd className="dd2">
                                    <textarea placeholder="" className="input-textarea-b" {...synopsis}></textarea>
                                </dd>
                            </dl>
                        </div>
                        <div className="div-secR">
                            {!resources.length && (<div className="images-b">
                                <div className="images-upload" ref='uploadimgDiv'>
                                    <div className="images-upload-in">
                                        <div className="images-empty"> <span><img src="/images/mulimages-empty.png"/></span><br/>
                                            <UploadDiv hadnleAdd={function(resource){
                                                resources.addField({
                                                    id:resource.id,
                                                    path:resource.url,
                                                });
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>)}
                            {resources.length > 0  && (<div className="images-b">
                                <div className="images-upload">
                                    <div className="images-upload-in">
                                        <div className="images-list images-list1">
                                            <ul className="clearfix">
                                                {resources.map(function(resource,index){
                                                    return (<li key={index}><img src={imgPath+resource.path.value}/>
                                                        <div className="delete-b" onClick={()=>{
                                                            resources.removeField(index)
                                                        }}>
                                                            <div className="btn-delete-b"><span aria-hidden="true" className="glyphicon glyphicon-remove"></span></div>
                                                        </div>
                                                    </li>)
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <Ueditor {...info} id="content" height="200" disabled={false}/>
                </div>
                <div className="foot-fixed-b">
                    <div className="foot-save">
                        <div className="btns-b btns-right">
                            <input type="button" className="btn btn-nocolor-b" value="取消" onClick={()=>changeMenu('LIST')}/>
                            <input type="submit" className="btn btn-green-b" value="保存"/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

ArticleForm = reduxForm({
  form: 'product',
  fields,
},
state => ({
  initialValues: state.system.product
}),
{update,changeMenu}
)(ArticleForm)

function ctl(state){
    return {
        ctl:state.system.ctl,
    }
}

export default connect(ctl,{load})(ListEditArticle);