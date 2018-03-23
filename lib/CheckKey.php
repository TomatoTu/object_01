<?php

namespace node\lib;

/**
 * @author guanyi
 */
class CheckKey {

    const Key = '4nssw1wSpWluP4N6';

    /**
     * 返回对参数进行不可逆加密的key的结果
     * @param Array $data 传入的参数一个数组或者是字符串
     * @return String 返回不可逆加密后的结果
     */
    public static function getKey($data) {
        $md5 = '';
        if(!empty($data)){
            ksort($data);
            foreach($data as $key=>$value){
                $md5 .= (string)$key.(string)$value;
            }
        }
        return md5($md5 . self::Key);
    }

    /**
     * 传入需要传输的数组参数，自动添加一个ckey参数在结尾
     * 例如：传入参数
     * array(
     *      'site_id'=>'2',
     *      'type'=>'project',
     * );
     * 返回结果
     * array(
     *      'site_id'=>'2',
     *      'type'=>'project',
     *      'ckey'=>'31431as3d21341sd3gf1g3451t',
     * );
     * @param Array $data 传入的参数一个数组或者是字符串
     * @return Array 在原有的数据基础上返回不可逆加密后的ckey结果
     */
    public static function build($data) {
        if (isset($data['ckey']))
            throw new Exception('This \'ckey\' is already in data');
        $data['ckey'] = self::getKey($data);
        return $data;
    }

    /**
     * 接收到的参数然后进行ckey的验证，如果一致则返回 true 不一致返回 false
     * @param Array $data 接收次控传递过来的参数
     * @return Boolean 验证通过返回 true 验证不通过返回 false
     */
    public static function verification($data) {
        if (!isset($data['ckey']) || empty($data['ckey']))
            return false;
        $ckey = $data['ckey'];
        unset($data['ckey']);
        if ($ckey === self::getKey($data))
            return $data;
        return false;
    }

}
