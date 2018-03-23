<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "seo_info".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $type
 * @property integer $aim_id
 * @property string $page_title
 * @property string $page_keywords
 * @property string $page_description
 * @property string $footer_code
 * @property string $header_code
 * @property integer $status
 */
class SeoInfo extends BaseActiveRecord
{
    // Type
    const TYPE_ALL = 0;
    const TYPE_PAGE = 1;
    const TYPE_CAG = 2;
    const TYPE_SYS = 3;
    const TYPE_PRO = 4;
    // STATUS
    const STATUS_ACTIVE = 1;
    const STATUS_DISABLE = 0;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'seo_info';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'type', 'aim_id', 'status'], 'integer'],
            [['page_title'], 'string', 'max' => 100],
            [['page_keywords', 'page_description', 'footer_code', 'header_code'], 'string', 'max' => 300]
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
            'type' => 'Type',
            'aim_id' => 'Aim ID',
            'page_title' => 'Page Title',
            'page_keywords' => 'Page Keywords',
            'page_description' => 'Page Description',
            'footer_code' => 'Footer Code',
            'header_code' => 'Header Code',
            'status' => 'Status',
        ];
    }
}
