<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\controllers;
use node\modules\system\lib\RestController;
use node\modules\system\forms\ArticleIdForm;
use node\modules\system\forms\ArticleIdsForm;
use node\modules\system\forms\ArticleCreateForm;
use node\modules\system\forms\ArticleListForm;
use Yii;
/**
 * Description of ProductController
 *
 * @author dingjj
 */
class ArticlelistController extends RestController{
    
    
    /*
     * 加载产品列表
     */
    public function actionArticlelist() {
        $products = $this->getModel(ArticleListForm::className())->articleList(); 
        return $products;
    }
    
    /*
     * 加载产品列表
     */
    public function actionArticlelistrecycle() {
        $products = $this->getModel(ArticleListForm::className())->articleListRecycle(); 
        return $products;
    }
    
    /*
     * 创建产品
     */
    public function actionCreate() {
        
        $product = $this->getModel(ArticleCreateForm::className())->initCreate(); 
        
        $this->checkErrors($product);
        
        $productArr =  $product->toArray();
        $productArr['resources'] = null;
        $productArr['categories'] = null;
        return $productArr;
    }
    
    /*
     * 修改产品
     */
    public function actionEdit() {
        return ['systems'=>System::getSystems()];
    }
    
    /*
     * 删除产品(可还原)
     */
    public function actionDeleter() {
        $productId = $this->getModel(ArticleIdForm::className())->deleter(); 
        
        return $productId; 
    }
    
    /*
     * 删除产品(可还原)
     */
    public function actionDeletemanyr() {
        $productId = $this->getModel(ArticleIdsForm::className())->deleteManyr(); 
        
        return $productId; 
    }
    
    /*
     * 删除产品
     */
    public function actionDelete() {
        $productId = $this->getModel(ArticleIdForm::className())->delete(); 
        
        return $productId; 
    }
    
    /*
     * 删除产品
     */
    public function actionDeletemany() {
        $productId = $this->getModel(ArticleIdsForm::className())->deleteMany(); 
        
        return $productId; 
    }
    
    /*
     * 删除所有产品
     */
    public function actionDeleteall() {
        $system_id = $this->getModel(ArticleListForm::className())->articleDeleteAll(); 
        
        return $system_id; 
    }
    
    /*
     * 还原产品
     */
    public function actionRecovery() {
        $productId = $this->getModel(ArticleIdForm::className())->recovery(); 
        
        return $productId; 
    }
    
    /*
     * 还原产品
     */
    public function actionRecoverymany() {
        $productId = $this->getModel(ArticleIdsForm::className())->recoveryMany(); 
        
        return $productId; 
    }
    
    /*
     * 置顶产品
     */
    public function actionTop() {
        $product = $this->getModel(ArticleIdForm::className())->top(); 
        $this->checkErrors($product);
        return $product; 
    }
    
    /*
     * 置顶产品
     */
    public function actionUntop() {
        $product = $this->getModel(ArticleIdForm::className())->untop(); 
        $this->checkErrors($product);
        return $product;
    }
}
