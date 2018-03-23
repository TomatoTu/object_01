<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;

/**
 * This is the model class for table "system".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $system_type_id
 * @property string $name
 * @property string $config
 */
class System extends BaseActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'system';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['host_id', 'site_id', 'system_type_id'], 'integer'],
            [['name'], 'string', 'max' => 100],
            [['config'], 'string', 'max' => 500]
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
            'system_type_id' => 'System Type ID',
            'name' => '系统名称',
            'config' => 'Config',
        ];
    }

    /**
     * 与文章分类关联
     * @return type
     */
    public function getArticleCategories() {
        return $this->hasMany(Categories::className(), ['site_id' => 'site_id', 'host_id' => 'host_id', 'system_id' => 'id'])->orderBy('parent_id,order_num,id');
    }
    
    /**
     * 获取文章系统信息
     * @return type
     */
    public static function ArticleSystemList(){
        return self::find()->where(['host_id'=>Yii::$app->params['NAPLES']['HOSTID'],'site_id'=>Yii::$app->params['NAPLES']['SITEID'],'system_type_id'=>2])->with(['articleCategories'])->asArray()->all();
    }
    
      /**
     * 与产品分类关联
     * @return type
     */
    public function getProductCategories() {
        return $this->hasMany(Categories::className(), ['site_id' => 'site_id', 'host_id' => 'host_id', 'system_id' => 'id'])->orderBy('parent_id,order_num,id');
    }
    
    /**
     * 获取产品系统信息
     * @return type
     */
    public static function ProductSystemList(){
        return self::find()->where(['host_id'=>Yii::$app->params['NAPLES']['HOSTID'],'site_id'=>Yii::$app->params['NAPLES']['SITEID'],'system_type_id'=>1])->with(['productCategories'])->asArray()->all();
    }

}
