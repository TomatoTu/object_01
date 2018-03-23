<?php

namespace node\models\models;
use yii\base\Model;
use yii\web\UploadedFile;
use node\lib\Functions;
use Yii;
use node\lib\CheckKey;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UploadForm
 *
 * @author xiaojx
 */
class UploadForm extends Model{
    /**
     * @var UploadedFile
     */
    public $upFile;
    public $upImage;
    public $upCompressed;
    public $upFlash;

    public function rules()
    {
        return [
            [['upImage'], 'file', 'skipOnEmpty' => true,'maxSize' => 2*1024*1024],
            [['upFile'], 'file', 'skipOnEmpty' => true,'maxSize' => 5*1024*1024],
            [['upCompressed'], 'file', 'skipOnEmpty' => true,'maxSize' => 5*1024*1024],
            [['upFlash'], 'file', 'skipOnEmpty' => true,'maxSize' => 5*1024*1024],
        ];
    }
    
    public function upload($type,$upClass,$space)
    {
        if ($this->validate()) {
            $uploadClass = $this->$upClass;
            $perm= CheckKey::build([
                    'host_id'   => Yii::$app->params['NAPLES']['HOSTID'],
                    'site_id'   => Yii::$app->params['NAPLES']['SITEID'],
                    'space' => $space,
                  //  'type'      => $type,
                    'extension' => mb_strtolower($this->$upClass->extension, 'utf-8'),
                  //  'picture'   => new \CURLFile($uploadClass->tempName,$uploadClass->type,$uploadClass->name)
//               'picture'   => '@'.$uploadClass->tempName.';type='.$uploadClass->type.';name='.$uploadClass->name.';size='.$uploadClass->size,
            ]);
            $perm['space'] = $space;
            $perm['picture']=new \CURLFile($uploadClass->tempName,$uploadClass->type,$uploadClass->name);
            $upload = Functions::getSiteApiByArray('upload',$perm);
//            Yii::warning($upload);
            if($upload && $upload['code'] == '0'){
                return $upload['uploadInfo'];
            }else{
                $this->addError('remote',$upload?$upload['code']:500);
                return false;
            }
        } else {
            return false;
        }
    }
}
