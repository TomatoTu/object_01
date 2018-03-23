import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {updatePages} from '../actions/PagesActions';
import CheckBox from './CheckBox';

const validate = values => {
  const errors = {}
  let url = values.url;
  if (url && url.indexOf('http') != 0) {
    errors.url = '必须以http://或者https://开头';
  }
  return errors
}

export default class ExternalPage extends Component {

  render() {
    const {fields: {id, name, status,url, target}, handleSubmit,submitting,resetForm,updatePages} = this.props;
    return (
        <div className="slide-body-hasfoot" id="standardpage">
            <div className="title-body">
                <h2>编辑-外链页面</h2>
            </div>
            <form onSubmit={handleSubmit(data=>updatePages(data))}>
                <input type="hidden" {...id}/>
                <div className="externallink-page">
                    <p className="color-burn">页面名称</p>
                    <div>
                        <input type="text" className="input-text-b input-text-w380" placeholder="名称" {...name}/>
                    </div>
                    <CheckBox {...status}/>
                    <p className="color-burn">外链地址</p>
                    <div>
                        <input type="text" className="input-text-b input-text-w380" {...url} placeholder="地址"/>
                        {url.touched && url.error && <div>{url.error}</div>}
                    </div>
                    <p>
                        <label>
                            <input type="radio" name="linkopen" {...target} value='_blank' checked={target.value == '_blank'} />
                            在新窗口中打开
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="radio" name="linkopen" {...target} value='_self' checked={target.value == '_self'} />
                            在当前窗口打开
                        </label>
                    </p>
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


ExternalPage = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'external',                           // a unique name for this form
    fields: ['id', 'name', 'status','url', 'target'], // all the fields in your form
    validate,
},
state => ({ // mapStateToProps
  initialValues: state.page.pagesObj[state.page.showid] // will pull state into form's initialValues
}),
{ updatePages}  
)(ExternalPage);

export default ExternalPage;



