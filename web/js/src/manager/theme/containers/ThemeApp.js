import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Theme from '../components/Theme';
import {updateTheme} from '../actions/ThemeActions';


class ThemeApp extends Component {
  render() {
    return (
          <Theme {...this.props}/>
    );
  }
}



export default connect(()=>({}),{updateTheme})(ThemeApp);
