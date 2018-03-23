<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\lib;

use yii\rest\Controller;
use yii\filters\AccessControl;
use node\modules\store\lib\MissFieldsHttpException;
use yii\web\UnauthorizedHttpException;
use yii\web\Response;
use Yii;

/**
 * Description of baseController
 *
 * @author dingjj
 */
class BaseController extends Controller{
    
    public function behaviors() {
        $behaviors = parent::behaviors();
        return array_merge($behaviors, [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => $this->getAllowActions(),
                        'allow' => true,
                        'ips' => $this->setAllowIps(),
                    ],
                ],
            ],
        ]);
    }
    
    public function setAllowIps(){
        return [];
    }
    
    public function getAllowActions(){
        return [];
    }
    
    public function beforeAction($action) {
        if(!parent::beforeAction($action)) return false;
        $this->formatResponse();
        return $this->auth();
    }
    
    
    private function auth(){
        $request = Yii::$app->request;
        
        Yii::warning($request->post());
        
        if(!$request->post('key')){
            throw new MissFieldsHttpException('Miss fields(verify).');
            return false;
        }
        
//        $verify = $request->post('verify');
//        
//        $post = $request->post();
//        
//        unset($post['verify']);
//        ksort($post);
//        
//        $screct_str = '';
//        foreach ($post as $value) {
//           $screct_str .=  $value;
//        }
        
//        if($verify != md5(Yii::$app->params['screctKeys'].str_replace('api/', '', Yii::$app->controller->action->getUniqueId()).$screct_str)){
//            throw new UnauthorizedHttpException('Error Verify.');
//            return false;
//        }
        
        return true;
    }
    
    private function formatResponse() {
        Yii::$app->response->on(Response::EVENT_BEFORE_SEND, function($event){
            $response = $event->sender;
            if ($response->data !== null) {
                $response->data = [
                    'success' => $response->isSuccessful,
                    'data' => $response->data,
                ];
                $response->statusCode = 200;
            }
        });
    }
    
//    public function actions()
//    {
//        return [
//            'error' => [
//                'class' => 'yii\web\ErrorAction',
//            ],
//        ];
//    }
}
