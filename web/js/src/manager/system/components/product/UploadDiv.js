import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select'


export class UploadDiv extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const me = this;
    let uploader = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf: 'js/lib/webupload/Uploader.swf',

        // 文件接收服务端。
        server: '/upload/uploadimage',
        //通过粘贴来添加截屏的图片
//                paste:document.body,
        // form数据
        formData:{
            host_id:HOSTCONFIG.HOST_ID,
            encode:'utf-8'
        },
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#uploadimgDiv',
        // 上传的input的name
        fileVal:'upLoad',
        //重复验证
        duplicate: true,
        // 禁用全局拖拽
        disableGlobalDnd: true,
        //文件限制
        fileNumLimit:10,
        fileSingleSizeLimit: 5 * 1024 * 1024,    // 5 M
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
    uploader.on( 'uploadSuccess', function( file,json ) {
        if(json.state == 'SUCCESS'){
            me.props.hadnleAdd(json);
        }else{
            $.ShowResultMag(json.state,false);
        }
    });
  }

  render() {

    return (


        <a href="javascript:void(0);" className="a-btn-glyphicon btn-upload-image" id='uploadimgDiv'> 
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            上传图片
        </a> 

        
    )
  }
}