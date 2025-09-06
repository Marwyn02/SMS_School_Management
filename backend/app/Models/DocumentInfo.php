<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentInfo extends Model
{
    protected $fillable = [
        'admission_id',
        'birth_cert_url',
        'report_card_url',
        'good_moral_url',
        'parent_id_url',
        'is_birth_cert_readable',
        'is_report_card_readable',
        'is_good_moral_readable',
        'is_parent_id_readable',
    ];

    public function admission() {
        return $this->belongsTo(Admission::class);
    }
}
