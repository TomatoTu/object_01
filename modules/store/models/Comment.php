<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\models;
use node\models\site\Comment as baseComment;
use node\modules\store\models\System;
use node\modules\store\models\Product;
use node\modules\store\models\Article;
/**
 * Description of Comment
 *
 * @author dingjj
 */
class Comment extends baseComment{
    public function getSystem(){
        return $this->hasOne(System::className(), ['id'=>'system_id']);
    }
    public function getProduct(){
        return $this->hasOne(Product::className(), ['id'=>'aim_id']);
    }
}
