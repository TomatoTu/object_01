<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\init;
use Yii;
use node\models\site\Site;
use node\models\node\Template;
/**
 * Description of SiteInitForm
 *
 * @author dingjj
 */
class SiteInitForm extends Site{
    
//    public $name = '我的网站';
//    public $date_format = 'yyyy-MM-dd';
//    public $time_format = 'HH:mm:ss';
//    public $language_id = 1;
//    public $ssl = 0;
//    public $order_top = 0;
    
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['theme', 'color'], 'trim'],
            [['theme', 'color'], 'required'],
            ['theme', 'exist', 'targetClass' => Template::className(),'targetAttribute'=>'id', 'message' => '所选择的模板不存在'],
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
    
    public function initData(){
        return [
            'name' => '我的网站',
            'date_format' => 'yyyy-MM-dd',
            'time_format' => 'HH:mm:ss',
            'language_id' => 1,	
            'ssl' => 0,
            'order_top' => 0,
        ];
    }
    
    public function setInit($params){
//        $this->setAttributes(array_merge(self::initData(),   $data));
//        $this->setAttributes(false);
        $this->setAttributes(self::initData(),false);
        $this->setAttributes($params);
        $this->user_id = $params['user_id'];
        $this->host_id = $params['host_id'];
        $this->language_id = $params['language_id'];
        $this->order_top = $params['order_top'];
        $this->loadDefaultValues();
        
        $this->save();
        
        return $this;
    }
}
