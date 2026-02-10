<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'table_id',
        'user_id',
        'status',
        'total_price',
    ];

    // Order milik satu meja
    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    // Order dibuat oleh satu user (pelayan/kasir)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Order punya banyak item
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
