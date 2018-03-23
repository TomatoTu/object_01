<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;
use node\models\site\init\ArticleInitForm;
use node\models\site\init\BannerInitForm;
use node\models\site\init\BannerItemInitForm;
use node\models\site\init\CategorieInitForm;
use node\models\site\init\ComponentInitForm;
use node\models\site\init\ComponentItemInitForm;
use node\models\site\init\DomainInitForm;
use node\models\site\init\GroupInitForm;
use node\models\site\init\HostInitForm;
use node\models\site\init\LabelInitForm;
use node\models\site\init\OptionInitForm;
use node\models\site\init\OptionItemInitForm;
use node\models\site\init\PageInitForm;
use node\models\site\init\ProductInitForm;
use node\models\site\init\ResourceInitForm;
use node\models\site\init\ResourceRefInitForm;
use node\models\site\init\SeoInitForm;
use node\models\site\init\SiteInitForm;
use node\models\site\init\SiteConfigInitForm;
use node\models\site\init\SystemInitForm;
use node\lib\NodePath;
use node\models\site\Host;

use node\models\site\Comment;
use node\models\site\Payment;

use Yii;

/**
 * Description of InitFunctions
 *
 * @author dingjj
 */
class InitFunctions {
    private static $res = [];
    private static $systems = [];
    private static $products = [];
    private static $articles = [];
    private static $categories = [];
    private static $items = [];
    private static $models = [];
    private static $host_id;
    private static $site_id;
    private static $naples;
    private static $languages = [];
    private static $authKey = '';
    private static $serverDomain = '';
    
    private static $logo =[];
    private static $pages =[];
    private static $footer =[];
    private static $system =[];
    
    private static $theme = '';
    private static $color = '';
    
    const TEMPLATE_PATH = '@node/web/template/';
    
    
    // 默认初始化
    public static function Init($naples){
        self::$naples = $naples;
        self::$languages = json_decode($naples['NODE_HOST']->init,true);
        self::$serverDomain = self::$naples['SERVER']->domain;
        
        self::$theme = Yii::$app->request->post('theme');
        self::$color = Yii::$app->request->post('color');
        
        $json = json_decode(file_get_contents(Yii::getAlias(self::TEMPLATE_PATH).self::$theme.'/template.json'),true);

        self::$logo =  $json['logo'];
        self::$pages =  $json['page'];
        self::$footer =  $json['footer'];
        self::$system =  $json['systems'];
        
        
        // HOST
        $host = self::initHost();
        self::$authKey = $host->auth_key;
        self::initDomain(self::$authKey);
        
        $istop = 1;
        foreach(self::$languages as $language){
            self::saveAll($language, $istop,$host->user_id);
            $istop = 0;
        }
        
        Functions::getFilem(self::$serverDomain, ['theme'=>self::$theme,'host_id'=>self::$host_id]);
    }
    
    // 添加修改语言时调用，默认使用第一套模板
    public static function InitSingle($hostInfo,$language){
        
        self::$serverDomain = $hostInfo->server->domain;
        
        self::$theme = 1;
        self::$color = 0;
        
        $json = json_decode(file_get_contents(Yii::getAlias(self::TEMPLATE_PATH).self::$theme.'/template.json'),true);

        self::$logo =  $json['logo'];
        self::$pages =  $json['page'];
        self::$footer =  $json['footer'];
        self::$system =  $json['systems'];
        
        // HOST
        $host = Host::findOne(['id'=>$hostInfo->id]);
        
        if(!$host){
            $host = self::initHost($hostInfo);
            self::initDomain($host->auth_key);
        }else{
            self::$host_id = $host->id;
        }
        
        self::$authKey = $host->auth_key;
        
        self::saveAll($language, 0,$host->user_id);
        Functions::getFilem(self::$serverDomain, ['theme'=>self::$theme,'host_id'=>self::$host_id]);
    }
    
