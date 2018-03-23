import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {loadSeo,subSeo} from '../actions/SeoActions';

const validate = values => {
  const errors = {}
  if (!values.page_title) {
    errors.page_title = '必须输入内容'
  }
  return errors
}

class ContentSeo extends Component {
  componentDidMount(){
    $(this.refs.ContentSeo).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  componentWillMount(){
    
    this.props.loadSeo();
  }
  render() {
    const {fields: {page_title, page_keywords, page_description, footer_code, header_code}, handleSubmit,submitting,resetForm,subSeo} = this.props;
    return (
        <div className="slide-right-body">
            <div className="slide-body-in" ref='ContentSeo' style={{overflow: 'hidden',width: 'auto',height: '100%'}} > 
                 <div className="slide-body-hasfoot" id="slide_body2">
                    <form onSubmit={handleSubmit(data=>subSeo(data))}>
                        <div className="title-body">
                            <h2>SEO</h2>
                        </div>
                        <div className="input-box-b">
                            <div className="div-input-b">
                                <label className="input-label">标题</label>
                                <input type="text" className="input-text-b" placeholder="输入站点SEO标题" {...page_title}/>
                                {page_title.touched && page_title.error && <div>{page_title.error}</div>}
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">关键字</label>
                                <input type="text" className="input-text-b" placeholder="输入站点SEO关键字" {...page_keywords}/>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">描述</label>
                                <textarea  className="input-textarea-b" placeholder="输入站点SEO描述" {...page_description}></textarea>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">页脚代码</label>
                                <textarea  className="input-textarea-b" placeholder="输入页脚代码" {...footer_code}></textarea>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">页首代码</label>
                                <textarea  className="input-textarea-b" placeholder="输入页首代码" {...header_code}></textarea>
                            </div>
                        </div>
                    </form>
                    <div className="foot-fixed-b">
                        <div className="foot-save">
                            <button type="submit" disabled={submitting} className="btn btn-green-b btn-save-b" onClick={handleSubmit(data=>subSeo(data))}>
                                {submitting ? <i className="fa fa-paper-plane"/> : <i className="fa fa-paper-plane"/>} 保存
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

ContentSeo.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  subSeo: PropTypes.func.isRequired,
  loadSeo:PropTypes.func.isRequired,
}

ContentSeo = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'seo',                           // a unique name for this form
    fields: ['page_title', 'page_keywords', 'page_description', 'footer_code', 'header_code'], // all the fields in your form
    validate,
},
state => ({ // mapStateToProps
  initialValues: state.set.seo // will pull state into form's initialValues
}),
{ loadSeo,subSeo }  
)(ContentSeo);

export default ContentSeo;
