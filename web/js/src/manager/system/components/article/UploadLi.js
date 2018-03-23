import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select'


export class UploadLi extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const _self = this;
    console.log(_self);
    const uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: HOSTCONFIG.WEB_URL + '/js/lib/webupload/Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#uploadimgLi',

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
    console.log(uploader);
  }
  render() {
    return (


        <li id='uploadimgLi'> 
            <img src="/images/sysadd.png"/>
        </li>

        
    )
  }
}