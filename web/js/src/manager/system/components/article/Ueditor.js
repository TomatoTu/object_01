import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select'

var editor = null;
var editorEnd = false;

export class Ueditor extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    
    editor = UE.getEditor(this.props.id, {
         //工具栏
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'insertimage', 'horizontal', 'date', 'time', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts' 
            ]]
            ,lang:"zh-cn"
            //字体
            ,'fontfamily':[
               { label:'',name:'songti',val:'宋体,SimSun'},
               { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
               { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
               { label:'',name:'heiti',val:'黑体, SimHei'},
               { label:'',name:'lishu',val:'隶书, SimLi'},
               { label:'',name:'andaleMono',val:'andale mono'},
               { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
               { label:'',name:'arialBlack',val:'arial black,avant garde'},
               { label:'',name:'comicSansMs',val:'comic sans ms'},
               { label:'',name:'impact',val:'impact,chicago'},
               { label:'',name:'timesNewRoman',val:'times new roman'}
            ]
            //字号
            ,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]
            , enableAutoSave : false
            , autoHeightEnabled : false
            , initialFrameHeight: this.props.height
            , initialFrameWidth: '100%'
            ,readonly:this.props.disabled
    });
    var me = this;
    editor.ready( function( ueditor ) {
      editorEnd = true;
        var value = me.props.value?me.props.value:'<p></p>';
        editor.setContent(value); 
        editor.addListener( "selectionchange", function () {
            me.props.onUpdate(editor.getContent());
            console.log(editor.getContent());
        });
    });
  }
  componentWillUnmount(){
    editor.destroy();
    editor = null;
    editorEnd = false;
  }
  render() {
    if(editorEnd && editor &&this.props.value != editor.getContent()){
      let value = this.props.value?this.props.value:'<p></p>';
      editor.setContent(value);
    }
    return (
        <script id={this.props.id} name="content" type="text/plain">
        </script>
    )
  }
}