<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\forms;

use node\lib\models\BaseModel;

/**
 * Description of NodeHostEmailForm
 *
 * @author dingjj
 */
class NodeHostEmailForm extends BaseModel {

    public $email;

    public function rules() {
        return [
            [['email'], 'required', 'message' => '请输入网站邮箱'],
            [['email'], 'email', 'message' => '输入网站邮箱不是一个有效的Email邮箱'],
        ];
    }

    public function updateEmail() {
        $nodeHost = self::nodeHost();
        $nodeHost->email = $this->email;
        $nodeHost->save();
        return $nodeHost;
    }

}
