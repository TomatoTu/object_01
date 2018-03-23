<?php

namespace node\models\node;

use Yii;

/**
 * This is the model class for table "host_operate_log".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $operate_type
 * @property string $description
 * @property integer $result
 * @property string $ipaddress
 * @property string $create_time
 */
class HostOperateLog extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'host_operate_log';
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
            [['host_id', 'operate_type', 'result'], 'integer'],
            [['create_time'], 'safe'],
            [['description'], 'string', 'max' => 300],
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
            'operate_type' => 'Operate Type',
            'description' => 'Description',
            'result' => 'Result',
            'ipaddress' => 'Ipaddress',
            'create_time' => 'Create Time',
        ];
    }
}
