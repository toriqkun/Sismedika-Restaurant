<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FoodController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->post('/profile', [ProfileController::class, 'update']);

// Routes Kasir
Route::middleware(['auth:sanctum', 'role:kasir'])->group(function () {
  Route::get('/orders', [OrderController::class, 'index']);
  Route::post('/orders/close', [OrderController::class, 'close']);
  Route::get('/orders/{id}/receipt', [OrderController::class, 'receipt']);
});

// Routes Pelayan
Route::middleware(['auth:sanctum', 'role:pelayan'])->group(function () {
  Route::get('/foods', [FoodController::class, 'index']);
  Route::post('/foods', [FoodController::class, 'store']);
  Route::get('/foods/{food}', [FoodController::class, 'show']);
  Route::post('/foods/{food}', [FoodController::class, 'update']);
  Route::delete('/foods/{food}', [FoodController::class, 'destroy']);

  Route::post('/orders/open', [OrderController::class, 'open']);
  Route::post('/orders/add-item', [OrderController::class, 'addItem']);
  Route::post('/orders/finish', [OrderController::class, 'finish']);
});

// Get detail order
Route::middleware(['auth:sanctum'])->group(function () {
  Route::get('/orders/{id}', [OrderController::class, 'show']);
});

// Get list tables
Route::get('/tables', [TableController::class, 'index']);


