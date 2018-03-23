<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\lib\models\BaseModel;
use node\modules\store\models\Member;
use Yii;
/**
 * Description of MemberListForm
 *
 * @author dingjj
 */
class MemberListForm extends BaseModel{
//    public $status;
    public $cur;
    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['cur'],'required'],
//            ['status', 'in', 'range' => [0,1, 2, 3,4,5,10]],
            [['cur'],'integer'],
        ];
    }
    
    public function getList(){
//        $where = [];
//        if($this->status != '10'){
//            $where = ['status'=>  $this->status];
//        }
        $query = Member::find()->where(self::whereMerge());
        
        $count = $query->count();
        
        $size = Yii::$app->params['LIST_SIZE'];
        
        $cur = $this->cur;
        
        $offset = $cur*$size;
        
        $models = $query->with('info')->limit($size)->offset($offset)->asArray()->all();
        
        while (count($models) == 0 && $cur != 0) {
            $cur = $cur-1;
        
            $offset = $cur*$size;
            
            $models = $query->with('info')->limit($size)->offset($offset)->asArray()->all();
        }
        $Nmodels=[];
        foreach($models as $model){
            unset($model['password']);
            $Nmodels[] = $model;
        }

        return ['count'=>$count,'size'=>$size,'cur'=>$cur,'members'=>$Nmodels];
    }
}
