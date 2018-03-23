<?php

namespace node\lib;

/**
 * @author guanyi
 */
class CheckCookie {

    const Key = '4nssw1wSpWluP4N6';

    public static function getKey($data) {
        return md5($data . strtolower(self::Key));
    }

    public static function build($data) {
        $cookieString = self::getKey($data);
        $domain = parse_url(\Yii::$app->request->hostInfo);
        $domain = $domain['host'];
        $domain = explode('.', $domain);
        $domain = $domain[count($domain) - 2] . '.' . $domain[count($domain) - 1];
        return setcookie('_checkcookie', $cookieString, 0, '/', $domain);
    }

    /**
     * 接收到的参数然后进行ckey的验证，如果一致则返回 true 不一致返回 false
     * @param Array $data 接收次控传递过来的参数
     * @return Boolean 验证通过返回 true 验证不通过返回 false
     */
    public static function verification($data) {
        if (isset($_COOKIE['_checkcookie']) && $_COOKIE['_checkcookie'] === self::getKey($data)) {
            return true;
        }
        return false;
    }

}
