<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\System;
/**
 * Description of SystemInfoForm
 *
 * @author dingjj
 */
class SystemInfoForm extends System{
    /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => System::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
        ];
    }
    public function getInfo(){
        return self::getSystem($this->id);
    }
}
