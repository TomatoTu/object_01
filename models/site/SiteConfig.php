<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "site_config".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $logo_type
 * @property string $logo_txt
 * @property string $logo_img_url
 */
class SiteConfig extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'site_config';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'logo_type'], 'integer'],
            [['logo_txt'], 'string', 'max' => 100],
            [['logo_img_url'], 'string', 'max' => 200]
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
            'logo_type' => 'Logo Type',
            'logo_txt' => 'Logo Txt',
            'logo_img_url' => 'Logo Img Url',
        ];
    }
}
