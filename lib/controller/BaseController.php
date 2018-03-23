<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib\controller;
use yii\web\Controller;
use yii\di\Instance;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use node\lib\behavior\ReadySource;
use yii\web\User;
use Yii;
use yii\web\Response;


/**
 * Description of BaseController
 *
 * @author dingjj
 */
class BaseController extends Controller{
    
    public $user = 'user';
    public $server;
    public $nHost;
    public $site;
    public $sHost;
    
    public function behaviors() {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => $this->verbs(),
            ],
            'ready' => [
                'class' => ReadySource::className(),
                'actions' => $this->readyActions(),
            ],
        ];
    }
    // 初始化
    public function beforeAction($action)
    {
        if (parent::beforeAction($action)) {
            $this->user = Instance::ensure($this->user, User::className());
            if(!$this->naples){
                $this->getDefaultHost();
            }
            
            Yii::$app->params['NAPLES']=$this->naples;
            return true;
        }
        return false;
    }
    
    public function getDefaultHost(){
        $this->naples = [
            'NODE_HOST' => $this->user->identity,
            'SITE' => NULL,
            'SERVER' => $this->user->identity->server,
            'SITE_HOST' => NULL,

            'USERID' => $this->user->identity->user_id,
            'HOSTID' => $this->user->id,
            'SITEID' => '',

            'DEFAULT_WHERE' => [
                'host_id' => $this->user->id,
                'site_id' => '',
            ],
            'DEFAULT_DATA' => [
                'user_id' => $this->user->identity->user_id,
                'host_id' => $this->user->id,
                'site_id' => '',
            ],
        ];
    }
    
    // 获取主机信息
    public function getNaples(){
//        Yii::info('获取cache');
        return Yii::$app->cache->get($this->user->id);
    }
    // 设置主机信息
    public function setNaples($data){
//        Yii::info('设置cache');
        return Yii::$app->cache->set($this->user->id,$data);
    }
    
    // 获取主机资源信息
    public function getHostres(){
        Yii::info('获取资源cache');
        return Yii::$app->cache->get('hostres'.$this->user->id);
    }
    
    // 设置主机资源信息
    public function setHostres($data){
        Yii::info('设置资源cache');
        return Yii::$app->cache->set('hostres'.$this->user->id,$data);
    }
    
    // 控制请求方式
    public function verbs(){
        return ['*'=>['get', 'post']];
    }
    
    // 初始化加载
    public function readyActions(){
        return ['*'];
    }
    
    public function actions() {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }
    // 设置response格式
    public function formatResponse() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        Yii::$app->response->on(Response::EVENT_BEFORE_SEND, function($event){
            $response = $event->sender;
            if ($response->data !== null) {
                $response->data = [
                    'code' => $response->isSuccessful,
                    'data' => $response->data,
                ];
                $response->statusCode = 200;
            }
        });
    }
}
