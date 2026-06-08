<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'trans';

    public $timestamps = false;

    protected $fillable = [
        'type',
        'item_id',
        'nama',
        'jumlah',
        'tgl',
        'ket',
        'dicatat_oleh',
    ];

    protected $casts = [
        'jumlah' => 'integer',
        'tgl'    => 'datetime:Y-m-d H:i:s',  // format eksplisit agar tidak dikonversi ke UTC
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
