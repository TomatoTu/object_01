<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Product;
use node\modules\system\models\Seo;
use node\modules\system\models\ProductLabel;
use node\modules\system\models\ResourceRefrence;
use node\modules\system\models\Options;
use node\modules\system\models\Items;
use node\modules\system\models\Group;
use node\lib\models\BaseModel;
use node\modules\system\lib\ProductFunctions;
use node\lib\Functions;
use Yii;
/**
 * Description of ProductUpdateForm
 *
 * @author dingjj
 */
class ProductUpdateForm extends BaseModel{
    
    public $id;
    public $system_id;
    public $category_id;
    public $resources;
    public $title;
    public $info;
    public $sale_price;
    public $price;
    public $inventory;
    public $tax_rate;
    public $options;
    public $items;
    public $groups;
    public $labels;
    public $seo;
    
    public function rules() {
        return [
           [['id','title','sale_price','price','tax_rate','inventory','category_id','system_id'], 'required'],
           ['id', 'exist', 'targetClass' => Product::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
           [['sale_price','price','tax_rate'], 'double'],
           [['inventory'], 'integer'],
           [['info','resources','options','items','groups','labels','seo'],'safe'],
        ];
    }
     
    public function updateProduct(){
        $product = Product::findOne(['id'=>$this->id,'system_id'=>$this->system_id]);
        
        if(!$product){
            throw new \yii\web\BadRequestHttpException;
        }
        
        $product->setAttributes($this->toArray());
        $product->info = Functions::clearPhpCode($product->info);
        $product->is_refuse = 0;
        $product->save();
        
        Yii::info($product->getErrors());
        
        $resourcesInfo = json_decode($this->resources,true);
        $optionsInfo = json_decode($this->options,true);
        $itemsInfo = json_decode($this->items,true);
        $groupsInfo = json_decode($this->groups,true);
        $labelsInfo = json_decode($this->labels,true);
        $seoInfo = json_decode($this->seo,true);
        
        Yii::info($resourcesInfo);
        Yii::info($optionsInfo);
        Yii::info($itemsInfo);
        Yii::info($groupsInfo);
        Yii::info($labelsInfo);
        Yii::info($seoInfo);
        
        $seo = $product->seo;
        $seo->setAttributes($seoInfo);
        $seo->save();
        Yii::info($seo->toArray());
        
        ProductFunctions::DeleteProductOther($product->id);
        
        foreach ($resourcesInfo as $key =>$resource) {
            $resourceRefrence = new ResourceRefrence();
            $resourceRefrence->setAttributes(self::dataDefault());
            $resourceRefrence->loadDefaultValues();
            $resourceRefrence->setAttributes(['type'=>'5',
                'aim_id'=>$product->id,
                'resource_id'=>$resource['id'],
            ]);
            $resourceRefrence->save();
            Yii::info($resourceRefrence->toArray());
        }
        
        
        
        
        
        foreach ($labelsInfo as $key =>$labelInfo) {
            $label = new ProductLabel();
            $label->setAttributes(self::dataDefault());
            $label->loadDefaultValues();
            $label->setAttributes([
                'product_id'=>$product->id,
                'title'=> $labelInfo['title'],
                'info'=>$labelInfo['info'],
                'order_num'=>$key,
            ]);
            $label->save();
        }
        
        $optionskeymap = [];
        foreach ($optionsInfo as $key =>$optionInfo) {
            $option = new Options();
            $option->setAttributes(self::dataDefault());
            $option->loadDefaultValues();
            $option->setAttributes([
                'product_id'=>$product->id,
                'title'=>$optionInfo['title'],
                'order_num'=>$key,
            ]);
            
            $option->save();
            
            Yii::info($option->getErrors());
            
            $optionskeymap[$optionInfo['id']] = $option->id;
        }
        
        $itemskeymap = [];
        foreach ($itemsInfo as $keyItem =>$itemInfo) {
            $items = new Items();
            $items->setAttributes(self::dataDefault());
            $items->loadDefaultValues();
            $items->setAttributes([
                'product_id'=>$product->id,
                'options_id'=>$optionskeymap[$itemInfo['options_id']],
                'content'=>$itemInfo['content'],
                'order_num'=>$keyItem,
            ]);
            $items->save();
            Yii::info($items->getErrors());
            $itemskeymap[$itemInfo['id']] = $items->id;
        }
        
        
        foreach ($groupsInfo as $key =>$groupInfo) {
            $group = new Group();
            $group->setAttributes(self::dataDefault());
            $group->loadDefaultValues();
            $itemsArr = [];
            foreach($groupInfo['itemArr'] as $item){
                $itemsArr[] = $itemskeymap[$item];
            }
            $group->setAttributes([
                'product_id'=>$product->id,
                'items'=>  implode(',', $itemsArr),
                'price'=>$groupInfo['price'],
                'sale_price'=>$groupInfo['sale_price'],
                'inventory'=>$groupInfo['inventory'],
                'order_num'=>$key,
            ]);
            $group->save();
            Yii::info($group->getErrors());
        }
    }
}
