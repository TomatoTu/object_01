<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\init;
use node\models\site\BannerItem;
/**
 * Description of ComponentInitForm
 *
 * @author dingjj
 */
class BannerItemInitForm extends BannerItem{
    public function initData(){
	return [
	];
    }

    public function initCreate($data=[]){
	// 设置值
	$this->setAttributes(array_merge(self::initData(),   $data));
	// 加载默认值，根据sql上的默认值（不覆盖）。
	$this->loadDefaultValues();
	$this->save();
	return $this;
    }
}
