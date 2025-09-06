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

    public function academicInfo() {
        return $this->hasOne(AcademicInfo::class);
    }

    public function documentInfo() {
        return $this->hasOne(DocumentInfo::class);
    }

    public function guardianInfo(){
        return $this->hasOne(GuardianInfo::class);
    }
}
