<?php

use App\Http\Controllers\AdmissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::controller(AdmissionController::class)->prefix('admissions')->group(function() {
    Route::post('/step1', 'step1');
    Route::post('/step2', 'step2');
    Route::post('/step3', 'step3');
    Route::post('/step4', 'step4');
});

