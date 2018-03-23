<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\controllers;
use node\modules\system\lib\RestController;
use node\modules\system\forms\ArticleCreateForm;
use node\modules\system\forms\ArticleUpdateForm;
use node\modules\system\forms\ArticleInfoForm;
use node\modules\system\forms\ArticleNewForm;
/**
 * Description of ProductController
 *
 * @author dingjj
 */
class ArticleController extends RestController{
    
    /*
     * 创建产品
     */
    public function actionCreate() {
        $productArr = $this->getModel(ArticleNewForm::className())->getInfo(); 
        if(!$productArr){
            $product = $this->getModel(ArticleCreateForm::className())->initCreate(); 
        
            $this->checkErrors($product);

            $productArr =  $product->toArray();
            $productArr['resources'] = [];
            $productArr['categorie'] = null;
        }
        
        
        return $productArr;
    }
    
    /*
     * 加载产品
     */
    public function actionLoad() {
        
        return $this->getModel(ArticleInfoForm::className())->getInfo(); 
    }
    
    /*
     * 更新产品
     */
    public function actionUpdate() {
        
        $product = $this->getModel(ArticleUpdateForm::className())->updateInfo(); 
        
        $this->checkErrors($product);
        
        return $this->getModel(ArticleInfoForm::className())->getInfo(); 
    }
}
