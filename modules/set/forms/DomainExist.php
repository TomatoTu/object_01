<?php
namespace node\modules\set\forms;

use yii\base\Model;
use node\modules\set\models\Domain;
use Yii;

/**
 * Signup form
 */
class DomainExist extends Model
{
    public $domain;
    public $host_id;
    
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['host_id','safe'],
            // required
            [['domain'],'required'],
            // trim
            [['domain'], 'filter', 'filter' => 'trim'],
            
            [['domain'], 'string','max'=>200],
            
            ['domain', 'unique', 'targetClass' => Domain::className(),'targetAttribute'=>'domain_name', 'message' => 'This host_name has been saved.'],
        ];
    }
    
    public function saveDomain(){
        if(!$this->host_id){
            $this->addError('host_id','host_id is required.');
            return $this;
        }
        
        $domain = Domain::findOne(['host_id'=>$this->host_id]);
        if(!$domain){
            $domain = new Domain();
        }
        
        $domain->setAttributes($this->toArray());
        $domain->domain_name = $this->domain;
        $domain->save();
        return $domain;
    }
}
