<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "resource".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property string $name
 * @property string $relname
 * @property string $path
 * @property integer $type
 * @property string $size
 * @property string $exten
 * @property string $pixel
 * @property string $create_time
 */
class Resource extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'resource';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'type', 'size'], 'integer'],
            [['relname'], 'required'],
            [['create_time'], 'safe'],
            [['name'], 'string', 'max' => 100],
            [['relname', 'path'], 'string', 'max' => 200],
            [['exten'], 'string', 'max' => 10],
            [['pixel'], 'string', 'max' => 50]
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
            'name' => 'Name',
            'relname' => 'Relname',
            'path' => 'Path',
            'type' => 'Type',
            'size' => 'Size',
            'exten' => 'Exten',
            'pixel' => 'Pixel',
            'create_time' => 'Create Time',
        ];
    }
}
