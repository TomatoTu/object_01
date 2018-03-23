<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\lib;
use yii\db\Expression;
use Yii;

/**
 * Description of MenuChangeLogic
 *
 * @author dingjj
 */
class SortLogic {
    public static function sort($class,$order){
        
        $cur = self::getCur($class,$order['current']);
        
        self::setOut($class,$cur);
        self::setIn($class,$order);
        self::setInsert($cur,$order);
    }
    
    public static function getCur($class,$id){
        return $class::findOne($class::whereMerge(['id'=>$id]));
    }
    
    public static function setOut($class,$cur){
        $data = $class::whereDefault();
        return $class::updateAll(['order_num'=>new Expression("order_num-:bp1", [":bp1" => 1]) ],
                'host_id=:qp1 and site_id=:qp2 and parent_id =:qp3 and order_num > :qp4',
                [':qp1'=>$data['host_id'],':qp2'=>$data['site_id'],':qp3'=>$cur->parent_id,':qp4'=>$cur->order_num]
        );
    }
    
    public static function setIn($class,$order){
         $data = $class::whereDefault();
        return $class::updateAll(['order_num'=>new Expression("order_num+:bp1", [":bp1" => 1]) ],
                'host_id=:qp1 and site_id=:qp2 and parent_id =:qp3 and order_num >= :qp4',
                [':qp1'=>$data['host_id'],':qp2'=>$data['site_id'],':qp3'=>$order['parent'],':qp4'=>$order['index']+1]
        );
    }
    public static function setInsert($cur,$order){
       $cur->parent_id = $order['parent'];
       $cur->order_num = $order['index']+1;
       return $cur->save();
    }
}
