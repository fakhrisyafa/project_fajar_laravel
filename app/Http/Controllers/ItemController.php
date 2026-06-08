<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * GET — ambil semua barang
     * Menggantikan: GET api/items.php
     */
    public function index()
    {
        $rows = Item::orderBy('id')->get();
        return response()->json($rows);
    }

    /**
     * POST — tambah barang baru (Admin only)
     * Menggantikan: POST api/items.php
     */
    public function store(Request $request)
    {
        $kode     = trim($request->input('kode', ''));
        $nama     = trim($request->input('nama', ''));
        $kat      = trim($request->input('kat', ''));
        $stok     = (int) $request->input('stok', 0);
        $satuan   = trim($request->input('satuan', ''));
        $lokasi   = trim($request->input('lokasi', ''));
        $kondisi  = trim($request->input('kondisi', ''));
        $ket      = trim($request->input('ket', ''));
        $stok_min = (int) $request->input('stok_min', 5);

        if (!$kode || !$nama || !$kat || !$satuan || !$lokasi || !$kondisi) {
            return response()->json(['error' => 'Semua field wajib diisi'], 400);
        }
        if ($stok < 0) {
            return response()->json(['error' => 'Stok tidak boleh negatif'], 400);
        }
        if (strlen($kode) > 50 || strlen($nama) > 100) {
            return response()->json(['error' => 'Kode atau nama terlalu panjang'], 400);
        }

        $item = Item::create([
            'kode'     => $kode,
            'nama'     => $nama,
            'kat'      => $kat,
            'stok'     => $stok,
            'satuan'   => $satuan,
            'lokasi'   => $lokasi,
            'kondisi'  => $kondisi,
            'ket'      => $ket,
            'stok_min' => $stok_min,
            'foto'     => null,
        ]);

        return response()->json(['id' => $item->id]);
    }

    /**
     * PUT — edit barang (Admin only)
     * Menggantikan: PUT api/items.php
     */
    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['error' => 'Barang tidak ditemukan'], 404);
        }

        $kode     = trim($request->input('kode', ''));
        $nama     = trim($request->input('nama', ''));
        $kat      = trim($request->input('kat', ''));
        $stok     = (int) $request->input('stok', 0);
        $satuan   = trim($request->input('satuan', ''));
        $lokasi   = trim($request->input('lokasi', ''));
        $kondisi  = trim($request->input('kondisi', ''));
        $ket      = trim($request->input('ket', ''));
        $stok_min = (int) $request->input('stok_min', 5);

        if (!$kode || !$nama || !$kat || !$satuan || !$lokasi || !$kondisi) {
            return response()->json(['error' => 'Semua field wajib diisi'], 400);
        }
        if ($stok < 0) {
            return response()->json(['error' => 'Stok tidak boleh negatif'], 400);
        }
        if (strlen($kode) > 50 || strlen($nama) > 100) {
            return response()->json(['error' => 'Kode atau nama terlalu panjang'], 400);
        }

        $item->update([
            'kode'     => $kode,
            'nama'     => $nama,
            'kat'      => $kat,
            'stok'     => $stok,
            'satuan'   => $satuan,
            'lokasi'   => $lokasi,
            'kondisi'  => $kondisi,
            'ket'      => $ket,
            'stok_min' => $stok_min,
        ]);

        return response()->json(['ok' => true]);
    }

    /**
     * DELETE — hapus barang (Admin only)
     * Menggantikan: DELETE api/items.php?id=X
     */
    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['error' => 'Barang tidak ditemukan'], 404);
        }

        $item->delete();
        return response()->json(['ok' => true]);
    }
}
