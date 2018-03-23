<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "host".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $auth_key
 * @property integer $status
 * @property integer $diskspace
 * @property integer $page_count
 * @property integer $host_type_id
 * @property integer $resource_count
 * @property integer $product_count
 * @property integer $domain_count
 * @property string $create_time
 * @property string $end_time
 */
class Host extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'host';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'auth_key'], 'required'],
            [['id', 'user_id', 'status', 'diskspace', 'page_count', 'resource_count', 'product_count', 'domain_count','host_type_id','is_trial'], 'integer'],
            [['create_time', 'end_time'], 'safe'],
            [['auth_key'], 'string', 'max' => 6]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'auth_key' => 'Auth Key',
            'status' => 'Status',
            'diskspace' => 'Diskspace',
            'page_count' => 'Page Count',
            'resource_count' => 'Resource Count',
            'product_count' => 'Product Count',
            'domain_count' => 'Domain Count',
            'create_time' => 'Create Time',
            'end_time' => 'End Time',
        ];
    }
}
