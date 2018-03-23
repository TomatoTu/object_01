<?php

namespace node\lib;

/**
 * Description of SitePath
 *
 * @author guanyi
 */
class NodePath {

    /**
     * 贡献给次控端的一个方法，站点端不进行使用
     * @param string $path 链接的原路径相遇域名的路径
     * @param string $code 初始化到 host 下的 auth_key 
     */
    final public static function getNewResourceHrefPath($path, $authKey) {
        return self::getResourceHrefByCode($authKey) . substr($path, strpos($path, 'resource') + strlen('resource'));
    }

    public static function getResourceHrefByCode($code) {
        // 通过特征码获取用户的host目录 self::getHostHrefByCode($code);
        // 拼接成资源目录
        return self::getHostHrefByCode($code) . DIRECTORY_SEPARATOR . 'resource';
    }

    public static function getHostHrefByCode($code) {
        return '/home/' . str_replace('\\', '/', self::webHomeDirMake($code));
    }

    protected static function webHomeDirMake($code) {
        return substr(md5($code), 0, 1) . DIRECTORY_SEPARATOR . substr(md5($code), 1, 1) . DIRECTORY_SEPARATOR . $code;
    }

}
