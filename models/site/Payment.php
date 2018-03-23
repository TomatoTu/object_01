<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "payment".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property string $config
 * @property integer $type
 * @property string $created_at
 */
class Payment extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'payment';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id'], 'required'],
            [['host_id', 'site_id', 'type'], 'integer'],
            [['created_at'], 'safe'],
            [['config'], 'string', 'max' => 255]
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
            'config' => 'Config',
            'type' => 'Type',
            'created_at' => 'Created At',
        ];
    }
}
