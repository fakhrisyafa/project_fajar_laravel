<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes — PT Fajar Broadband
|--------------------------------------------------------------------------
*/

// ─── Public Routes ────────────────────────────────────────────────────────

Route::get('/', fn () => view('home'))->name('home');

Route::get('/login', fn () => view('auth.login'))->name('login.page');

// Auth API
Route::post('/login',       [LoginController::class, 'login'])->name('login');
Route::post('/logout',      [LoginController::class, 'logout'])->name('logout');
Route::get('/auth/check',   [LoginController::class, 'check'])->name('auth.check');

// ─── Protected Routes (session.auth) ─────────────────────────────────────

Route::middleware('session.auth')->group(function () {

    // Halaman inventaris
    Route::get('/inventaris', fn () => view('inventaris.index'))->name('inventaris');

    // ─── Items API ────────────────────────────────────────
    Route::get('/api/items',          [ItemController::class, 'index'])->name('api.items.index');
    Route::post('/api/items',         [ItemController::class, 'store'])->middleware('admin.only')->name('api.items.store');
    Route::put('/api/items/{id}',     [ItemController::class, 'update'])->middleware('admin.only')->name('api.items.update');
    Route::delete('/api/items/{id}',  [ItemController::class, 'destroy'])->middleware('admin.only')->name('api.items.destroy');

    // ─── Transactions API ─────────────────────────────────
    Route::get('/api/trans',          [TransactionController::class, 'index'])->name('api.trans.index');
    Route::post('/api/trans',         [TransactionController::class, 'store'])->name('api.trans.store');
    Route::delete('/api/trans/{id}',  [TransactionController::class, 'destroy'])->middleware('admin.only')->name('api.trans.destroy');

    // ─── Users API (Admin only) ───────────────────────────
    Route::middleware('admin.only')->group(function () {
        Route::get('/api/users',                [UserController::class, 'index'])->name('api.users.index');
        Route::post('/api/users',               [UserController::class, 'store'])->name('api.users.store');
        Route::put('/api/users/password',       [UserController::class, 'resetPassword'])->name('api.users.password');  // HARUS sebelum {id}
        Route::put('/api/users/{id}',           [UserController::class, 'update'])->name('api.users.update');
        Route::delete('/api/users/{id}',        [UserController::class, 'destroy'])->name('api.users.destroy');
        Route::post('/api/users/foto',          [UserController::class, 'uploadPhoto'])->name('api.users.foto');
    });

    // ─── Upload API ───────────────────────────────────────
    Route::post('/api/upload',        [UploadController::class, 'uploadItemPhoto'])->name('api.upload');
});
