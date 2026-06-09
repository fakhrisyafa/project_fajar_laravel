<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * GET — ambil semua transaksi
     * Menggantikan: GET api/trans.php
     */
    public function index()
    {
        $rows = Transaction::orderByDesc('tgl')->orderByDesc('id')->get();
        return response()->json($rows);
    }

    /**
     * POST — tambah transaksi + update stok
     * Menggantikan: POST api/trans.php
     */
    public function store(Request $request)
    {
        $type    = $request->input('type');
        $item_id = (int) $request->input('item_id');
        $nama    = $request->input('nama', '');
        $jumlah  = (int) $request->input('jumlah', 0);
        // Gabungkan tanggal dari input dengan jam server saat ini
        // (input type="date" hanya mengirim YYYY-MM-DD, tanpa jam)
        $tglInput = $request->input('tgl');
        $tgl      = $tglInput
            ? $tglInput . ' ' . now()->format('H:i:s')
            : now()->toDateTimeString();
        $ket     = $request->input('ket', '');

        // ─── Validasi Input ─────────────────────────────────────
        // Whitelist tipe transaksi — mencegah nilai sembarang masuk ke query
        if (!in_array($type, ['masuk', 'keluar'], true)) {
            return response()->json(['error' => 'Tipe transaksi tidak valid'], 400);
        }
        if (!$item_id || $item_id < 1) {
            return response()->json(['error' => 'Item tidak valid'], 400);
        }
        if ($jumlah < 1) {
            return response()->json(['error' => 'Jumlah harus minimal 1'], 400);
        }
        if (strlen($ket) > 500) {
            return response()->json(['error' => 'Keterangan terlalu panjang (max 500 karakter)'], 400);
        }

        // Cek stok jika keluar
        if ($type === 'keluar') {
            $item = Item::find($item_id);
            if (!$item) {
                return response()->json(['error' => 'Barang tidak ditemukan'], 404);
            }
            if ($jumlah > $item->stok) {
                return response()->json(['error' => 'Stok tidak mencukupi'], 400);
            }
        }

        DB::transaction(function () use ($type, $item_id, $nama, $jumlah, $tgl, $ket, &$trans) {
            // Simpan transaksi
            $trans = Transaction::create([
                'type'         => $type,
                'item_id'      => $item_id,
                'nama'         => $nama,
                'jumlah'       => $jumlah,
                'tgl'          => $tgl,
                'ket'          => $ket,
                'dicatat_oleh' => session('nama', 'Unknown'),
            ]);

            // Update stok barang
            $op = $type === 'masuk' ? '+' : '-';
            DB::statement("UPDATE items SET stok = stok {$op} ? WHERE id = ?", [$jumlah, $item_id]);
        });

        return response()->json(['id' => $trans->id]);
    }

    /**
     * DELETE — hapus transaksi + rollback stok (Admin only)
     * Menggantikan: DELETE api/trans.php?id=X
     */
    public function destroy($id)
    {
        $t = Transaction::find($id);
        if (!$t) {
            return response()->json(['error' => 'Transaksi tidak ditemukan'], 404);
        }

        DB::transaction(function () use ($t) {
            // Rollback stok — kebalikan dari transaksi asal
            $op = $t->type === 'masuk' ? '-' : '+';
            DB::statement("UPDATE items SET stok = stok {$op} ? WHERE id = ?", [$t->jumlah, $t->item_id]);

            $t->delete();
        });

        return response()->json(['ok' => true]);
    }
}
