import React, { Component, PropTypes } from 'react';
import {loadPages} from '../actions/SystemAction';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {deleteProduct,topProduct,untopProduct,deleteManyProduct} from '../actions/ProductActions';
import { Table } from 'antd';
import 'antd/style/index.less';



class ListRecords extends Component {
  constructor(props, context) {
    super(props, context);
    let selectedRowKeys = [];
    let selectedRows = [];
    this.state = { selectedRowKeys,selectedRows };
  }
  onSelectChange(selectedRowKeys,selectedRows) {
    console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
    this.setState({ selectedRowKeys,selectedRows });
  }
  handleDeleteMany(){
    console.log('emp');
    this.setState({ 'selectedRowKeys':[], 'selectedRows': []});
  }
  render() {
    let {system,deleteProduct,topProduct,untopProduct,deleteManyProduct} = this.props;
    const {selectedRowKeys,selectedRows } = this.state;
    const columns = [
      { title: '图片', dataIndex: 'resources', key: 'id',render:(value)=> <img className="prd_img" src={value.length==0?'':HOSTCONFIG.WEB_URL+value[0].path}/>},
      { title: '产品名称', dataIndex: 'title', key: 'title' },
      { title: '产品分类', dataIndex: 'categories', key: 'type',render:(value)=> value.name },
      { title: '操作', dataIndex: '', key: 'x', render(text,record){
        return (<span>
          <a href="javascript:void(0);" onClick={()=>deleteProduct(record['id'])}>删除</a>

          {record['is_top'] > 0 && <a href="javascript:void(0);" onClick={()=>untopProduct(record['id'])}>取消置顶</a>}
          {record['is_top'] == 0 && <a href="javascript:void(0);" onClick={()=>topProduct(record['id'])}>置顶</a>}
          <a href="javascript:void(0);" onClick={()=>deleteProduct(record['id'])}>删除</a>
        </span>)
      }  }
    ];
    const data = system.system.products;
    const pagination = {
          total: data.length,
          showSizeChanger: true,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: ::this.onSelectChange,
    };
    return (
      <div className="slide-body-hasfoot" id="slide_body1">
          <div className="title-body">
              <h2>产品列表</h2>
          </div>
          <div className="prd-list-set">
              <div className="clearfix">
                  
                  <div className="text-right fr">
                      <input type="button" value="新建产品" className="btn btn-nocolor-b" onClick=""/>
                  </div>
              </div>
              <div className="prd-list-table">
                  <div className="tb-operate">
                      <a href="javascript:void(0);" onClick={()=>deleteManyProduct(selectedRows,::this.handleDeleteMany())}>批量删除</a> 
                  </div>
                  <Table rowSelection={rowSelection}  columns={columns} dataSource={data} pagination={pagination} bordered/>

                  <div className="clear"></div>
              </div>
          </div>
      </div>
    )
  }
}

function system(state) {
  return {
    system: state.system.system
  };
}


export default connect(system,{deleteProduct,topProduct,untopProduct,deleteManyProduct})(ListRecords);