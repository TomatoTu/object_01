<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\forms;
use node\lib\models\BaseModel;
/**
 * Description of PagesCreateForm
 *
 * @author dingjj
 */
class PagesCreateForm extends BaseModel{
    
    public $type;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['type'], 'required'],
            ['type', 'in', 'range' => [1, 2, 3]],
        ];
    }
}
