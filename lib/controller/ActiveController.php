<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib\controller;

use node\lib\controller\BaseController;
use Yii;

/**
 * Description of BaseController
 *
 * @author dingjj
 */
class ActiveController extends BaseController {

    public function beforeAction($action) {

        if (parent::beforeAction($action)) {
//            $this->nHost = $this->user->getIdentity();
//            $this->site  = $this->nHost->site;
//            if(!$this->site){
//                 $this->redirect(['init/index']);
//                 return false;
//            }
//            Yii::info($this->site);
//            $this->server = $this->nHost->server;
//            $this->sHost = $this->nHost->sitehost;


            if (!$this->naples || !isset($this->naples['NODE_HOST'])) {
                $this->getDefaultHost();
            }
            $naples = $this->naples;

//            Yii::info('ActiveController获取cache');
//            Yii::info($naples);

            if (!$naples['SITE']) {
                Yii::info(1);
                $this->getDefaultSite();
            } else {
                Yii::info(2);
                $this->site = $naples['SITE'];
            }

//            Yii::info($naples);
//            Yii::info('ActiveController设置cache');


            Yii::$app->params['NAPLES'] = $this->naples;
            // 配置格式化  
//            Yii::info(\yii\helpers\ArrayHelper::toArray($this->site));
            Yii::$app->language = $this->site->language->lan_no;
            Yii::$app->formatter->dateFormat = $this->site->date_format;
            Yii::$app->formatter->timeFormat = $this->site->time_format;
            Yii::$app->formatter->datetimeFormat = $this->site->date_format . ' ' . $this->site->time_format;

            // 写入一个站点端识别的 cookie 到顶级域当中。使站点端可浏览
            $authKey = $this->naples['NODE_HOST']->sitehost->auth_key;
            return \node\lib\CheckCookie::build($authKey);
        }

        return false;
    }

    public function getDefaultSite() {
        $naples = $this->naples;
        $this->nHost = $naples['NODE_HOST'];
        $this->site = $this->nHost->site;
        if (!$this->site) {
            $this->redirect(['init/index']);
            return false;
        }
        $this->server = $this->nHost->server;
        $this->sHost = $this->nHost->sitehost;

        $naples['SITE'] = $this->site;
        $naples['SITE_HOST'] = $this->sHost;

        $naples['SITEID'] = $this->site->id;

        $naples['THEME'] = $this->site->template;

        $naples['DEFAULT_WHERE']['site_id'] = $this->site->id;
        $naples['DEFAULT_DATA']['site_id'] = $this->site->id;
        Yii::info(\yii\helpers\ArrayHelper::toArray($naples));
        $naples['SITE_DOMAIN'] = $this->nHost->domain->domain_name;
        Yii::info(\yii\helpers\ArrayHelper::toArray($naples));
        $this->naples = $naples;
    }

}
