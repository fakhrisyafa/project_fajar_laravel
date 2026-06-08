<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthSession
{
    /**
     * Cek apakah user sudah login via session.
     * Menggantikan: session_start() + cek $_SESSION['user_id'] di setiap API
     */
    public function handle(Request $request, Closure $next)
    {
        if (!session('user_id')) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            return redirect('/login');
        }

        return $next($request);
    }
}
