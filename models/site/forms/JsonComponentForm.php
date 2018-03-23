<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Component;
use node\models\site\forms\JsonComponentItemForm;
use node\models\site\ResourceRefrence;
use node\models\site\Resource;
/**
 * Description of JsonComponentForm
 *
 * @author dingjj
 */
class JsonComponentForm extends Component{
    
    // 获取footer
    public static function getFooter(){
        return self::find()->where(self::whereMerge(['page_id'=>0]))->with(['items','resources','items.resources'])->asArray()->All();
    }
    
    public function getItems(){
        return $this->hasMany(JsonComponentItemForm::className(), ['component_id'=>'id']);
    }
    // 图片关系
    public function getRef(){
        $query = $this->hasMany(ResourceRefrence::className(), ['aim_id'=>'id']);
        return $query->andWhere(['type'=>2]);
    }
    // 图片
    public function getResources(){
        return $this->hasMany(Resource::className(), ['id'=>'resource_id'])->via('ref');
    }
}
