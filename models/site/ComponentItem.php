<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "component_item".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $page_id
 * @property integer $component_id
 * @property string $name
 * @property string $link
 * @property integer $item_type
 * @property string $value
 * @property integer $status
 * @property string $config
 * @property integer $order_num
 */
class ComponentItem extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'component_item';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'page_id', 'component_id', 'item_type', 'status', 'order_num'], 'integer'],
            [['name', 'link'], 'string', 'max' => 200],
            [['value'], 'string', 'max' => 300],
            [['config'], 'string', 'max' => 500]
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
            'component_id' => 'Component ID',
            'name' => 'Name',
            'link' => 'Link',
            'item_type' => 'Item Type',
            'value' => 'Value',
            'status' => 'Status',
            'config' => 'Config',
            'order_num' => 'Order Num',
        ];
    }
    
    
    public static function getComponentItems($pageid = null) {
        $data['host_id'] = Yii::$app->params['NAPLES']['HOSTID'];
        $data['site_id'] =Yii::$app->params['NAPLES']['SITEID'];
        $data['page_id'] = $pageid;
        return self::find()->where($data)->orderBy('order_num')->asArray()->all();
    }
}
