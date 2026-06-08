<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'users';

    // Tabel lama tidak memiliki kolom updated_at
    const UPDATED_AT = null;

    protected $fillable = [
        'nama',
        'username',
        'password',
        'role',
        'email',
        'telepon',
        'foto',
        'status',
        'last_login',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'last_login' => 'datetime',
    ];
}
