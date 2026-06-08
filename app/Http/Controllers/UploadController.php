<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

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

        $filename = 'item_' . intval($id) . '.' . $ext;
        $file->move(public_path('uploads'), $filename);

        // Update kolom foto di tabel items
        Item::where('id', intval($id))->update(['foto' => $filename]);

        return response()->json(['foto' => $filename]);
    }
}
