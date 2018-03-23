<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\System;
use node\modules\store\models\Comment;
use node\lib\models\BaseModel;
use Yii;
/**
 * Description of CommentListForm
 *
 * @author dingjj
 */
class CommentListForm extends BaseModel{
    public $system_id;
    public $cur;
    
    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['cur','system_id'],'required'],
//            ['system_id', 'exist', 'targetClass' => System::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
            [['cur'],'integer'],
        ];
    }
    
    public function getList(){
        $where = [];
        if($this->system_id != '0'){
            $where = ['system_id'=>  $this->system_id];
       }
        $query = Comment::find()->where(self::whereMerge($where))->orderBy('id desc');
        
        $count = $query->count();
        
        $size = Yii::$app->params['LIST_SIZE'];
        
        $cur = $this->cur;
        
        $offset = $cur*$size;
        
        $models = $query->with(['system'])->limit($size)->offset($offset)->all();
        
        while (count($models) == 0 && $cur != 0) {
            $cur = $cur-1;
        
            $offset = $cur*$size;
            
            $models = $query->with(['system'])->limit($size)->offset($offset)->all();
        }
        $Nmodels=[];
        foreach($models as $model){
            $modelArr = $model->toArray();
            
            if($model['system']){
                $modelArr['system'] =  $model->system->toArray();
                $modelArr['obj'] = $model->system->obj;
                if($modelArr['obj']){
                    $modelArr['obj'] = $model->system->obj->toArray();
                }
            }else{
                $modelArr['obj'] = null;
                $modelArr['system'] = null;
            }
            
            $Nmodels[] = $modelArr;
        }
        $systems = System::find()->where(self::whereDefault())->asArray()->select(['id','name'])->all();
        return ['count'=>$count,'size'=>$size,'cur'=>$cur,'models'=>$Nmodels,'systems'=>$systems,'system_id'=>$this->system_id];
    }
}
