<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\SeoInfo;
/**
 * Description of BannerCreateForm
 *
 * @author dingjj
 */
class SeoCreateForm extends SeoInfo{
    
    /**
     * @inheritdoc
     */
//    public function rules()
//    {
//        return [
//            [['host_id', 'site_id', 'type', 'aim_id', 'status'], 'integer'],
//            [['page_title'], 'string', 'max' => 100],
//            [['page_keywords', 'page_description', 'footer_code', 'header_code'], 'string', 'max' => 300]
//        ];
//    }
    
    public function initData(){
        return [
//            'id' => 'ID',
//            'host_id' => 'Host ID',
//            'site_id' => 'Site ID',
            'type' => 0,//类型(0:整站,1:页面,2:分类,3:系统,4:产品)	
//            'aim_id' => 'Aim ID',
//            'page_title' => 'Page Title',
//            'page_keywords' => 'Page Keywords',
//            'page_description' => 'Page Description',
//            'footer_code' => 'Footer Code',
//            'header_code' => 'Header Code',
            'status' => 0,
        ];
    }
    
    public function initCreate($data=[]){
        // 设置值
        $this->setAttributes(array_merge(self::initData(),  $this->defaultData, $data));
        // 加载默认值，根据sql上的默认值（不覆盖）。
        $this->loadDefaultValues();
        
        return $this->save();
    }
}
