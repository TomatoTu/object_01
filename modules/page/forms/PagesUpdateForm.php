<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\forms;
use node\lib\models\BaseModel;
use node\modules\page\models\Page;
use Yii;

/**
 * Description of PagesSearchFrom
 *
 * @author dingjj
 */
class PagesUpdateForm extends BaseModel{
    
    public $id;
    public $status;
    public $name;
    public $system_id;
    public $page_title;
    public $page_keywords;
    public $page_description;
    public $footer_code;
    public $header_code;
    public $url;
    public $target;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id', 'status', 'name'], 'required'],
            [['system_id'],'integer'],
            [['name'], 'string', 'max' => 100,'message'=>'页面名称不能超过100个字符'],
            [['page_title'], 'string', 'max' => 100,'message'=>'页面标题不能超过100个字符'],
            [['page_keywords'], 'string', 'max' => 250,'message'=>'关键词不能超过250个字符'],
            [['page_description'], 'string', 'max' => 1000,'message'=>'页面描述不能超过1000个字符'],
            [['footer_code'], 'string', 'max' => 2000,'message'=>'页脚代码不能超过1000个字符'],
            [['header_code'], 'string', 'max' => 2000,'message'=>'页首代码不能超过1000个字符'],
            ['target', 'in', 'range' => ['_blank','_self']],
            [['url'],'string','max'=>100],
        ];
    }
    
    public function setPageInfo(){
        $this->status = $this->status == 'false' ? 0:1;
        $this->system_id = $this->system_id ? :0;
        $this->url = $this->url ? :'http://';
        
        $page = Page::getPage($this->id);
        $page->setAttributes($this->toArray());
        $page->save();
        
        if($page->type != '3'){
            $seo = $page->seo;
            $seo->setAttributes($this->toArray());
            $seo->save();
            $page->seo = $seo;
        }
        
        return $page;
    }
    
    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'name' => '页面名称',
            'page_title' => '页面标题',
            'page_keywords' => '关键词',
            'page_description' => '页面描述',
            'footer_code' => '页脚代码',
            'header_code' => '页首代码',
        ];
    }
}
