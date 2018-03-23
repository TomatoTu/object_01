import React, { Component, PropTypes } from 'react';

import {reduxForm} from 'redux-form';

import {commentUpdate} from '../../actions/CommentActions'

const fields = [
	'id',
	'message',
    "reply",
];

export default class Comment extends Component {

  render() {
  	const {
      fields: { id, message, reply},
      handleSubmit,
      resetForm,
      submitting,
      commentUpdate,
      } = this.props;
    return (
        <div className="slide-body-hasfoot" id="slide_body1">
        	<form>
	            <div className="title-body">
	                <h2>回复评论</h2>
	            </div>
	            <div className="prdSys-sets">
	                <div className="prdSys-setAll">
	                    <div className="div-input-b">
                            <label className="input-label">评论内容</label>
                            <textarea  className="input-textarea-b" placeholder="Google Analytic Code" {...message} disabled='true'></textarea>
                        </div>
	                    <div className="div-input-b">
                            <label className="input-label">回复内容</label>
                            <textarea  className="input-textarea-b" placeholder="Google Analytic Code" {...reply}></textarea>
                        </div>
	                </div>
	            </div>
	            <div className="foot-fixed-b">
	                <div className="foot-save">
	                    <div className="btns-b btns-right">
	                        <input type="button" className="btn btn-nocolor-b" value="取消" onClick={resetForm}/>
	                        <input type="button" className="btn btn-green-b" value="回复" onClick={handleSubmit((data)=>commentUpdate(data))}/>
	                    </div>
	                </div>
	            </div>
        	</form>
        </div>
    );
  }
}

Comment = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'order',                           // a unique name for this form
    fields: fields, // all the fields in your form
},
state => ({ // mapStateToProps
  initialValues: state.store.ctl.menu.comment // will pull state into form's initialValues
}),
{commentUpdate}  
)(Comment);

export default Comment;