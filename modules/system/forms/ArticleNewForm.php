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
class ArticleNewForm extends Article{
     /**
     * @inheritdoc
     */
    
     public function rules() {
         return [
            [['system_id'], 'required'],
            ['system_id', 'exist', 'targetClass' => System::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
        ];
     }

     public function getInfo(){
        return self::find()->where(self::whereMerge(['is_refuse'=>  3,'system_id'=>  $this->system_id]))->with(['resources','categorie'])->asArray()->one();
    }
}
