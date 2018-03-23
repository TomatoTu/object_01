import React, { Component, PropTypes } from 'react';

export default class Error extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
  	const {handleClose} = this.props;
    setTimeout(() => {
      handleClose();
    }, 1000);
  }
  render() {
    return (
        <div className="pop-notice-b" style={{width: '330px', left: '40%',display:'block',zIndex: '88888',padding: '20px 20px 0'}}>
		    
		    <div className="pop-notice-con-b">
		        <p>操作失败，请稍候再试，或联系管理员</p>
		    </div>
		</div>
    )
  }
}