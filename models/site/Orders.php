<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "orders".
 *
 * @property integer $id
 * @property string $order_no
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $member_id
 * @property integer $address_id
 * @property string $consignee
 * @property string $province
 * @property string $city
 * @property string $area
 * @property string $address
 * @property string $phone
 * @property string $fixed_tel
 * @property string $email
 * @property string $zip
 * @property string $message
 * @property string $subtotal
 * @property integer $qtytotal
 * @property string $shipping
 * @property string $total
 * @property integer $status
 * @property string $status_config
 * @property integer $is_show
 * @property integer $pay_type
 * @property integer $delivery_type
 * @property string $shipping_type
 * @property string $shipping_no
 * @property string $created_at
 * @property string $pay_at
 * @property string $delivery_at
 * @property string $receive_at
 * @property string $finish_at
 * @property string $cancelled_at
 */
class Orders extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'orders';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['order_no', 'host_id', 'site_id', 'member_id', 'address_id', 'consignee', 'province', 'city', 'area', 'address', 'phone', 'subtotal', 'qtytotal', 'shipping', 'total', 'delivery_type'], 'required'],
            [['host_id', 'site_id', 'member_id', 'address_id', 'qtytotal', 'status', 'is_show', 'pay_type', 'delivery_type'], 'integer'],
            [['subtotal', 'shipping', 'total'], 'number'],
            [['created_at', 'pay_at', 'delivery_at', 'receive_at', 'finish_at', 'cancelled_at'], 'safe'],
            [['order_no', 'address', 'message'], 'string', 'max' => 255],
            [['consignee', 'province', 'city', 'area', 'email', 'shipping_type', 'shipping_no'], 'string', 'max' => 100],
            [['phone'], 'string', 'max' => 15],
            [['fixed_tel', 'zip'], 'string', 'max' => 50],
            [['status_config'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'order_no' => 'Order No',
            'host_id' => 'Host ID',
            'site_id' => 'Site ID',
            'member_id' => 'Member ID',
            'address_id' => 'Address ID',
            'consignee' => 'Consignee',
            'province' => 'Province',
            'city' => 'City',
            'area' => 'Area',
            'address' => 'Address',
            'phone' => 'Phone',
            'fixed_tel' => 'Fixed Tel',
            'email' => 'Email',
            'zip' => 'Zip',
            'message' => 'Message',
            'subtotal' => 'Subtotal',
            'qtytotal' => 'Qtytotal',
            'shipping' => 'Shipping',
            'total' => 'Total',
            'status' => 'Status',
            'status_config' => 'Status Config',
            'is_show' => 'Is Show',
            'pay_type' => 'Pay Type',
            'delivery_type' => 'Delivery Type',
            'shipping_type' => 'Shipping Type',
            'shipping_no' => 'Shipping No',
            'created_at' => 'Created At',
            'pay_at' => 'Pay At',
            'delivery_at' => 'Delivery At',
            'receive_at' => 'Receive At',
            'finish_at' => 'Finish At',
            'cancelled_at' => 'Cancelled At',
        ];
    }
}
