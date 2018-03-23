<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\lib\models\BaseModel;
use node\modules\system\models\System;
/**
 * Description of SystemCreateForm
 *
 * @author dingjj
 */
class SystemDeleteForm extends BaseModel{
    public $id;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => System::className(), 'message' => '系统id不存在'],
        ];
    }
    
    public function deleteSystem(){
         
         if(System::deleteAll(self::whereMerge(['id'=>  $this->id])) == 1){
             return $this->id;
         }else{
             throw new \yii\web\BadRequestHttpException();
         }
    }
}
