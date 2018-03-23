<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib\behavior;

use yii\base\ActionEvent;
use yii\base\Behavior;
use yii\web\Controller;
use yii\web\User;
use yii\di\Instance;
use Yii;
use yii\web\ForbiddenHttpException;




/**
 * Description of readySource
 *
 * @author dingjj
 */
class ReadySource extends Behavior{
    
    
    public $actions = [];
    
    
    public $user = 'user';
     /**
     * Initializes the [[rules]] array by instantiating rule objects from configurations.
     */
    public function init()
    {
        parent::init();
        $this->user = Instance::ensure($this->user, User::className());
    }
    
    /**
     * Declares event handlers for the [[owner]]'s events.
     * @return array events (array keys) and the corresponding event handler methods (array values).
     */
    public function events()
    {
        return [Controller::EVENT_BEFORE_ACTION => 'beforeAction'];
    }
    
    /**
     * @param ActionEvent $event
     * @return boolean
     * @throws 
     */
    public function beforeAction($event){
        Yii::trace('ReadySource');
        $action = $event->action->id;
        $allowed = array_map('strtolower', $this->actions);
        if(in_array('*', $allowed) || in_array($action, $allowed)){
            $user = $this->user;
            if(!$user->getIsGuest()){
                
                $identity = $user -> getIdentity();
                
//                $servers = 

                $server = $identity ->server;
                
                // 配置连接的站点数据库。
                Yii::$app->set('db',[
                    'class' => 'yii\db\Connection',
                    'dsn' => 'mysql:host='.$server->ipaddress.';dbname='.$server->db_name,
                    'username' => $server->db_userid,
                    'password' => $server->db_password,
                    'charset' => 'utf8',
                ]);
                
                
                // format 配置 根据site信息 yii\i18n\format;
//                Yii::trace($identity->site->name);
//                
//                Yii::trace($identity->host->diskspace);
            }else{
                throw new ForbiddenHttpException(Yii::t('yii', 'Login Required'));
            }
        }
    }
    
    public function getServers(){
        $cache = Yii::$app->cache;
        if(!$cache->get('servers')){
            
        }
        return $cache->get('servers');
    }
}
