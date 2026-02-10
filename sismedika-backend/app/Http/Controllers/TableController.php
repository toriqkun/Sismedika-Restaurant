<?php

namespace App\Http\Controllers;

use App\Models\Table;

class TableController extends Controller
{
    public function index()
    {
    $tables = Table::with(['orders' => function ($q) {
        $q->whereIn('status', ['open', 'finished']);
    }])->get();

    return $tables->map(function ($table) {
        return [
            'id' => $table->id,
            'table_number' => $table->table_number,
            'status' => $table->status,
            'active_order_id' => optional($table->orders->first())->id,
        ];
    });
    }
}
