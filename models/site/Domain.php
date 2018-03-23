<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "domain".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $status
 * @property integer $domain_type
 * @property string $domain_name
 * @property string $create_time
 */
class Domain extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'domain';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'status', 'domain_type'], 'integer'],
            [['create_time'], 'safe'],
            [['domain_name'], 'string', 'max' => 200]
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
            'status' => 'Status',
            'domain_type' => 'Domain Type',
            'domain_name' => 'Domain Name',
            'create_time' => 'Create Time',
        ];
    }
}
