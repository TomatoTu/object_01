import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select'


export class Upload extends Component {
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
        pick: '#uploadimg',

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
    console.log(this.props);
    let show = '';
    if(this.props.style == '1'){
        show = (<div className="images-upload" ref='uploadimg'>
                <div className="images-upload-in">
                    <div className="images-empty"> <span><img src="/images/mulimages-empty.png"/></span><br/>
                        
                        <a href="javascript:void(0);" className="a-btn-glyphicon btn-upload-image"> <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Upload Image </a> </div>
                </div>
            </div>)
    }else{
        show = (<li id='uploadimg'> 
                <img src="/images/sysadd.png"/>
            </li>)
    }
    console.log(show);

    return (


        {show}

        
    )
  }
}