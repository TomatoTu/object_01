<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\controllers;
use yii\web\Controller;
use node\lib\controller\BaseController;
use node\lib\controller\ActiveController;
use node\lib\PageFunctions;
use Yii;
use node\lib\JsonTemplateFunctions;
use node\models\site\forms\HostInfoForm;
use node\lib\Functions;
use node\models\site\forms\SiteLanguageForm;
use node\models\node\Template;
use node\models\node\Host;
use node\lib\PreviewFunctions;
use node\models\site\forms\SiteThemeUpdateForm;


/**
 * Description of ManagerController
 *
 * @author dingjj
 */
class ManagerController extends ActiveController{
    public function actionHosts(){
        $this->layout =  'host.php';
        $hostInfo = null;
        
        $username = Yii::$app->cache->get('username'.$this->naples['HOSTID']);
        
        // 站点主机使用情况
        // 站点获取空间大小
      //  Yii::info($this->naples);
        $hostInfo['space']    = Functions::getSiteSpace($this->naples['SERVER']->domain, $this->naples['HOSTID']);
        
        $hostInfoForm = HostInfoForm::SiteInfo();
        $hostInfo['pages']    = count($hostInfoForm['pages']);
        $hostInfo['systems']  = count($hostInfoForm['systems']);
        $hostInfo['products'] = count($hostInfoForm['products']);
        $hostInfo['pictures'] = count($hostInfoForm['pictures']);
        
        $hostInfo['end_time'] = $this->naples['NODE_HOST']->end_time;
        $hostInfo['name'] = $this->naples['NODE_HOST']->name;
 

        $type=$this->naples['NODE_HOST']->hosttype->toArray();
        
        $count = count(json_decode($this->naples['NODE_HOST']->init));
        
        if($count > 1){
            $type['space']   = $type['space']*$count;
            $type['pages']   = $type['pages']*$count;
            $type['systems'] = $type['systems']*$count;
            $type['products'] = $type['products']*$count;
            $type['pictures'] = $type['pictures']*$count;
        }
  
        $hostInfo['host_type'] = $type;
        
        $hostInfo['space_pers'] = Yii::$app->formatter->asInteger($hostInfo['space']/$type['space']*100);
        $hostInfo['pages_pers'] = Yii::$app->formatter->asInteger($hostInfo['pages']/$type['pages']*100);
        $hostInfo['systems_pers'] = Yii::$app->formatter->asInteger($hostInfo['systems']/$type['systems']*100);
        $hostInfo['products_pers'] = Yii::$app->formatter->asInteger($hostInfo['products']/$type['products']*100);
        $hostInfo['pictures_pers'] = Yii::$app->formatter->asInteger($hostInfo['pictures']/$type['pictures']*100);
        
        // 其他主机
        $hosts = HostInfoForm::HasHosts();
        
        // 语言
        $languages = HostInfoForm::HasLanguages();
        $hostInfo['languages'] = $languages;
        
        Yii::info($hostInfo);
        Yii::info($hosts);
        
        // 设置缓存
        $this->hostres = $hostInfo;
        
        return $this->render('hosts',['naples'=>$this->naples,'hostInfo'=>$hostInfo,'hosts'=>$hosts,'username'=>$username]);
    }
    
//    public function actionTs(){
//        $aa=[
//            ['id'=>1,'parent'=>0],
//            ['id'=>2,'parent'=>0],
//            ['id'=>3,'parent'=>1],
//            ['id'=>4,'parent'=>1],
//            ['id'=>5,'parent'=>3],
//            ['id'=>6,'parent'=>5],
//            ['id'=>7,'parent'=>2],
//        ];
//        $bb = [];
//        foreach($aa as $key=>$a){
//            if(!isset($bb[$a['parent']])){
//                $bb[$a['parent']] = [];
//            }
//            $bb[$a['parent']][] = &$aa[$key];
//        }
//        Yii::info($bb);
//        foreach($aa as $key=>$a){
//            if(isset($bb[$a['id']])){
//                $aa[$key]['pages'] = $bb[$a['id']];
//            }else{
//                $aa[$key]['pages'] = [];
//            }
//        }
//        $cc = [];
//        foreach($aa as $key=>$a){
//            if($a['parent'] == 0){
//                $cc[] = $aa[$key];
//            }
//        }
//        var_dump($cc);
//        Yii::info($cc);
//        echo 'ok';
//    }
    
