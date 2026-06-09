<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    /**
     * Header keamanan HTTP yang ditambahkan ke setiap response.
     * Mencegah: Clickjacking, MIME sniffing, XSS, information leakage.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Cegah MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Cegah Clickjacking — hanya boleh di-embed dari origin yang sama
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Aktifkan filter XSS bawaan browser (legacy, tapi tetap berguna)
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Batasi informasi referrer yang dikirim ke pihak ketiga
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Larang akses ke API browser yang sensitif
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

        // Sembunyikan versi server / teknologi yang digunakan
        $response->headers->remove('X-Powered-By');
        $response->headers->set('Server', 'webserver');

        return $response;
    }
}
