<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class LoginController extends Controller
{
    /**
     * Login — menggantikan api/auth.php?action=login
     */
    public function login(Request $request)
    {
        $username = trim($request->input('username', ''));
        $password = trim($request->input('password', ''));

        if (!$username || !$password) {
            return response()->json(['error' => 'Username dan password wajib diisi'], 400);
        }

        // Rate limiting — maks 5 percobaan per IP per 5 menit
        $key = 'login:' . md5($request->ip());
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return response()->json([
                'error' => "Terlalu banyak percobaan. Coba lagi dalam {$seconds} detik."
            ], 429);
        }

        $user = User::where('username', $username)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            RateLimiter::hit($key, 300); // decay 5 menit
            return response()->json(['error' => 'Username atau password salah'], 401);
        }

        // Cek status akun
        if ($user->status === 'suspend') {
            return response()->json(['error' => 'Akun Anda telah dinonaktifkan. Hubungi Admin.'], 403);
        }

        RateLimiter::clear($key);

        // Update last_login
        $user->update(['last_login' => now()]);

        // Simpan data ke session
        session([
            'user_id'   => $user->id,
            'username'  => $user->username,
            'nama'      => $user->nama,
            'role'      => $user->role,
        ]);

        return response()->json([
            'ok'        => true,
            'nama'      => $user->nama,
            'role'      => $user->role,
            'username'  => $user->username,
            'csrf_token' => csrf_token(),
        ]);
    }

    /**
     * Cek sesi aktif — menggantikan api/auth.php?action=check
     */
    public function check(Request $request)
    {
        if (session('user_id')) {
            return response()->json([
                'loggedIn'   => true,
                'nama'       => session('nama'),
                'role'       => session('role'),
                'username'   => session('username'),
                'csrf_token' => csrf_token(),
            ]);
        }
        return response()->json(['loggedIn' => false]);
    }

    /**
     * Logout — menggantikan api/auth.php?action=logout
     */
    public function logout(Request $request)
    {
        $request->session()->flush();
        $request->session()->regenerate();
        return response()->json(['ok' => true]);
    }
}
