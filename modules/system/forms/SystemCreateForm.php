<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\lib\models\BaseModel;
use node\modules\system\models\System;
use Yii;
/**
 * Description of SystemCreateForm
 *
 * @author dingjj
 */
class SystemCreateForm extends System{
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['name','system_type_id'], 'required'],
            [['name'], 'string', 'max' => 200],
            ['system_type_id', 'in', 'range' => [1, 2]],
        ];
    }
    
    public function createSystem(){
        Yii::info(self::dataDefault());
        $this->setAttributes(self::dataDefault(),false);
        $this->save();
        return $this;
    }
}
