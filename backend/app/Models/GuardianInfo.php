<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuardianInfo extends Model
{
    protected $fillable = [
        'admission_id',
        'full_name',
        'occupation',
        'phone_number',
        'email_address',
        'address',
        'relationship',
    ];

    public function admission() {
        return $this->belongsTo(Admission::class);
    }
}
