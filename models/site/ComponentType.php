<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "component_type".
 *
 * @property integer $id
 * @property string $name
 * @property string $msg
 */
class ComponentType extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'component_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'msg'], 'required'],
            [['id'], 'integer'],
            [['name', 'msg'], 'string', 'max' => 20],
            [['id'], 'unique']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'msg' => 'Msg',
        ];
    }
}
