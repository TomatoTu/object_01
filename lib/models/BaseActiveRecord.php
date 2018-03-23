<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib\models;
use yii\db\ActiveRecord;
use Yii;

/**
 * Description of BaseActiveRecord
 *
 * @author dingjj
 */
class BaseActiveRecord extends ActiveRecord{
    public function getDefaultWhere(){
        return $this->naples['DEFAULT_WHERE'];
    }
    
    public function getDefaultData(){
        return $this->naples['DEFAULT_DATA'];
    }
    
    // 获取主机信息
    public function getNaples(){
        return Yii::$app->cache->get(Yii::$app->user->id);
    }
    // 设置主机信息
    public function setNaples($data){
        return Yii::$app->cache->set(Yii::$app->user->id,$data);
    }
    
    public function mergeWhere($arr=[]){
        return array_merge($this->defaultWhere,$arr);
    }
    
    public static function whereDefault(){
        $host = Yii::$app->cache->get(Yii::$app->user->id);
        return $host['DEFAULT_WHERE'];
    }
    
    public static function dataDefault(){
        $host = Yii::$app->cache->get(Yii::$app->user->id);
        return $host['DEFAULT_DATA'];
    }
    public static function whereMerge($arr=[]){
        return array_merge(self::whereDefault(),$arr);
    }
    public static function siteId(){
        $host = self::host();
        return $host['SITEID'];
    }
    public static function hostId(){
        $host = self::host();
        return $host['HOSTID'];
    }
    public static function userId(){
        $host = self::host();
        return $host['NODE_HOST']->user_id;
    }
    
    public static function site(){
        $host = self::host();
        return $host['SITE'];
    }
    
    public static function host(){
        return Yii::$app->cache->get(Yii::$app->user->id);
    }
}
