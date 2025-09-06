<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicInfo extends Model
{
    protected $fillable = [
        'admission_id',
        'previous_school',
        'level_category',
        'grade_level',
        'academic_strands',
    ];

    public function admission() {
        return $this->belongsTo(Admission::class);
    }
}
