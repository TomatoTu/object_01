<?php

namespace node\modules\system\models;

use Yii;
use node\models\site\Resource as baseResource;
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
class Resource extends baseResource{
    
}
