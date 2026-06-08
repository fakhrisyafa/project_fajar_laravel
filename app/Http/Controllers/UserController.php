<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Harus sesuai dengan ENUM di tabel users
    protected array $allowedRoles = ['Admin', 'User', 'Supervisor', 'Teknisi', 'Gudang'];

    /**
     * GET — ambil semua user (Admin only)
     * Menggantikan: GET api/users.php
     */
    public function index()
    {
        $rows = User::select('id', 'nama', 'username', 'role', 'email', 'telepon', 'foto', 'status', 'last_login')
                    ->orderBy('id')
                    ->get();
        return response()->json($rows);
    }

    /**
     * POST — tambah user baru (Admin only)
     * Menggantikan: POST api/users.php
     */
    public function store(Request $request)
    {
        $nama     = trim($request->input('nama', ''));
        $username = trim($request->input('username', ''));
        $password = trim($request->input('password', ''));
        $role     = $request->input('role', 'Teknisi');
        $email    = trim($request->input('email', ''));
        $telepon  = trim($request->input('telepon', ''));

        if (!$nama || !$username || !$password) {
            return response()->json(['error' => 'Nama, username, dan password wajib diisi'], 400);
        }
        if (!in_array($role, $this->allowedRoles)) {
            return response()->json(['error' => 'Role tidak valid'], 400);
        }

        if (User::where('username', $username)->exists()) {
            return response()->json(['error' => 'Username sudah digunakan'], 409);
        }

        $user = User::create([
            'nama'     => $nama,
            'username' => $username,
            'password' => Hash::make($password),
            'role'     => $role,
            'email'    => $email,
            'telepon'  => $telepon,
        ]);

        return response()->json(['ok' => true, 'id' => $user->id]);
    }

    /**
     * PUT — edit user (Admin only)
     * Menggantikan: PUT api/users.php?action=edit
     */
    public function update(Request $request, $id)
    {
        $user     = User::find($id);
        if (!$user) return response()->json(['error' => 'User tidak ditemukan'], 404);

        $nama     = trim($request->input('nama', ''));
        $username = trim($request->input('username', ''));
        $role     = $request->input('role', 'Teknisi');
        $email    = trim($request->input('email', ''));
        $telepon  = trim($request->input('telepon', ''));

        if (!$nama || !$username) {
            return response()->json(['error' => 'Data tidak lengkap'], 400);
        }
        if (!in_array($role, $this->allowedRoles)) {
            return response()->json(['error' => 'Role tidak valid'], 400);
        }

        // Cek username duplikat
        if (User::where('username', $username)->where('id', '!=', $id)->exists()) {
            return response()->json(['error' => 'Username sudah digunakan'], 409);
        }

        $user->update(compact('nama', 'username', 'role', 'email', 'telepon'));
        return response()->json(['ok' => true]);
    }

    /**
     * PUT — reset password (Admin only)
     * Menggantikan: PUT api/users.php?action=password
     */
    public function resetPassword(Request $request)
    {
        $id   = (int) $request->input('id', 0);
        $pass = trim($request->input('password', ''));

        if (!$id || !$pass) {
            return response()->json(['error' => 'Data tidak lengkap'], 400);
        }
        if (strlen($pass) < 6) {
            return response()->json(['error' => 'Password minimal 6 karakter'], 400);
        }

        $user = User::find($id);
        if (!$user) return response()->json(['error' => 'User tidak ditemukan'], 404);

        $user->update(['password' => Hash::make($pass)]);
        return response()->json(['ok' => true]);
    }

    /**
     * POST — upload foto avatar (Admin only)
     * Menggantikan: POST api/users.php?action=foto
     */
    public function uploadPhoto(Request $request)
    {
        $id   = (int) $request->input('id', 0);
        $file = $request->file('foto');

        if (!$id || !$file) {
            return response()->json(['error' => 'Data tidak lengkap'], 400);
        }

        if ($file->getSize() > 2 * 1024 * 1024) {
            return response()->json(['error' => 'Ukuran file maksimal 2MB'], 400);
        }

        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            return response()->json(['error' => 'File bukan gambar valid'], 400);
        }

        $ext      = strtolower($file->getClientOriginalExtension());
        $filename = 'avatar_' . $id . '.' . $ext;
        $file->move(public_path('uploads/avatars'), $filename);

        $user = User::find($id);
        if ($user) $user->update(['foto' => $filename]);

        return response()->json(['ok' => true, 'foto' => $filename]);
    }

    /**
     * DELETE — hapus user (Admin only)
     * Menggantikan: DELETE api/users.php?id=X
     */
    public function destroy($id)
    {
        if ($id == session('user_id')) {
            return response()->json(['error' => 'Tidak bisa menghapus akun sendiri'], 400);
        }

        $user = User::find($id);
        if (!$user) return response()->json(['error' => 'User tidak ditemukan'], 404);

        $user->delete();
        return response()->json(['ok' => true]);
    }
}
