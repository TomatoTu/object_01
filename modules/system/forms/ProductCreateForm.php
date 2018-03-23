<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Product;
use node\modules\system\models\System;
use node\modules\system\models\ProductLabel;
use node\modules\system\models\Seo;
use node\lib\models\BaseModel;
use Yii;
/**
 * Description of ProductCreateForm
 *
 * @author dingjj
 */
class ProductCreateForm extends Product{
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
            'title'=>'新建产品',
            'info'=>'',
            'is_show'=>1,
            'is_refuse'=>3,
            'is_top'=>0,
            'sale_price'=>0,
            'price'=>0,
            'type'=>0,
            'is_inventory'=>0,
            'inventory'=>0,
            'tax_rate'=>0,
            'weight'=>0,
            'attributes'=>'',
            'config'=>'',
            'order_num'=>  $this->orderNum(),
        ];
    }
    
    public function orderNum(){
        $maxOrder = Product::find()->where(self::whereMerge(['system_id'=>  $this->system_id]))->max('order_num');
        return $maxOrder+1;
    }
    
    public function initCreate($data=[]){
        // 设置值
        $this->setAttributes(array_merge(self::initData(),  $this->defaultData, $data),false);
        // 加载默认值，根据sql上的默认值（不覆盖）。
        $this->loadDefaultValues();
        $this->save();
        
        if($this->hasErrors()){
            throw new \yii\web\BadRequestHttpException();
        }
         
        $label = new ProductLabel();
        $label->setAttributes(self::dataDefault());
        $label->product_id = $this->id;
        $label->title = '产品详细';
        $label->info = '';
        $label->order_num = 1;
        $label->save();
        
        if($label->hasErrors()){
            $this->delete();
            throw new \yii\web\BadRequestHttpException();
        }
        
        $seo = new Seo();
        $seo->setAttributes(self::dataDefault());
        $seo->loadDefaultValues();
        $seo->setAttributes(['type'=>Seo::TYPE_PRO,'aim_id'=>$this->id]);
        $seo->setAttributes([
            'page_title'=>'',
            'page_keywords'=>'',
            'page_description'=>'',
            'footer_code'=>'',
            'header_code'=>'',
        ]);
        
        $seo->save();
        
        if($seo->hasErrors()){
            $this->delete();
            $label->delete();
            throw new \yii\web\BadRequestHttpException();
        }
        
        return $this;
    }
}
