<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FoodController extends Controller
{
    // List Foods
    public function index()
    {
        return response()->json(Food::all()->map(fn ($food) => [
            'id'    => $food->id,
            'name'  => $food->name,
            'category' => $food->category,
            'price' => $food->price,
            'image' => $food->image ? asset($food->image) : null,
        ]));
    }

    // Create Food
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $food = new Food();
        $food->name = $request->name;
        $food->category = $request->category;
        $food->price = $request->price;

        if ($request->hasFile('image')){
            $path = public_path('uploads/foods');
            if (!file_exists($path)) {
                mkdir($path, 0755, true);
        }

        $file = $request->file('image');
        $filename = 'food-' .Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
        $file->move($path, $filename);
        $food->image = 'uploads/foods/' . $filename;
    }
        $food->save();

        return response()->json([
            'ok' => true,
            'message' => 'Food created successfully',
            'food' => [
                'id'    => $food->id,
                'name'  => $food->name,
                'category' => $food->category,
                'price' => $food->price,
                'image' => $food->image ? asset($food->image) : null,
            ]
        ], 201);
    }

    // Detail Food
    public function show(Food $food)
    {
        return response()->json([
            'id'   => $food->id,
            'name' => $food->name,
            'category' => $food->category,
            'price'=> $food->price,
            'image'=> $food->image ? asset($food->image) : null,
        ]);
    }

    // Update Food
    public function update(Request $request, Food $food)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $food->name = $request->name;
        $food->category = $request->category;
        $food->price = $request->price;

        if ($request->hasFile('image')) {
            if ($food->image && file_exists(public_path($food->image))) {
                unlink(public_path($food->image));
            }

            $path = public_path('uploads/foods');
            if (!file_exists($path)) {
                mkdir($path, 0755, true);
            }

            $file = $request->file('image');
            $filename = 'food-' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($path, $filename);
            $food->image = 'uploads/foods/' . $filename;
        }

        $food->save();

        return response()->json([
            'message' => 'Food updated successfully',
            'food' => [
                'id'    => $food->id,
                'name'  => $food->name,
                'category' => $food->category,
                'price' => $food->price,
                'image' => $food->image ? asset($food->image) : null,
            ]
        ]);
    }

    // Delete Food
    public function destroy(Food $food)
    {
        if ($food->image && file_exists(public_path($food->image))) {
            unlink(public_path($food->image));
        }

        $food->delete();

        return response()->json(['message' => 'Food deleted successfully']);
    }
}
