<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\controllers;
use node\modules\system\lib\RestController;
use node\modules\system\forms\ProductCreateForm;
use node\modules\system\forms\ProductInfoForm;
use node\modules\system\forms\ProductUpdateForm;
use node\modules\system\forms\ProductNewForm;
use node\lib\HostresFunctions;
use Yii;
/**
 * Description of ProductController
 *
 * @author dingjj
 */
class ProductController extends RestController{
    
    /*
     * 创建产品
     */
    public function actionCreate() {
        
        $productArr = $this->getModel(ProductNewForm::className())->productInfo(); 
        
        if(!$productArr){
            $product = $this->getModel(ProductCreateForm::className())->initCreate(); 
        
            $this->checkErrors($product);

            $productArr =  $product->toArray();
            $productArr['resources'] = [];
            $productArr['categorie'] = null;
            $productArr['options'] = [];
            $productArr['items'] = [];
            $productArr['groups'] = [];
            $productArr['labels'] = [$product->labels[0]->toArray()];
            $productArr['seo'] = $product->seo->toArray();
        }
        
        return $productArr;
    }
    
    /*
     * 加载产品
     */
    public function actionLoad() {
        
        return $this->getModel(ProductInfoForm::className())->productInfo(); 
    }
    
    /*
     * 更新产品
     */
    public function actionUpdate() {
        $hostres = $this->hostres;
        Yii::info($hostres);
        // 验证产品数量
        if(!HostresFunctions::checkProducts($hostres)){
            throw new \yii\web\BadRequestHttpException('产品数量达到上限');
        }
        
        $product = $this->getModel(ProductUpdateForm::className())->updateProduct();
        
        $this->hostres = HostresFunctions::addProducts($hostres);
        return $this->getModel(ProductInfoForm::className())->productInfo(); 
    }
}
