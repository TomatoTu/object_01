<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\controllers;
use node\lib\controller\BaseController;
use node\models\node\Template;
use node\models\site\Host;
use node\models\site\forms\HostCreateForm;
use Yii;
use yii\web\Controller;
use node\models\site\forms\SiteCreateForm;
use node\lib\PageFunctions;
use yii\web\ServerErrorHttpException;
use yii\web\Response;
use node\models\site\forms\DomainCreateForm;
use node\models\site\forms\SiteConfigCreateForm;
use yii\helpers\Url;
use node\models\site\forms\SeoCreateForm;
use node\lib\PreviewFunctions;
use node\models\site\forms\SystemCreateForm;
use node\lib\InitFunctions;

/**
 * Description of HostController
 *
 * @author dingjj
 */
class InitController extends BaseController{
    public function beforeAction($action) {
        if (parent::beforeAction($action)) {
            // 验证是否已经初始化完成
            if(Host::find()->where(['id'=>Yii::$app->user->id])->exists()){
                $this->redirect(['manager/hosts']);
                return false;
            }
            return true;
        }
        
        return false;
    }

    public function actionIndex(){
        
        $this->layout = 'init.php';
        $model = Template::getAllTemplates();
        return $this->render('init',['model'=>json_encode($model)]);
    }
    
    public function actionPreview($theme,$page=0,$color=0){
        
        $this->layout='preview.php';
        
        $data = PreviewFunctions::init_page($theme,$page);
        
        Yii::$app->params['theme'] = $theme;
        Yii::$app->params['color'] = (int)$color ?(int)$color : 0;
        return $this->render('@node/web/template/'.$theme.'/page.php',$data);
    }
    
    public function actionPre($theme,$page=0){
        
//        $this->layout='preview.php';
        
//        $data = PreviewFunctions::init_page($theme,$page);
        return $this->renderPartial('pre',['theme'=>$theme,'page'=>$page]);
    }
    
    public function actionTheme(){
        // 设置response返回值得类型 和形式
        $this->formatResponse();
        
        InitFunctions::Init($this->naples);
//        // 初始化host表
//        $host = new HostCreateForm();
//        // 初始化site表
//        $site = new SiteCreateForm();
//        // 初始化siteconfig表
//        $siteConfig = new SiteConfigCreateForm();
//        //// 初始化domian表
//        $domain = new DomainCreateForm();
//        // 初始化seo表
//        $seo = new SeoCreateForm();
//        // 初始化system表
//        $system = new SystemCreateForm();
//        $naples = $this->naples;
//        if(!$host->setInit() || !$site->setInit(Yii::$app->request->post()) 
//                || !$siteConfig->initCreate(['host_id'=>$host->id,'site_id'=>$site->id]) 
//                || !$domain->initCreate(['domain_name'=>strtolower($host->auth_key).'.'.$naples['SERVER']->domain])
//                || !$seo->initCreate(['type'=> SeoCreateForm::TYPE_ALL,'aim_id'=>0,'site_id'=>$site->id])
//                || !$system->initCreate(['system_type_id'=>1,'name'=>'产品系统','site_id'=>$site->id])){
//            
//            $host->delete();
//            $site->delete();
//            $siteConfig->delete();
//            $domain->delete();
//            $seo->delete();
//            $system->delete();
//            throw new ServerErrorHttpException('系统错误，请联系管理员。');
//        }
//        
//        $naples['SITE'] = $site;
//        $naples['SITE_HOST'] = $host;
//        
//        $naples['SITEID'] = $site->id;
//        
//        $naples['DEFAULT_WHERE']['site_id'] = $site->id;
//        $naples['DEFAULT_DATA']['site_id'] = $site->id;
//        
//        $this->naples = $naples;
//        
//        // 初始化页面
//        $page = new PageFunctions();
//        $page->init_standard(['name'=>'首页']);
//        $page->init_system(['name'=>'产品页面','system_id'=>$system->id]);
//        $page->init_standard(['name'=>'联系我们']);
        $this->getDefaultHost();
        return ['url'=>Url::to(['manager/index'])];
    }
}
