<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\forms;

use node\lib\models\BaseModel;

/**
 * Description of SiteTitleForm
 *
 * @author dingjj
 */
class SiteTitleForm extends BaseModel {

    public $title;

    public function rules() {
        return [
            [['title'], 'required', 'message' => '网站名称不能为空'],
            [['title'], 'string', 'max' => 200, 'message' => '网站名称长度不能超过200'],
        ];
    }

    public function updateTitle() {
        $site = self::site();
        $site->name = $this->title;
        $site->save();
        return $site;
    }

}
