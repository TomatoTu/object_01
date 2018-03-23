<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\lib\models\BaseModel;
use node\modules\store\models\Order;
use Yii;
/**
 * Description of OrderInfoForm
 *
 * @author dingjj
 */
class OrderListInfoForm extends BaseModel{
    public $status;
    public $cur;
    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['cur','status'],'required'],
            ['status', 'in', 'range' => [0,1, 2, 3,4,5,10]],
            [['cur'],'integer'],
        ];
    }
    
    public function getList(){
        $where = [];
        if($this->status != '10'){
            $where = ['status'=>  $this->status];
        }
        $query = Order::find()->where(self::whereMerge($where));
        
        $count = $query->count();
        
        $size = Yii::$app->params['LIST_SIZE'];
        
        $cur = $this->cur;
        
        $offset = $cur*$size;
        
        $orders = $query->with('products')->limit($size)->offset($offset)->asArray()->all();
        
//        if(count($orders) == 0 && $this->cur != 0){
//            $orders = $query->with('products')->limit($limit)->offset($size)->asArray()->all();
//        }
        
        while (count($orders) == 0 && $cur != 0) {
            $cur = $cur-1;
        
            $offset = $cur*$size;
            
            $orders = $query->with('products')->limit($size)->offset($offset)->asArray()->all();
        }

        return ['count'=>$count,'size'=>$size,'cur'=>$cur,'status'=>$this->status,'orders'=>$orders];
    }
}
