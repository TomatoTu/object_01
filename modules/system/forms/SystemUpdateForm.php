<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\System;
/**
 * Description of SystemUpdateForm
 *
 * @author dingjj
 */
class SystemUpdateForm extends System{
    public function rules(){
        return [
            [['id','name','config'], 'required'],
            ['id', 'exist', 'targetClass' => System::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
            [['name','config'], 'string', 'max' => 300],
        ];
    }
    
    public function updateSystem(){
        $system = self::findOne($this->id);
        $system->setAttributes($this->toArray());
        $system->save();
        return $system;
    }
}
