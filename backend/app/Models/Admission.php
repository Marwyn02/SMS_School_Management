<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admission extends Model
{
    protected $fillable = [
        "first_name",
        "middle_name",
        "last_name",
        "dob",
        "gender",
        "nationality",
        "religion",
        "email",
        "phone_number",
        "permanent_address",
        "current_address",
        "status",
    ];

    public function academic() {
        return $this->hasOne(AcademicInfo::class);
    }

    public function document() {
        return $this->hasOne(DocumentInfo::class);
    }

    public function guardian(){
        return $this->hasOne(GuardianInfo::class);
    }
}
