<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "article_info".
 *
 * @property string $id
 * @property string $host_id
 * @property string $site_id
 * @property string $system_id
 * @property string $category_id
 * @property string $title
 * @property string $synopsis
 * @property string $info
 * @property integer $is_show
 * @property integer $is_refuse
 * @property integer $is_top
 * @property string $config
 * @property integer $order_num
 * @property string $create_time
 * @property string $edite_time
 */
class ArticleInfo extends \node\lib\models\BaseActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'article_info';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['host_id', 'site_id', 'system_id', 'category_id', 'is_show', 'is_refuse', 'is_top', 'order_num'], 'integer'],
            [['system_id'], 'required'],
            [['synopsis', 'info'], 'string'],
            [['create_time', 'edite_time'], 'safe'],
            [['title', 'config'], 'string', 'max' => 200]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => 'ID',
            'host_id' => 'Host ID',
            'site_id' => 'Site ID',
            'system_id' => 'System ID',
            'category_id' => 'Category ID',
            'title' => 'Title',
            'synopsis' => 'Synopsis',
            'info' => 'Info',
            'is_show' => 'Is Show',
            'is_refuse' => 'Is Refuse',
            'is_top' => 'Is Top',
            'config' => 'Config',
            'order_num' => 'Order Num',
            'create_time' => 'Create Time',
            'edite_time' => 'Edite Time',
        ];
    }

    /**
     * 与分类关联
     * @return type
     */
    public function getCategories() {
        return $this->hasOne(Categories::className(), ['site_id' => 'site_id', 'host_id' => 'host_id', 'id' => 'category_id']);
    }

    public static function ArticleInfoList($system_id, $system_sort, $top_count) {
        $data = ['host_id' => Yii::$app->params['NAPLES']['HOSTID'], 'site_id' => Yii::$app->params['NAPLES']['SITEID'], 'system_id' => $system_id, 'is_show' => 1, 'is_refuse' => 0];
        if ($system_sort > 0)
            $data['category_id'] = $system_sort;
        return self::find()->where($data)->with(['categories'])->limit($top_count)->orderBy('is_top desc,order_num desc,id desc')->asArray()->all();
    }

}
