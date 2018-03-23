<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\controllers;
use node\modules\system\lib\RestController;
use node\modules\system\forms\ProductIdForm;
use node\modules\system\forms\ProductIdsForm;
use node\modules\system\forms\ProductCreateForm;
use node\modules\system\forms\ProductListForm;
use node\lib\HostresFunctions;
use Yii;
/**
 * Description of ProductController
 *
 * @author dingjj
 */
class ProductlistController extends RestController{
    
    
    /*
     * 加载产品列表
     */
    public function actionProductlist() {
        $products = $this->getModel(ProductListForm::className())->productList(); 
        return $products;
    }
    
    /*
     * 加载产品列表
     */
    public function actionProductlistrecycle() {
        $products = $this->getModel(ProductListForm::className())->productListRecycle(); 
        return $products;
    }
    
    /*
     * 创建产品
     */
    public function actionCreate() {
        
        $product = $this->getModel(ProductCreateForm::className())->initCreate(); 
        
        $this->checkErrors($product);
        
        $productArr =  $product->toArray();
        $productArr['resources'] = [];
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
        $productId = $this->getModel(ProductIdForm::className())->deleteProductr(); 
        
        return $productId; 
    }
    
    /*
     * 删除产品(可还原)
     */
    public function actionDeletemanyr() {
        $productId = $this->getModel(ProductIdsForm::className())->deleteManyr(); 
        
        return $productId; 
    }
    
    /*
     * 删除产品
     */
    public function actionDelete() {
        $productId = $this->getModel(ProductIdForm::className())->deleteProduct(); 
        $this->hostres = HostresFunctions::minusProducts($this->hostres);
        return $productId; 
    }
    
    /*
     * 删除产品
     */
    public function actionDeletemany() {
        $productId = $this->getModel(ProductIdsForm::className())->deleteMany(); 
        $this->hostres = HostresFunctions::minusProducts($this->hostres,count($productId));
        return $productId; 
    }
    
    /*
     * 删除所有产品
     */
    public function actionDeleteall() {
        $res = $this->getModel(ProductListForm::className())->productDeleteAll(); 
        $this->hostres = HostresFunctions::minusProducts($this->hostres,count($res['count']));
        return $res['system_id']; 
    }
    
    /*
     * 还原产品
     */
    public function actionRecovery() {
        $productId = $this->getModel(ProductIdForm::className())->recoveryProduct(); 
        
        return $productId; 
    }
    
    /*
     * 还原产品
     */
    public function actionRecoverymany() {
        $productId = $this->getModel(ProductIdsForm::className())->recoveryMany(); 
        
        return $productId; 
    }
    
    /*
     * 置顶产品
     */
    public function actionTop() {
        $product = $this->getModel(ProductIdForm::className())->topProduct(); 
        $this->checkErrors($product);
        return $product; 
    }
    
    /*
     * 置顶产品
     */
    public function actionUntop() {
        $product = $this->getModel(ProductIdForm::className())->untopProduct(); 
        $this->checkErrors($product);
        return $product;
    }
}
