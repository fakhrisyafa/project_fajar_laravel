<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminOnly
{
    /**
     * Cek apakah user memiliki role Admin.
     * Menggantikan: cek $_SESSION['role'] !== 'Admin' di setiap endpoint
     */
    public function handle(Request $request, Closure $next)
    {
        if (session('role') !== 'Admin') {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['error' => 'Akses ditolak'], 403);
            }
            abort(403, 'Akses ditolak');
        }

        return $next($request);
    }
}
