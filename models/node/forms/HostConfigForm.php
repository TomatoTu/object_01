<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\node\forms;
use node\models\node\Host;
use node\models\node\Template;

/**
 * Description of HostConfigForm
 *
 * @author dingjj
 */
class HostConfigForm extends Host{
    
    public $theme;
    public $color;
    
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['theme', 'color'], 'trim'],
            [['theme', 'color'], 'required'],
            ['theme', 'exists', 'targetClass' => Template::className(), 'message' => 'This phone address has already been taken.'],
            ['color','validateColor'],
        ];
    }
    
    public function validateColor(){
        if (!$this->hasErrors()) {
            $template = Template::findOne($this->theme);
            if($this->color<0 || $this->color > count(json_decode($template->color_config))){
                $this->addError($attribute, '当前模板不包含此颜色。');
            }
        }
    }
    
    
}
