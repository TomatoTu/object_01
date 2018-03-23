<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "member_info".
 *
 * @property string $id
 * @property string $host_id
 * @property string $site_id
 * @property string $member_id
 * @property string $image
 * @property string $uname
 * @property string $utel
 * @property string $uphone
 * @property string $uaddress
 */
class MemberInfo extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'member_info';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'member_id'], 'required'],
            [['host_id', 'site_id', 'member_id', 'image'], 'integer'],
            [['uname', 'uaddress'], 'string', 'max' => 255],
            [['utel', 'uphone'], 'string', 'max' => 20]
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
            'member_id' => 'Member ID',
            'image' => 'Image',
            'uname' => 'Uname',
            'utel' => 'Utel',
            'uphone' => 'Uphone',
            'uaddress' => 'Uaddress',
        ];
    }
}
