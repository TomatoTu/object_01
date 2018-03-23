<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Article;
use node\modules\system\models\System;
use node\lib\models\BaseModel;
use Yii;
/**
 * Description of ArticleCreateForm
 *
 * @author dingjj
 */
class ArticleCreateForm extends Article{
     /**
     * @inheritdoc
     */
    
     public function rules() {
         return [
            [['system_id'], 'required'],
            ['system_id', 'exist', 'targetClass' => System::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
        ];
     }

     
    public function initData(){
        return [
            'category_id'=>0,
            'title'=>'新建文章',
            'synopsis'=>'',
            'info'=>'',
            'is_show'=>1,
            'is_refuse'=>3,
            'is_top'=>0,
            'config'=>'',
            'order_num'=>  $this->orderNum(),
        ];
    }
    
    public function orderNum(){
        $maxOrder = Article::find()->where(self::whereMerge(['system_id'=>  $this->system_id]))->max('order_num');
        return $maxOrder+1;
    }
    
    public function initCreate($data=[]){
        // 设置值
        $this->setAttributes(array_merge(self::initData(),  $this->defaultData, $data),false);
        // 加载默认值，根据sql上的默认值（不覆盖）。
        $this->loadDefaultValues();
        $this->save();
        return $this;
    }
}
