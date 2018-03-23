<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\forms;
use node\modules\set\models\Domain;
/**
 * Description of DomainInfoForm
 *
 * @author dingjj
 */
class DomainDeleteForm extends Domain{
    public function rules()
    {
        return [
            [['id'],'required'],
            ['id', 'exist', 'targetClass' => self::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId()], 'message' => '资源id不存在'],
        ];
    }
    public function deleteDomian(){
        $res = self::deleteAll(['id'=>  $this->id]);
        if($res>0){
            return true;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
}
