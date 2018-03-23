import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import {normal} from '../actions/MaskActions'

// actions type
import {COMMON_REQUEST,COMMON_SUCCESS,COMMON_FAILURE,COMMON_ERROR,COMMON_NORMAL} from '../..//../constants/Common'

// components
import Error from '../components/Error';
import Failure from '../components/Failure';
import Request from '../components/Request';
import Success from '../components/Success';
import Mask from '../components/Mask';

class MaskApp extends Component {
  render() {

  	const {status,normal} = this.props;
    return (
    		<div>
          {status === COMMON_REQUEST && <Mask/>}
    			{status === COMMON_REQUEST && <Request handleClose={normal}/>}
          {status === COMMON_SUCCESS && <Success handleClose={normal}/>}
          {status === COMMON_FAILURE && <Failure handleClose={normal}/>}
          {status === COMMON_ERROR && <Error handleClose={normal}/>}
    		</div>
    )
  }
}

function status(state) {
  return {
    status: state.status,
  };
}

export default connect(status,{normal})(MaskApp);
