<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "member_sign".
 *
 * @property string $id
 * @property string $host_id
 * @property string $site_id
 * @property string $username
 * @property string $password
 * @property string $email
 * @property string $login_last_time
 * @property string $login_this_time
 * @property string $login_last_ip
 * @property string $login_this_ip
 * @property integer $staute
 * @property integer $type
 * @property string $phpsession
 */
class MemberSign extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'member_sign';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'username'], 'required'],
            [['host_id', 'site_id', 'login_last_time', 'login_this_time', 'staute', 'type'], 'integer'],
            [['username', 'login_last_ip', 'login_this_ip'], 'string', 'max' => 20],
            [['password', 'phpsession'], 'string', 'max' => 32],
            [['email'], 'string', 'max' => 30]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'host_id' => 'Host ID',
            'site_id' => 'Site ID',
            'username' => 'Username',
            'password' => 'Password',
            'email' => 'Email',
            'login_last_time' => 'Login Last Time',
            'login_this_time' => 'Login This Time',
            'login_last_ip' => 'Login Last Ip',
            'login_this_ip' => 'Login This Ip',
            'staute' => 'Staute',
            'type' => 'Type',
            'phpsession' => 'Phpsession',
        ];
    }
}
