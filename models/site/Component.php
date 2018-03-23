<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "component".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $page_id
 * @property integer $parent_id
 * @property integer $type_id
 * @property integer $choose
 * @property string $name
 * @property string $info
 * @property string $link
 * @property integer $status
 * @property integer $pos_row
 * @property integer $pos_column
 * @property string $config
 */
class Component extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'component';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'page_id', 'parent_id', 'type_id', 'choose', 'status', 'pos_row', 'pos_column'], 'integer'],
            [['info', 'config'], 'string'],
            [['name', 'link'], 'string', 'max' => 200]
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
            'parent_id' => 'Parent ID',
            'type_id' => 'Type ID',
            'choose' => 'Choose',
            'name' => 'Name',
            'info' => 'Info',
            'link' => 'Link',
            'status' => 'Status',
            'pos_row' => 'Pos Row',
            'pos_column' => 'Pos Column',
            'config' => 'Config',
        ];
    }
    
     public static function setComponentsRow($pageid, $parentid, $poscolumn, $posrow, $count = 1) {
        $data = ['and', 'host_id=' . Yii::$app->params['NAPLES']['HOSTID'], ['and', 'site_id=' .Yii::$app->params['NAPLES']['SITEID'], ['and', 'page_id=' . $pageid, ['and', 'parent_id=' . $parentid, ['and', 'pos_column=' . $poscolumn, ['>=', 'pos_row', $posrow]]]]]];
        return self::updateAllCounters(['pos_row' => $count], $data);
    }
    
     public static function getComponents($pageid = null) {
        $data['host_id'] = Yii::$app->params['NAPLES']['HOSTID'];
        $data['site_id'] =Yii::$app->params['NAPLES']['SITEID'];
        $data['page_id'] = $pageid;
        return self::find()->where($data)->orderBy('parent_id,pos_row,pos_column')->asArray()->all();
    }
    
      /**
     * 删除组件
     * @param type $type
     * @param type $aim_ids
     * @return type
     */
    public static function deleteComponent($com_id) {
        $host_id = Yii::$app->params['NAPLES']['HOSTID'];
        $site_id =Yii::$app->params['NAPLES']['SITEID'];
        $db = Yii::$app->db;
        $parms = [':host_id' => $host_id, ':site_id' => $site_id, ':component_id' => $com_id];
        $sql = 'delete from `resource_refrence` where `aim_id` in(select id from `component_item` where component_id=:component_id and host_id=:host_id and site_id=:site_id) and `type`=3';
        $db->createCommand($sql, $parms)->execute();
        $sql = 'delete from `component_item` where component_id=:component_id and host_id=:host_id and site_id=:site_id';
        $db->createCommand($sql, $parms)->execute();
        $parms = [':component_id' => $com_id];
        $sql = 'delete from `resource_refrence` where `aim_id`=:component_id and `type`=2';
        $db->createCommand($sql, $parms)->execute();
        $parms = [':host_id' => $host_id, ':site_id' => $site_id, ':component_id' => $com_id];
        $sql = 'delete from `component` where `id`=:component_id and host_id=:host_id and site_id=:site_id';
        $db->createCommand($sql, $parms)->execute();
    }
}
