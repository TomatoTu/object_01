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
class OrderListInfo2Form extends BaseModel{
    public $orderListStatus;
    public $orderListCur;
    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['orderListCur','orderListStatus'],'required'],
            ['orderListStatus', 'in', 'range' => [0,1, 2, 3,4,5,10]],
            [['orderListCur'],'integer'],
        ];
    }
    
    public function getList(){
        $where = [];
        if($this->orderListStatus != '10'){
            $where = ['status'=>  $this->orderListStatus];
        }
        $query = Order::find()->where(self::whereMerge($where));
        
        $count = $query->count();
        
        $size = Yii::$app->params['LIST_SIZE'];
        
        $cur = $this->orderListCur;
        
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

        return ['count'=>$count,'size'=>$size,'cur'=>$cur,'status'=>$this->orderListStatus,'orders'=>$orders];
    }
}
