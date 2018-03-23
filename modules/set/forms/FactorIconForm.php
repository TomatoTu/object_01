<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\forms;
use node\modules\set\models\ResourceRef;
use node\modules\set\models\Resource;
use node\lib\models\BaseModel;
use node\models\site\ResourceRefrence;
use Yii;
/**
 * Description of FactorIconForm
 *
 * @author dingjj
 */
class FactorIconForm extends ResourceRef{
    
//    public $refrence;
    public function rules(){
        return [
            [['resource_id'],'required'],
            ['resource_id', 'exist', 'targetClass' => Resource::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '资源id不存在'],
        ];
    }
    
    public function updateTitle(){
        
//        $refrence = json_decode($this->refrence,true);
        $resf = ResourceRef::find()->where(self::whereMerge(['type'=>6]))->one();
        if($resf){
            $resf->resource_id = $this->resource_id;
        }else{
            $resf = new ResourceRefrence();
            $resf->setAttributes(self::whereMerge(['type'=>6,'resource_id'=>$this->resource_id]));
        }
        $resf->save();
        return $resf;
    }
}
