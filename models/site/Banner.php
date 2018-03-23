<?php

namespace node\models\site;

use Yii;
use node\models\site\BannerItem;
use node\lib\models\BaseActiveRecord;

/**
 * This is the model class for table "banner".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $page_id
 * @property integer $type
 * @property integer $is_show
 * @property string $banner_config
 */
class Banner extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'banner';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'page_id', 'type', 'is_show'], 'integer'],
            [['config'], 'string']
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
            'page_id' => 'Page ID',
            'type' => 'Type',
            'is_show' => 'Is Show',
            'config' => 'config',
        ];
    }
    
    /**
     * 关联Banner属性
     * @return type
     */
    public function getItems(){
        return $this->hasMany(BannerItem::className(), ['banner_id'=>'id'])->orderBy('order_num');
    }
    
    /**
     * 获取页面Banner
     * @param type $page_id
     * @return type
     */
     public static function pageBanner($page_id){
        $data['page_id']=$page_id;
        $data['host_id'] = Yii::$app->params['NAPLES']['HOSTID'];
        $data['site_id'] =Yii::$app->params['NAPLES']['SITEID'];
        return self::find()->where($data)->with('items')->asArray()->one();
    }
}
