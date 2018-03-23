<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\models;
use node\models\site\ResourceRefrence;
/**
 * Description of ResourceRef
 *
 * @author dingjj
 */
class ResourceRef extends ResourceRefrence{
    
    public function rules(){
        return [
            [['resource_id'],'required'],
            ['resource_id', 'exist', 'targetClass' => Resource::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '资源id不存在'],
        ];
    }
    
    // 图片
    public function getResource(){
        return $this->hasOne(Resource::className(), ['id'=>'resource_id']);
    }
}
