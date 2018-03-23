import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import {initial} from './common/initialData';
import Immutable from 'immutable';


console.log(initial);

// 创建store
const store = configureStore(initial);

// 最上层组件root
render(
  <Root store={store} />,
  document.getElementById('edit-containt')
);
