import React, { Component, PropTypes } from 'react';

export default class Success extends Component {
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
		        <p>更新成功</p>
		    </div>
		</div>
    )
  }
}