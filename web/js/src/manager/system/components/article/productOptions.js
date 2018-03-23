<div className="clearfix">
    <div className="color-burn fl">文章参数</div>
    <div className="text-right fr">
        <input type="button" onclick="$('#prdEdit').show(); " className="btn btn-nocolor-b" value="新建文章参数"/>
    </div>
</div>
<table cellSpacing="0" cellPadding="0" border="1" width="100%" className="slide-tb slide-tb-center shipping-tb">
    <thead>
        <tr>
            <th>名称</th>
            <th>属性</th>
            <th>价格</th>
            <th width="95">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><div className="color-div-td"><span style={{background:'#ff0000'}} className="color-edit"></span>
                    <input type="text" className="input-hidden" value="文章颜色"/>
                </div></td>
            <td><input type="text" className="input-hidden" value="红色"/></td>
            <td><input type="text" className="input-hidden" value="100"/></td>
            <td><span className="i-img i-hasimg"><span aria-hidden="true" className="glyphicon glyphicon-picture"></span></span> <span className="i-delete"><span aria-hidden="true" className="glyphicon glyphicon-remove"></span></span></td>
        </tr>
    </tbody>
</table>