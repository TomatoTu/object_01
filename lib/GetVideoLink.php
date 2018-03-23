<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;

/**
 * Description of GetVideoLink
 *
 * @author xiaojx
 */
class GetVideoLink {

    /**
     * 获取视频路径
     * @param type $url
     * @return string
     */
    public function getUrl($url) {
        $parse = parse_url($url);
        isset($parse['host']) && $host = $parse['host'];
        $methods = [
            "www.tudou.com" => "tudou",
            "v.youku.com" => "youku",
            "v.ku6.com" => "ku6",
            "tv.sohu.com" => "sohu",
            "video.sina.com.cn" => "sina",
            "www.56.com" => "five_six",
            "www.iqiyi.com" => "iqiyi",
            "v.ifeng.com" => "ifeng",
            "www.yinyuetai.com" => "yinyuetai"];
        if (isset($methods[$host])){
            $function=$methods[$host];
            return $this->$function($url);
        }
        return '';
    }

    /**
     * 优酷网 
     * // http://www.youku.com 
     * @param string $url 
     */
    private function youku($url) {
        preg_match('/id_(.*).html/', $url, $url);
        if (isset($url[1])) {
            return "http://static.youku.com/v/swf/qplayer.swf?VideoIDS={$url[1]}&=&isAutoPlay=true&embedid";
        }
    }

    /**
     * 土豆网 
     * // http://www.tudou.com 
     * @param string $url 
     */
    private function tudou($url) {
        $data = file_get_contents($url);
        // 匹配真实url地址所需的iid编号 
        preg_match('/iid:(.*)/', $data, $result);
        if (isset($result[1])) {
            $url = trim($result[1]);
            return "http://www.tudou.com/l/eLfX4r5ezK4/&iid={$url}&resourceId=0_04_05_99/v.swf";
        }
    }

    /**
     * 酷6网 
     * // http://www.ku6.com 
     * @param string $url 
     */
    private function ku6($url) {
        // 匹配真实url地址 
        preg_match('/show/(.*).{1}/', $url, $result);
        if (isset($result[1])) {
            return "http://player.ku6.com/refer/{$result[1]}/v.swf&auto=1";
        }
    }

    /**
     * 搜狐视频 
     * // http://tv.sohu.com 
     * @param string $url 
     */
    private function sohu($url) {
        $data = file_get_contents($url);
        // 匹配真实url地址 
        preg_match('/<meta property="og:video" content="(.*)"/>/', $data, $result);
        if (isset($result[1])) {
            return $result[1];
        }
    }

    /**
     * 新浪播客 
     * // http://video.sina.com.cn 
     * @param string $url 
     */
    private function sina($url) {
        $data = file_get_contents($url);
        // 匹配真实url地址 
        preg_match("/swfOutsideUrl:'(.*)',/", $data, $result);
        if (isset($result[1])) {
            return $result[1];
        }
    }

    /**
     * 56网 
     * // http://www.56.com 
     * @param string $url 
     */
    private function five_six($url) {
        // 取出视频所需key 
        preg_match('/(v_.*).html/', $url, $result);

        if (isset($result[1])) {
            return "http://player.56.com/{$result[1]}.swf";
        }
    }

    /**
     * 奇艺网 
     * // http://www.qiyi.com 
     * @param string $url 
     */
    private function iqiyi($url) {
        $data = file_get_contents($url);

        // 取出视频所需key 
        preg_match('/("videoId":"(.*)")|(data-player-videoid="(.*)")/U', $data, $result);

        if (isset($result[4])) {
            return "http://www.iqiyi.com/player/20130315154043/SharePlayer.swf?vid={$result[4]}";
        }
    }

    /**
     * 凤凰网 
     * // http://www.ifeng.com 
     * @param string $url 
     */
    private function ifeng($url) {
        // 取出视频所需key 
        preg_match('/d+/(.*)./', $url, $result);
        if (isset($result[1])) {
            return "http://v.ifeng.com/include/exterior.swf?guid={$result[1]}&fromweb=sinaweibo&AutoPlay=true";
        }
    }

}
