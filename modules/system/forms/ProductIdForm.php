<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Product;
use node\lib\models\BaseModel;
use node\modules\system\lib\ProductFunctions;
/**
 * Description of ProductIdForm
 *
 * @author dingjj
 */
class ProductIdForm extends BaseModel{
    public $id;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => Product::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
        ];
    }
    
    public function deleteProduct(){
        ProductFunctions::DeleteProduct($this->id);
        return $this->id;
    }
    
    public function deleteProductr(){
        ProductFunctions::DeleteProductr($this->id);
        return $this->id;
    }
    
    public function recoveryProduct(){
        ProductFunctions::recoveryProduct($this->id);
        return $this->id;
    }
    
    public function topProduct(){
        $product = Product::findOne(self::whereMerge(['id'=>  $this->id]));
        
        if(!$product){
            throw new \yii\web\HttpException();
        }
        
        $count = Product::find()->where(self::whereDefault())->andWhere(['>', 'is_top', 0])->max('is_top');
        
        $product->is_top = $count+1;
        $product->save();
        
        return $product;
    }
    public function untopProduct(){
        $product = Product::findOne(self::whereMerge(['id'=>  $this->id]));
        
        if(!$product){
            throw new \yii\web\HttpException();
        }
        $product->is_top = 0;
        $product->save();
        
        return $product;
    }
}
