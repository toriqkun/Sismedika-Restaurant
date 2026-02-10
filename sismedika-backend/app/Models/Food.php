<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'foods';

    protected $fillable = [
        'name',
        'category',
        'price',
        'image',
    ];

    // Food bisa muncul di banyak order item
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