    // 删除站点
    public static function deleteAll($site_id){
        ArticleInitForm::deleteAll(['site_id'=>$site_id]);
        BannerInitForm::deleteAll(['site_id'=>$site_id]);
        BannerItemInitForm::deleteAll(['site_id'=>$site_id]);
        CategorieInitForm::deleteAll(['site_id'=>$site_id]);
        ComponentInitForm::deleteAll(['site_id'=>$site_id]);
        ComponentItemInitForm::deleteAll(['site_id'=>$site_id]);
//        DomainInitForm::deleteAll(['site_id'=>$site_id]);
        GroupInitForm::deleteAll(['site_id'=>$site_id]);
//        HostInitForm::deleteAll(['site_id'=>$site_id]);
        LabelInitForm::deleteAll(['site_id'=>$site_id]);
        OptionInitForm::deleteAll(['site_id'=>$site_id]);
        OptionItemInitForm::deleteAll(['site_id'=>$site_id]);
        PageInitForm::deleteAll(['site_id'=>$site_id]);
        ProductInitForm::deleteAll(['site_id'=>$site_id]);
        ResourceInitForm::deleteAll(['site_id'=>$site_id]);
        ResourceRefInitForm::deleteAll(['site_id'=>$site_id]);
        SeoInitForm::deleteAll(['site_id'=>$site_id]);
        SiteInitForm::deleteAll(['id'=>$site_id]);
        SiteConfigInitForm::deleteAll(['site_id'=>$site_id]);
        SystemInitForm::deleteAll(['site_id'=>$site_id]);
        Comment::deleteAll(['site_id'=>$site_id]);
        Payment::deleteAll(['site_id'=>$site_id]);
    }
    
    // 方法
    private static function saveAll($language,$istop,$user_id){
        // SITE
        $site = self::initSite(self::$theme,self::$color,$language,$istop,$user_id);
        
        
        self::initSeo();

        self::saveLogo(self::$logo);
        self::saveSystem(self::$system);
        self::savePage(self::$pages);
        self::saveFooter(self::$footer);
    }
    
    
    // 初始化host表
    private static function initHost($hostInfo=false){
        $host = new HostInitForm();
        $host = $host->setInit($hostInfo);
        self::isError($host);
        self::$host_id = $host->id;
        return $host;
    }
    
    private static function initSite($theme,$color,$language,$isTop,$user_id){
        $site = new SiteInitForm();
        $site->setInit(array_merge(['theme'=>$theme,'color'=>$color,'language_id'=>$language,'order_top'=>$isTop,'user_id'=>$user_id,'host_id'=>self::$host_id]));
        self::isError($site);
        self::$site_id = $site->id;
        return $site;
    }
    
    private static function initDomain($auth_key){
        $domain = new DomainInitForm();
        $domain = $domain->initCreate(['domain_name'=>strtolower($auth_key).'.'.self::$serverDomain,'host_id'=>self::$host_id]);
        self::isError($domain);
    }
    private static function initSeo($data=[]){
        $seo = new SeoInitForm();
        $seo = $seo->initCreate(array_merge($data,self::defaultData()));
        self::isError($seo);
    }
    
