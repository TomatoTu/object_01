<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;

use Yii;
use node\models\node\Server;
use node\models\node\Host;
use node\lib\CheckKey;

/**
 * Description of BeforeRequest
 *
 * @author dingjj
 */
class Functions {

    // 绑定请求前方法
    public static function beforeRequest(){
        Yii::info('************请求信息***START*****');
        Yii::info($_GET);
        Yii::info($_POST);
        Yii::info('************请求信息***END*****');
        Yii::$app->user->loginUrl = Yii::$app->params['NODE_SERVER']['center_url'];
    }

    // 绑定请求后方法
    public static function afterRequest() {
        
        Yii::info('**********返回信息****START*******');
        Yii::info(Yii::$app->response->data);
        Yii::info('**********返回信息****END*******');
    }

    // 调用主控插入主机host数据
    public static function setCenterHost($host) {
        // 接口
        $action = 'node/host/create';
        // 添加加密字段
        $host['key'] = self::setEncrypt($action);
        Yii::info($host);
        return self::getApi(self::setApiUrl($action), $host);
    }
    
    // 调用主控修改密码
    public static function setCenterPassword($host) {
        // 接口
        $action = 'node/user/password';
        // 添加加密字段
        $host['key'] = self::setEncrypt($action);
        return self::getApi(self::setApiUrl($action), $host);
    }

    // 调用站点获取使用空间大小
    public static function getSiteSpace($domain, $hostid) {
        // 接口
        $action = '/api/size';
        $param = CheckKey::build(['host_id' => $hostid]);
        Yii::info($param);
        $ret = self::getApiArray('http://' . $domain . $action, $param);
        if (!$ret || !isset($ret['return']) || !$ret['return'] == 'success') {
            return 0;
        }
        return $ret['spaceSize'];
    }
    
    // 
    public static function getFilem($domain, $data) {
        // 接口
        $action = '/api/filem';
        $param = CheckKey::build($data);
        Yii::info($param);
        $ret = self::getApiArray('http://' . $domain . $action, $param);
        if (!$ret || !isset($ret['return']) || !$ret['return'] == 'success') {
            return 0;
        }
        return $ret;
    }
    
    // 调用站点获取使用空间大小
    public static function publishPages($domain, $site_id) {
        // 接口
        $action = '/api/page';
        $param = CheckKey::build(['site_id' => $site_id]);
        Yii::info($param);
        $ret = self::getApiArray('http://' . $domain . $action, $param);
        if (!$ret || !isset($ret['return']) || $ret['return'] != 'success') {
            return 0;
        }
        return true;
    }

    // 获取加密内容
    public static function getSecretKey($str) {
        return explode('|', Yii::$app->security->decryptByKey(base64_decode($str), Yii::$app->params['SECRET']));
    }

    // 主控Url
    public static function getCenterUrl() {
        return Yii::$app->params['NODE_SERVER']['center_url'];
    }

    // 设置apiUrl
    private static function setApiUrl($api) {
        return self::getCenterUrl() . '/' . $api;
    }

    // 设置加密字符串
    private static function setEncrypt($action) {
        $encryptParams['time'] = time();
        $encryptParams['skey'] = Yii::$app->params['SECRET'];
        $encryptParams['action'] = $action;
        return self::setEncryptKey($encryptParams);
    }

    // 设置加密key
    private static function setEncryptKey($params) {
        return str_replace('+', '%2b', base64_encode(Yii::$app->security->encryptByKey(implode(',', $params), Yii::$app->params['SECRET'])));
    }

    public static function getApiByArray($url, $param) {
        $curl = new Curl();
        $response = $curl->setOption(CURLOPT_POSTFIELDS, $param)->post($url);
        return json_decode($response, TRUE);
    }

    public static function getSiteApiByArray($apiName, $param = []) {
        Yii::trace($param);
        return Functions::getApiByArray('http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . '/api/' . $apiName, $param);
    }

    // 发送post请求
    private static function getApi($url, $params, $ssl = false) {

        $curl = new Curl();

        if ($ssl) {
            $curl->setOption(CURLOPT_SSL_VERIFYPEER, 0);
            $curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
        }

        $response = $curl->setOption(CURLOPT_POSTFIELDS, http_build_query($params))->post($url);
        Yii::info($response);
        return json_decode($response, TRUE);
    }

    private static function getApiArray($url, $params, $ssl = false) {

        $curl = new Curl();

        if ($ssl) {
            $curl->setOption(CURLOPT_SSL_VERIFYPEER, 0);
            $curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
        }
        Yii::error('curl'.time());
        $response = $curl->setOption(CURLOPT_POSTFIELDS, $params)->post($url);
        Yii::error('curl'.time());
        Yii::info($response);
        return json_decode($response, TRUE);
    }
    
    /**
     * 转义php代码
     * @param type $str
     * @return type
     */
    public static function clearPhpCode($str){
        return str_replace(['<?', '<%', '<?php', '<%php'], [htmlspecialchars('<?'), htmlspecialchars('<%'), htmlspecialchars('<?php'), htmlspecialchars('<%php')], $str);
    }

}
