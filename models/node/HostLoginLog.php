<?php

namespace node\models\node;

use Yii;

/**
 * This is the model class for table "host_login_log".
 *
 * @property integer $id
 * @property integer $host_id
 * @property string $ipaddress
 * @property string $login_time
 * @property string $exit_time
 */
class HostLoginLog extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'host_login_log';
    }
    
     public static function getDb()
    {
        return Yii::$app->get('node');
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id'], 'integer'],
            [['login_time', 'exit_time'], 'safe'],
            [['ipaddress'], 'string', 'max' => 30]
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
            'ipaddress' => 'Ipaddress',
            'login_time' => 'Login Time',
            'exit_time' => 'Exit Time',
        ];
    }
}
