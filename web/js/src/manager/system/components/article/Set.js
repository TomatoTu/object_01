import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadSystem,updateSystem} from '../../actions/SystemAction';
import Select from '../Select';
import List from '../List';



const fields = [
    "id",
    'name',
    'config.system.is_share',
    'config.system.is_comment',
    'config.system.comment_limit',
    'config.list.style',
    'config.list.per_page',
    'config.list.order',
    'config.list.is_showtime',
    'config.list.structure',
]

class Set extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {ctl,loadSystem} = this.props;
    loadSystem(ctl.showSystemId);
  }
  render() {
    const {ctl} = this.props;
    return (
    <div className="slide-body-hasfoot" id="slide_body3">
        <SetForm />
    </div>
    )
  }
}
const listClasses = [
    {id:1,name:'newslist-type-img newslist-type-img1'},
    {id:2,name:'newslist-type-img newslist-type-img2'},
    {id:3,name:'newslist-type-img newslist-type-img3'},
    {id:4,name:'newslist-type-img newslist-type-img4'},
    {id:5,name:'newslist-type-img newslist-type-img5'},
    {id:6,name:'newslist-type-img newslist-type-img6'},
    {id:7,name:'newslist-type-img newslist-type-img7'},
];
const perPage = [
    {id:10,name:'10'},
    {id:12,name:'12'},
    {id:16,name:'16'},
    {id:20,name:'20'},
    {id:24,name:'24'},
    {id:28,name:'28'},
    {id:32,name:'32'},
    {id:36,name:'36'},
    {id:40,name:'40'},
    {id:44,name:'44'},
];
const structure = [
    {id:1,name:'上下'},
    {id:2,name:'左右'},
];
class SetForm extends Component {
  render() {
    const {
      fields: { id, name, config },
      handleSubmit,
      resetForm,
      submitting,
      updateSystem
      } = this.props;
    return (
        <form onSubmit={handleSubmit(data=>updateSystem(data))}>
            <input type="hidden" {...id}/>
            <div className="title-body">
                <h2>文章系统设置</h2>
            </div>
            <div className="prdSys-sets">
                <div className="prdSys-setAll">
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh2">系统名称：</dd>
                        <dd className="dd2"><input type="text" placeholder="系统名称" className="input-text-b input-text250-b" {...name}/></dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">文章分享：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_share'  {...config.system.is_share} value='1' checked={config.system.is_share.value == '1'}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_share' {...config.system.is_share} value='0' checked={config.system.is_share.value == '0'}/><span>关闭</span></label>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix" style={{display:"none"}}>
                        <dd className="dd1">文章评论：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_comment' {...config.system.is_comment} value='1' checked={config.system.is_comment.value == '1'}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_comment' {...config.system.is_comment} value='0' checked={config.system.is_comment.value == '0'}/><span>关闭</span></label>
                        </dd>
                    </dl>
                    {config.system.is_comment.value == '1' && (<dl className="dl_dd_global clearfix" style={{display:"none"}}>
                        <dd className="dd1">评论限制：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='comment_limit' {...config.system.comment_limit} value='1' checked={config.system.comment_limit.value == '1'}/><span>所有人可评论</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='comment_limit' {...config.system.comment_limit} value='2' checked={config.system.comment_limit.value == '2'}/><span>仅会员可评论</span></label>
                        </dd>
                    </dl>)}
                </div>
                <div className="prdSys-setList">
                    <div className="title-border">
                        <h3>文章列表设置</h3>
                    </div>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">文章列表样式：</dd>
                        <List lists={listClasses} {...config.list.style}/>
                    </dl>
                     
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh25">每页显示文章数：</dd>
                        <dd className="dd2">
                            <Select selects={perPage} {...config.list.per_page}/>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh25">分类结构：</dd>
                        <dd className="dd2">
                            <Select selects={structure} {...config.list.structure}/>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">文章时间：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_showtime' {...config.list.is_showtime} value='1' checked={config.list.is_showtime.value == '1'}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_showtime' {...config.list.is_showtime} value='0' checked={config.list.is_showtime.value == '0'}/><span>关闭</span></label>
                        </dd>
                    </dl>
                </div>
            </div>
            <div className="foot-fixed-b">
                <div className="foot-save">
                    <div className="btns-b btns-right">
                        <input type="button" className="btn btn-nocolor-b" value="取消" onClick={resetForm}/>
                        <input type="submit" className="btn btn-green-b" value="保存"/>
                    </div>
                </div>
            </div>
        </form>
    )
  }
}
SetForm = reduxForm({
  form: 'set',
  fields,
},
state => ({
  initialValues: state.system.set
}),
{updateSystem}
)(SetForm)


function ctl(state){
    return {
        ctl:state.system.ctl,
    }
}

export default connect(ctl,{loadSystem})(Set);