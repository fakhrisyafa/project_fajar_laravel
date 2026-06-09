<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * POST — upload foto barang
     * Menggantikan: POST api/upload.php
     */
    public function uploadItemPhoto(Request $request)
    {
        $id   = $request->input('id');
        $file = $request->file('foto');

        if (!$id || !$file) {
            return response()->json(['error' => 'Data tidak lengkap'], 400);
        }

        // Pastikan item ada sebelum upload
        $item = Item::find(intval($id));
        if (!$item) {
            return response()->json(['error' => 'Barang tidak ditemukan'], 404);
        }

        // Batas ukuran: 2MB
        if ($file->getSize() > 2 * 1024 * 1024) {
            return response()->json(['error' => 'Ukuran file maksimal 2MB'], 400);
        }

        // Validasi MIME type
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            return response()->json(['error' => 'File bukan gambar valid'], 400);
        }

        // Validasi ekstensi
        $ext         = strtolower($file->getClientOriginalExtension());
        $allowedExts = ['jpg', 'jpeg', 'png', 'webp'];
        if (!in_array($ext, $allowedExts)) {
            return response()->json(['error' => 'Format tidak didukung'], 400);
        }

        // Gunakan UUID agar filename tidak bisa ditebak/dienumerasi
        $filename    = 'item_' . Str::uuid() . '.' . $ext;
        $uploadPath  = public_path('uploads');

        // Hapus foto lama jika ada, sebelum simpan yang baru
        if ($item->foto && file_exists($uploadPath . '/' . $item->foto)) {
            @unlink($uploadPath . '/' . $item->foto);
        }

        $file->move($uploadPath, $filename);

        // Update kolom foto di tabel items
        $item->update(['foto' => $filename]);

        return response()->json(['foto' => $filename]);
    }
}
