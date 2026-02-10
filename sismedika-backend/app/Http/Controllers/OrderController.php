<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Table;
use App\Models\Food;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    // Api list all orders
    public function index(){
        return response()->json(Order::with(['table', 'user'])->orderBy('created_at', 'desc')->get());
    }

    // Api detail order
    public function show($id)
    {
        $order = Order::with(['table', 'user', 'items.food'])->findOrFail($id);
        return response()->json($order);
    }

    // Api open order (pelayan)
    public function open(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:tables,id',
        ]);

        $user = $request->user();

        $table = Table::findOrFail($request->table_id);

        if ($table->status !== 'available') {
            return response()->json(['message' => 'Table not available'], 400);
        }

        $order = Order::create([
            'table_id' => $table->id,
            'user_id'  => $user->id,
            'status'   => 'open',
        ]);

        $table->update(['status' => 'occupied']);

        return response()->json([
            'message' => "Successfully opened order for table {$table->table_number}",
            'order'   => [
                'id'        => $order->id,
                'table_id'  => $order->table_id,
                'user_id'   => $order->user_id,
                'status'    => $order->status,
            ]
        ]);
    }

    // Api add food to order (pelayan)
    public function addItem(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'food_id'  => 'required|exists:foods,id',
            'qty'      => 'required|integer|min:1',
        ]);

        $order = Order::where('id', $request->order_id)
                      ->where('status', 'open')
                      ->firstOrFail();

        $food = Food::findOrFail($request->food_id);

        $item = OrderItem::where('order_id', $order->id)
                         ->where('food_id', $food->id)
                         ->first();

        if ($item) {
            $item->increment('qty', $request->qty);
            $item->total_price = $item->qty * $item->price;
            $item->save();
        } else {
            $item = OrderItem::create([
                'order_id' => $order->id,
                'food_id'  => $food->id,
                'qty'      => $request->qty,
                'price'    => $food->price,
                'total_price' => $food->price * $request->qty,
            ]);
        }

        return response()->json([
            'message' => "Successfully added {$food->name} to order",
            'item' => [
                'id'       => $item->id,
                'order_id' => $item->order_id,
                'food_id'  => $item->food_id,
                'qty'      => $item->qty,
                'price'    => $item->price,
                'total_price' => $item->total_price,
            ]
        ], 201);
    }

    // Api finsh order (pelayan)
    public function finish(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::where('id', $request->order_id)
                  ->where('status', 'open')
                  ->firstOrFail();

        $order->update([
            'status' => 'finished',
        ]);

        return response()->json([
            'message' => 'Successfully finished order',
            'order' => [
                'id'        => $order->id,
                'table_id'  => $order->table_id,
                'status'    => $order->status,
                'total_price' => $order->total_price,
            ]
        ]);
    }

    // Api close order and calculate total (kasir)
    public function close(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::with(['items', 'table'])
                    ->where('id', $request->order_id)
                    ->where('status', 'finished')
                    ->firstOrFail();

        $total = $order->items->sum('total_price');

        $order->update([
            'status' => 'closed',
            'total_price' => $total,
        ]);

        $order->table->update(['status' => 'available']);

        return response()->json([
            'message' => 'Order closed successfully',
            'total_price' => $total,
        ]);
    }

    // Generate PDF receipt for order
    public function receipt($id)
    {
    $order = Order::with(['table', 'items.food'])->findOrFail($id);

    if ($order->status !== 'closed') {
        return response()->json([
            'message' => 'Order must be closed before generating receipt'
        ], 400);
    }

    $pdf = Pdf::loadView('receipt', [
        'order' => $order
    ]);

    return $pdf->download('receipt-order-'.$order->id.'.pdf');
    }
}
