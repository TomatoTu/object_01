<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\lib;

/**
 * Description of Function
 *
 * @author dingjj
 */
class Functions {
    /**
    * $operation: E是加密，D是解密
    */
    public static function encrypt($string, $operation, $key='') {
        $key = md5($key);
        $key_length = strlen($key);
        $string = $operation=='D'?base64_decode($string):substr(md5($string.$key),0,8).$string;
        $string_length=strlen($string);
        $rndkey=$box=array();
        $result='';
        for($i=0; $i<=255; $i++) {
                $rndkey[$i] = ord($key[$i%$key_length]);
                $box[$i] = $i;
        }
        for ($j=$i=0; $i<256; $i++) {
                $j=($j+$box[$i]+$rndkey[$i])%256;
                $tmp=$box[$i];
                $box[$i]=$box[$j];
                $box[$j]=$tmp;
        }
        for($a=$j=$i=0; $i<$string_length; $i++) {
                $a=($a+1)%256;
                $j=($j+$box[$a])%256;
                $tmp=$box[$a];
                $box[$a]=$box[$j];
                $box[$j]=$tmp;
                $result.=chr(ord($string[$i])^($box[($box[$a]+$box[$j])%256]));
        }
        if ($operation=='D') {
                if (substr($result,0,8)==substr(md5(substr($result,8).$key),0,8)) {
                        return substr($result,8);
                } else {
                        return '';
                }
        } else {
                return str_replace('=', '', base64_encode($result));
        }
    }
}