    private static function initSiteConfig($logo){
        Yii::info($logo);
        $model = new SiteConfigInitForm();
        $model = $model->initCreate(array_merge($logo,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function addRes($id,$res_id){
        self::$res[$id] = $res_id;
    }
    private static function getRes($id){
        return isset(self::$res[$id])?self::$res[$id]:false;
    }
    private static function initRes($data){
        foreach($data as $res){
            if(!self::getRes($res['id'])){
                $res['path'] = NodePath::getNewResourceHrefPath($res['path'], self::$authKey);
                $model = new ResourceInitForm();
                $model = $model->initCreate(array_merge($res,self::defaultData()));
                self::isError($model);
                self::addRes($res['id'],$model->id);
            }
        }
    }
    private static function initRef($data,$id){
        foreach($data as $ref){
            $ref['aim_id'] = $id;
            $model = new ResourceRefInitForm();
            $model = $model->initCreate(array_merge($ref,["resource_id"=>self::getRes($ref['resource_id'])],self::defaultData()));
            self::isError($model);
        }
    }
    private static function initComponent($data){
        $model = new ComponentInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function initComponentItem($data){
        $model = new ComponentItemInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function initBanner($data){
        $model = new BannerInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function initBannerItem($data){
        $model = new BannerItemInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function addSystems($id,$system_id){
        self::$systems[$id] = $system_id;
    }
    private static function getSystem($id){
        return isset(self::$systems[$id])?self::$systems[$id]:false;
    }
    private static function initSystem($data){
        $model = new SystemInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        self::addSystems($data['id'],$model->id);
        return $model->id;
    }
    private static function addProduct($id,$product_id){
        self::$products[$id] = $product_id;
    }
    private static function getProduct($id){
        return isset(self::$products[$id])?self::$products[$id]:false;
    }
    private static function initProduct($data){
        $model = new ProductInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        self::addProduct($data['id'],$model->id);
        return $model->id;
    }
    private static function addCategorie($id,$categorie_id){
        self::$categories[$id] = $categorie_id;
    }
    private static function getCategorie($id){
        return isset(self::$categories[$id])?self::$categories[$id]:false;
    }
    private static function initCategorie($data){
        $model = new CategorieInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        self::addCategorie($data['id'], $model->id);
        return $model->id;
    }
    private static function initOption($data){
        $model = new OptionInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function addItems($id,$res_id){
        self::$items[$id] = $res_id;
    }
    private static function getItems($id){
        return isset(self::$items[$id])?self::$items[$id]:false;
    }
    private static function initOptionItem($data){
        $model = new OptionItemInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        self::addItems($data['id'],$model->id);
        return $model->id;
    }
    private static function initGroup($data){
        $model = new GroupInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function initLabel($data){
        $model = new LabelInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    private static function addArticle($id,$article_id){
        self::$articles[$id] = $article_id;
    }
    private static function getArticle($id){
        return isset(self::$articles[$id])?self::$articles[$id]:false;
    }
    private static function initArticle($data){
        $model = new ArticleInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        self::addArticle($data['id'], $model->id);
        return $model->id;
    }
    private static function initPage($data){
        $model = new PageInitForm();
        $model = $model->initCreate(array_merge($data,self::defaultData()));
        self::isError($model);
        return $model->id;
    }
    
    private static function saveLogo($logo){
        $siteConfig_id = self::initSiteConfig($logo);
        self::initRes($logo['resources']);
        self::initRef($logo['ref'],$siteConfig_id);
    }
    
    private static function savePage($pages){
        foreach($pages as $page){
            if($page['type'] == 2){
                $page['system_id'] = self::getSystem($page['system_id']);
            }
            $page_id = self::initPage($page);
            foreach($page['components'] as $component){
                $component['page_id'] = $page_id;
                self::saveComponent($component);
            }
            $page['banners']['page_id'] = $page_id;
            self::saveBanner($page['banners']);
        }
    }
    
    private static function saveFooter($footer){
        foreach ($footer as $component) {
            self::saveComponent($component);
        }
    }
    
    private static function saveSystem($systems){
        foreach ($systems as $system) {
            $system_id = self::initSystem($system);
            foreach ($system['categories'] as $categorie) {
                $categorie['system_id'] = $system_id;
                self::saveCategorie($categorie);
            }
            
            foreach ($system['products'] as $product) {
//                $product['category_id'] = $categorie_id;
                $product['system_id'] = $system_id;
                self::saveProduct($product);
            }
            foreach ($system['articles'] as $article) {
//                $article['category_id'] = $categorie_id;
                $article['system_id'] = $system_id;
                self::saveArticle($article);
            }
        }
    }
    
    private static function saveCategorie($categorie){
        $categorie_id = self::initCategorie($categorie);
        $seo = $categorie['seo'][0];
        $seo['aim_id'] = $categorie_id;
        self::initSeo($seo);
        foreach ($categorie['products'] as $product) {
            $product['category_id'] = $categorie_id;
            $product['system_id'] = $categorie['system_id'];
            self::saveProduct($product);
        }
        foreach ($categorie['articles'] as $article) {
            $article['category_id'] = $categorie_id;
            $article['system_id'] = $categorie['system_id'];
            self::saveArticle($article);
        }
    }
    
    private static function saveProduct($product){
        $product_id = self::initProduct($product);
        self::initRes($product['resources']);
        self::initRef($product['ref'],$product_id);
        foreach ($product['options'] as $option) {
            $option['product_id'] = $product_id;
            self::saveOption($option);
        }
        foreach ($product['groups'] as $group) {
            $items = [];
            foreach (explode(',', $group['items']) as $item_id) {
                $items[] = self::getItems($item_id);
            }
            $group['items'] = implode(',', $items);
            $group['product_id'] = $product_id;
            self::initGroup($group);
        }
        foreach ($product['labels'] as $label) {
            $label['product_id'] = $product_id;
            self::initLabel($label);
        }
        $seo = $product['seo'];
        $seo['aim_id'] = $product_id;
        self::initSeo($seo);
    }
    
    private static function saveOption($option){
        $option_id = self::initOption($option);
        foreach ($option['items'] as $item) {
            $item['product_id'] = $option['product_id'];
            $item['options_id'] = $option_id;
            self::initOptionItem($item);
        }
    }
    
    private static function saveArticle($article){
        $article_id = self::initArticle($article);
        self::initRes($article['resources']);
        self::initRef($article['ref'],$article_id);
    }
    
    private static function saveComponent($component){
        
        if($component['type_id'] == 19){
            if($component['config']){
                $config = json_decode($component['config'],true);
                $config['system-id'] = self::getSystem($config['system-id']);
                $config['system-sort'] = self::getCategorie($config['system-sort']);
                $component['config'] = json_encode($config);
            }
        }
        if($component['choose']){
            $component['choose'] = self::getProduct($component['choose']);
        }
        $component_id = self::initComponent($component);
        foreach($component['items'] as $item){
            $item['page_id'] = $component['page_id'];
            $item['component_id'] = $component_id;
            self::saveComponentItem($item);
        }
        foreach($component['components'] as $component_child){
            $component_child['page_id'] = $component['page_id'];
            $component_child['parent_id'] = $component_id;
            self::saveComponent($component_child);
        }
        self::initRes($component['resources']);
        self::initRef($component['ref'],$component_id);
    }
    
    private static function saveComponentItem($item){
        $item_id = self::initComponentItem($item);
        self::initRes($item['resources']);
        self::initRef($item['ref'],$item_id);
    }
    
    private static function saveBanner($banner){
        $banner_id = self::initBanner($banner);
        foreach($banner['items'] as $item){
            $item['banner_id'] = $banner_id;
            self::saveBannerItem($item);
        }
    }
    private static function saveBannerItem($item){
        $item_id = self::initBannerItem($item);
        self::initRes($item['resources']);
        self::initRef($item['ref'],$item_id);
    }
    
    private static function isError($model){
        if ($model->hasErrors()) {
            Yii::warning($model->getErrors());
            $errors = '';
            foreach ($model->getErrors() as $key => $error) {
                $errors .= $error[0] . "\n";
            }
            self::deleteModels();
            throw new \yii\web\BadRequestHttpException($errors);
        }else{
            self::addModels($model);
        }
    }
    
    private static function addModels($model){
        self::$models[] = $model;
    }
    
    private static function deleteModels(){
        foreach(self::$models as $model){
            $model->delete();
        }
    }
    private static function defaultData(){
        return ['host_id'=>self::$host_id,'site_id'=>self::$site_id];
    }
}
