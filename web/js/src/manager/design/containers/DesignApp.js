import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Design from '../components/Design.js';

class DesignApp extends Component {
  render() {
    return (
    	
          <Design {...this.props}/>
    );
  }
}
function templates(state) {

  return {
    templates: state.init.templates,
    site:state.init.site,
  };
}
export default connect(templates)(DesignApp);
