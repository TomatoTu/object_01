<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Page;
use Yii;

/**
 * Description of BannerCreateForm
 *
 * @author dingjj
 */
class PageCreateForm extends Page{
    
    /**
     * @inheritdoc
     */
//    public function rules()
//    {
//        return [
//            [['host_id', 'site_id', 'parent_id', 'system_id', 'prduct_id', 'page_id', 'page_type', 'menu_type', 'status', 'order_num'], 'integer'],
//            [['page_description'], 'string'],
//            [['create_time', 'edite_time'], 'safe'],
//            [['name'], 'string', 'max' => 100],
//            [['rewrite'], 'string', 'max' => 50],
//            [['url'], 'string', 'max' => 200],
//            [['target'], 'string', 'max' => 20],
//            [['page_title'], 'string', 'max' => 250],
//            [['page_keywords'], 'string', 'max' => 255]
//        ];
//    }
    
    private function getOrderNum(){
        $max_order = self::find()->where(array_merge($this->defaultWhere,['parent_id'=>0]))->count();
        
        return $max_order+1;
    }
    
    public function initData(){
        return [
            'parent_id' => 0,//父菜单ID
            'system_id' => 0,//系统ID
            'type' => 1,//类型(1:标准页面,2:商店页面,3:外部页面)
            'name' => '',
            'status' => 1,//状态:0:不显示，1：显示
            'rewrite' => '',//重写链接
            'order_num' => $this->getOrderNum(),
            'url' => '',//外链的连接
            'target' => '',//跳转方式
//            'page_title' => 'Page Title',//页面标题
//            'page_keywords' => 'Page Keywords',//页面关键字(seo)
//            'page_description' => 'Page Description',//页面描述(seo)
//            'create_time' => 'Create Time',//创建日期
//            'edit_time' => 'Edit Time',//编辑日期
        ];
    }
    
    public function initCreate($data=[]){
        // 设置值
        $this->setAttributes(array_merge(self::initData(),  $this->defaultData, $data));
        // 加载默认值，根据sql上的默认值（不覆盖）。
        $this->loadDefaultValues();
        
        return $this->save();
    }
    public function setSeo($seo){
        return $this->seo = $seo;
    }
    public function setBanner($banner){
        return $this->banner = $banner;
    }
    public function setSystem($system){
        return $this->system = $system;
    }
}
