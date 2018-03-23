<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
use backend\models\site\Resource as Resource1;

/**
 * This is the model class for table "resource_refrence".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $resource_id
 * @property integer $type
 * @property integer $aim_id
 */
class ResourceRefrence extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'resource_refrence';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'resource_id', 'type', 'aim_id'], 'integer']
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
            'resource_id' => 'Resource ID',
            'type' => 'Type',
            'aim_id' => 'Aim ID',
        ];
    }
     /**
     * 与资源库关联
     * @return type
     */
    public function getResource() {
        return $this->hasOne(Resource1::className(), ['site_id' => 'site_id', 'host_id' => 'host_id', 'id' => 'resource_id']);
    }

    /**
     * 与资源库关联
     * @return type
     */
    public function getResourceOne() {
        return $this->hasOne(Resource1::className(), ['site_id' => 'site_id', 'host_id' => 'host_id', 'id' => 'resource_id']);
    }

    /**
     * 获取资源引用图片
     * @param type $host_id
     * @param type $site_id
     * @param type $type
     * @param type $aim_id
     */
    public static function getResourceByOne($type, $aim_id = null) {
          $db = Yii::$app->db;
          $sql = 'select rr.*,r.`path` from `resource_refrence` rr left join `resource` r on rr.`resource_id`=r.`id` where rr.`host_id`=:host_id and rr.`site_id`=:site_id and rr.`type`=:type';
          $parms=[':host_id' => Yii::$app->params['NAPLES']['HOSTID'], ':site_id' =>Yii::$app->params['NAPLES']['SITEID'], ':type' => $type];
          if(!empty($aim_id)){
          $sql.=' and rr.`aim_id`=:aim_id';
          $parms[':aim_id']=$aim_id;
          }
          $command = $db->createCommand($sql,$parms);
          return $command->queryOne();
   
    }

    /**
     * 获取资源引用图片
     * @param type $host_id
     * @param type $site_id
     * @param type $type
     * @param type $aim_id
     */
    public static function getResourceByMore($type, $aim_ids) {
          $db = Yii::$app->db;
          $sql = 'select rr.*,r.`path` from `resource_refrence` rr left join `resource` r on rr.`resource_id`=r.`id` where rr.`host_id`=:host_id and rr.`site_id`=:site_id and rr.`type`=:type and rr.`aim_id` in('.$aim_ids.') order by rr.`id` desc';
          $parms=[':host_id' => Yii::$app->params['NAPLES']['HOSTID'], ':site_id' =>Yii::$app->params['NAPLES']['SITEID'], ':type' => $type];
          $command = $db->createCommand($sql,$parms);
          return $command->queryAll();    
    }

    /**
     * 删除组件属性的资源引用
     * @param type $type
     * @param type $aim_ids
     * @return type
     */
    public static function deleteComItemRes($com_id) {
        $db = Yii::$app->db;
        $sql = 'delete from `resource_refrence` where `aim_id` in(select id from `component_item` where component_id=:component_id and host_id=:host_id and site_id=:site_id) and `type`=3';
        $parms = [':host_id' => Yii::$app->params['NAPLES']['HOSTID'], ':site_id' =>Yii::$app->params['NAPLES']['SITEID'], ':component_id' => $com_id];
        $command = $db->createCommand($sql, $parms);
        return $command->execute();
    }
}