    /**
     * 加载管理后台界面
     * @return type
     */
    public function actionIndex(){
        $this->getDefaultSite();
        $this->layout =  'manager.php';
        return $this->render('index');
    }
    
    /**
     * 加载编辑页面
     */
    public function actionPage(){
        $this->layout =  'editPage.php';
        return $this->render('editPage',['host'=>$this->naples]);
    }
    
    public function actionJson(){
        JsonTemplateFunctions::json2();
    }
    
    /**
     * 发布页面
     */
    public function actionPublish(){
        $this->formatResponse();
        $res = Functions::publishPages($this->naples['SERVER']->domain, $this->naples['SITEID']);
        if(!$res){
            throw new \yii\web\BadRequestHttpException('发布失败');
        }else{
            return true;
        }
    }
    
    public function actionInitdata(){
        $this->formatResponse();
        $naples = $this->naples;
        $host = $naples['NODE_HOST'];
        $sites = $host->sites;
        $newSites=[];
        foreach($sites as $site){
            $siteArr = $site->toArray(); 
            $siteArr['language'] = $site->language->toArray();
            $newSites[] = $siteArr;
        }
        $templates = Template::getAllTemplates();
        $site = \yii\helpers\ArrayHelper::toArray($naples['SITE']);
        $site['language'] = $naples['SITE']->language->toArray();
        return ['sites'=>$newSites,'templates'=>$templates,'site'=>$site,'host'=>$host->toArray()];
    }
    
    public function actionPreview($theme,$page=0,$color=100){
        $this->layout='preview.php';
        $session = Yii::$app->session;
        $session->open();
        if($color==100){
            $color = $session->get('color')?:0;
        }else{
            $session->set('color',$color);
        }
        Yii::info('$color:'.$color);
        Yii::info('$session:'.$session->get('color'));
        $data = PreviewFunctions::init_page($theme,$page);
        
        Yii::$app->params['theme'] = $theme;
        Yii::$app->params['color'] = $color;
        return $this->render('@node/web/template/'.$theme.'/page.php',$data);
    }
    
    public function actionTheme(){
        $this->formatResponse();
        $site = new SiteThemeUpdateForm();
        $site->setAttributes(Yii::$app->request->post());
        if (!$site->validate()) {
            $this->checkErrors($site);
        }
        $site->updateTheme();
        $this->getDefaultHost();
        $this->getDefaultSite();
        return true;
    }
    public function checkErrors($model){
        if($model->hasErrors()){
            Yii::warning($model->getErrors());
            $errors = '';
            foreach ($model->getErrors() as $key => $error) {
                $errors .= $key .':'. $error[0] .'  ';
            }
            throw new MissFieldsHttpException($errors);
        }
    }
    
    // 修改密码
    public function actionPassword(){
        $this->formatResponse();
        // post数据和user_id;
        $post = Yii::$app->request->post();
        $naples = $this->naples;
        $host = $naples['NODE_HOST'];
        $post['user_id'] = $host->user_id;
        
        $ret = Functions::setCenterPassword($post);
        Yii::info($ret);
        if(!$ret['success']){
            Yii::info('失败');
            throw new \yii\web\BadRequestHttpException($ret['data']['message']);
        }
        return true;
    }
    
    // 
    public function actionSite(){
        $this->formatResponse();
        $cache = Yii::$app->cache;
        $cache->set('host.id'.$this->naples['HOSTID'].'.site.id',Yii::$app->request->post('id'));
        $this->getDefaultHost();
        $this->getDefaultSite();
        return Yii::$app->request->post('id');
    }
}
