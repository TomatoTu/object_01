<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\SiteConfig;
/**
 * Description of DomianCreateForm
 *
 * @author dingjj
 */
class SiteConfigCreateForm extends SiteConfig{
    public function initData(){
        return [
//            'page_id' => $this->getPageId(),
//            'type'=>1,
        ];
    }
    
    public function initCreate($data=[]){
        // 设置值
        $this->setAttributes(array_merge(self::initData(), $data));
        // 加载默认值，根据sql上的默认值（不覆盖）。
        $this->loadDefaultValues();
        
        return $this->save();
    }
}
