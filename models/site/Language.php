<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "language".
 *
 * @property integer $id
 * @property string $name
 * @property string $lan_no
 */
class Language extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'language';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'lan_no'], 'required'],
            [['name'], 'string', 'max' => 10],
            [['lan_no'], 'string', 'max' => 5]
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
            'lan_no' => 'Lan No',
        ];
    }
}
