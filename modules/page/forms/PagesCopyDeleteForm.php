<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\forms;
use node\modules\page\models\Page;
use node\lib\models\BaseModel;
/**
 * Description of PagesCopyDeleteForm
 *
 * @author dingjj
 */
class PagesCopyDeleteForm extends BaseModel{
    public $id;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => Page::className(), 'message' => '页面不存在'],
        ];
    }
    
    // 复制页面
    public function copyPage(){
        
    }
    
    // 删除页面
    public function deletePage(){
        
        $page = Page::find()->where(self::whereMerge(['id'=>  $this->id]))->one();
        
        $page->delete();
        
        return $page;
    }
}
