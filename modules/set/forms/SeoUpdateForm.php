<?php
namespace node\modules\set\forms;

use node\modules\set\models\Domain;
use node\modules\set\models\Seo;
use Yii;
use yii\base\Model;

/**
 * Signup form
 */
class SeoUpdateForm extends Seo
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['page_title'], 'string', 'max' => 100],
            [['page_keywords', 'page_description', 'footer_code', 'header_code'], 'string', 'max' => 300]
        ];
    }
    
    public function setUpdate(){
        $seo = self::getSeo();
        $seo->setAttributes($this->toArray());
        $seo->save();
        return $seo;
    }
}
