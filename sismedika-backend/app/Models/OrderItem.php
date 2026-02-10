<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'food_id',
        'qty',
        'price',
        'total_price',
    ];

    // Item milik satu order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Item mengacu ke satu food
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
