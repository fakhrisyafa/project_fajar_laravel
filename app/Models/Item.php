<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';

    public $timestamps = false;

    protected $fillable = [
        'kode',
        'nama',
        'kat',
        'stok',
        'satuan',
        'lokasi',
        'kondisi',
        'ket',
        'stok_min',
        'foto',
    ];

    protected $casts = [
        'stok'     => 'integer',
        'stok_min' => 'integer',
    ];
}
