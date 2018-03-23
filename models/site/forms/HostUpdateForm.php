<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Host;
/**
 * Description of HostUpdateForm
 *
 * @author dingjj
 */
class HostUpdateForm extends Host{
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'user_id', 'status', 'diskspace', 'page_count', 'resource_count', 'product_count', 'domain_count','host_type_id','is_trial'], 'integer'],
            [['create_time', 'end_time'], 'safe'],
        ];
    }
}
