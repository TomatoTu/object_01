<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;
use node\models\site\forms\BannerCreateForm;
use node\models\site\forms\SeoCreateForm;
use node\models\site\forms\PageCreateForm;
use yii\web\ServerErrorHttpException;
use node\models\site\forms\SystemCreateForm;
use Yii;
use node\models\site\forms\PageCopyDeleteForm;
use yii\db\Expression;
/**
 * Description of initPagesLogic
 *
 * @author dingjj
 */
class PageFunctions {
    
    const PAGE_STANDARD_TYPE = 1;
    const PAGE_SYSTEM_TYPE  = 2;
    const PAGE_EXTERNAL_TYPE = 3;
    
    const SEO_SITE_TYPE = 0;
    const SEO_PAGE_TYPE  = 1;
    const SEO_CLASS_TYPE = 2;
    const SEO_SYSTEM_TYPE = 3;
    const SEO_PRODUCT_TYPE  = 4;

    public $name;
    public $menuName;
    public $pageId;
    public $_forms;
    static $_copyConditions=[];
    static $_copyModels=[];
    
    // 新建普通页面
    public static function init_standard($data=[]){
        if(!isset($data['name'])) $data['name']='普通页面';
        $banner = new BannerCreateForm();
        $page = new PageCreateForm();
        $seo = new SeoCreateForm();
        
        if(!$page->initCreate(['name'=>$data['name'],'type'=>self::PAGE_STANDARD_TYPE]) 
                || !$banner->initCreate(['page_id'=>$page->id]) 
                || !$seo->initCreate(['type'=>  self::SEO_PAGE_TYPE,'aim_id'=>$page->id])){
            self::deletes([$seo,$banner,$page]);
            throw new ServerErrorHttpException();
        }
        $page->seo = $seo;
        $page->banner = $banner;
        return $page;
    }
    
    // 新建普通页面
    public static function init_system($data=[]){
        
        if(!isset($data['name'])) $data['name']='系统页面';
        if(!isset($data['system_id'])) throw new \yii\web\GoneHttpException();
        
        $banner = new BannerCreateForm();
        $page = new PageCreateForm();
        $seo = new SeoCreateForm();
        
        if(!$page->initCreate(['name'=>$data['name'],'system_id'=>$data['system_id'],'type'=>  self::PAGE_SYSTEM_TYPE]) 
                || !$banner->initCreate(['page_id'=>$page->id]) 
                || !$seo->initCreate(['type'=>self::SEO_PAGE_TYPE,'aim_id'=>$page->id])){
            self::deletes([$seo,$banner,$page,$system]);
            throw new ServerErrorHttpException();
        }
        
        $page->seo = $seo;
        $page->banner = $banner;
        $page->system_id = $data['system_id'];
        return $page;
    }
    
    // 新建外链页面
    public static function init_external($data=[]){
        
        if(!isset($data['name'])) $data['name']='外链页面';
        
        $page = new PageCreateForm();
        
        if(!$page->initCreate(['name'=>$data['name'],'type'=>  self::PAGE_EXTERNAL_TYPE,'target'=>'_blank'])){
            self::deletes([$page]);
            throw new ServerErrorHttpException();
        }
        return $page;
    }
    
    // 删除页面
    public static function deletePage($id){
        $page = PageCopyDeleteForm::find()->where(PageCopyDeleteForm::whereMerge(['id'=>$id]))->with(['npages','seo','banner'])->one();
        if($page){
            self::deletes([
                $page->seo,
                $page->banner
                ]);
            
            if($page->npages){
                foreach ($page->npages as $npage) {
                    self::deletePage($npage->id);
                }
            }
            self::deleteOrderNum($page->parent_id, $page->order_num);
            $page->delete();
        }
    }
    
    // 复制页面
    public static function copyPage($id){
        $page = PageCopyDeleteForm::find()->where(PageCopyDeleteForm::whereMerge(['id'=>$id]))->with(['seo','banner','system'])->one();
        
        $banner = $page->banner;
        $seo = $page->seo;
//        $system = $page->system;
//        
//        self::save($system, 'system_id');
        $page->order_num = self::orderNum($page->parent_id);
        self::save($page, ['page_id','aim_id']);
        self::save($seo, 'seo_id');
        self::save($banner, 'banner_id');
        
        $page->seo = $seo;
        $page->banner = $banner;
//        $page->system = $system;
        return $page;
    }
    
    public static function save($model,$name){
        
        if(!$model) return false;
        
        $model->isNewRecord = true;
        $model->id = null;
        $model->setAttributes(self::$_copyConditions);
        $model->save();
        if(!$model->save()){
            self::deletes(self::$_copyModels);
            throw new \yii\base\UserException();
        }
        self::$_copyModels[] = $model;
        
        if(is_array($name)){
            foreach ($name as $value) {
                self::$_copyConditions[$value] = $model->id;
            }
        }else{
            self::$_copyConditions[$name] = $model->id;
        }
    }
    
    public static function orderNum($parentId=0){
        $count = PageCopyDeleteForm::find()->where(PageCopyDeleteForm::whereMerge(['parent_id'=>$parentId]))->count();
        return $count+1;
    }
    
    public static function deleteOrderNum($parentId=0,$orderNum=0){
        $data = PageCopyDeleteForm::dataDefault();
        PageCopyDeleteForm::updateAll(['order_num'=>new Expression("order_num-:bp1", [":bp1" => 1]) ],
                'host_id=:qp1 and site_id=:qp2 and parent_id =:qp3 and order_num > :qp4',
                [':qp1'=>$data['host_id'],':qp2'=>$data['site_id'],':qp3'=>$parentId,':qp4'=>$orderNum]
        );
    }

    public static function deletes($arr=[]){
        foreach ($arr as $form) {
            if(!$form) continue;
            $form->delete();
        }
    }
}
