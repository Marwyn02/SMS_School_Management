<?php

namespace App\Http\Controllers;

use App\Models\AcademicInfo;
use App\Models\Admission;
use App\Models\DocumentInfo;
use App\Models\GuardianInfo;
use Illuminate\Http\Request;

class AdmissionController extends Controller
{   
    public function step1(Request $request){
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' =>'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'nationality' => 'required|string|max:255',
            'religion' => 'required|string|max:255',
            'email' => 'required|email|unique:admissions,email',
            'phone_number' => 'required|digits:11',
            'permanent_address' => 'required|string|max:500',
            'current_address' => 'required|string|max:500',
            'status' => 'nullable|string|in:draft,pending,approved,rejected',
        ]);

        $admission = Admission::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Admission submitted successfully',
            'admission_id' => $admission->id
        ], 201);
    }

    public function step2(Request $request) {
        $validated = $request->validate([
            'admission_id' => 'required|exists:admissions,id',
            'full_name' => 'required|string|max:255',
            'occupation' => 'required|string|max:255',
            'email_address' => 'required|email',
            'address' => 'required|string|max:500',
            'relationship' => 'required|string|max:255',
        ]);

        GuardianInfo::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Guardians Info submitted successfully',
        ], 201);
    }

    public function step3(Request $request) {
        $validated = $request->validate([
            'admission_id' => 'required|exists:admissions,id',
            'previous_school' => 'required|string|max:255',
            'level_category' => 'required|in:elementary,highschool,senior_high,college',
            'grade_level' => 'required|string|max:255',
            'academic_strands' => 'required|string|max:255',
        ]);

        AcademicInfo::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Academic Info submitted successfully',
        ], 201);
    }

    public function step4(Request $request) {
        $validated = $request->validate([
            'admission_id' => 'required|exists:admissions,id',
            'birth_cert_url' => 'requred|string|max:500',
            'report_card_url' => 'required|string|max:500',
            'good_moral_url' => 'requred|string|max:500',
            'parent_id_url' => 'required|string|max:500',
            'is_birth_cert_readable' => 'required|boolean',
            'is_report_card_readable' => 'required|boolean',
            'is_good_moral_readable' => 'required|boolean',
            'is_parent_id_readable' => 'required|boolean',
        ]);

        DocumentInfo::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Documents Info submitted successfully',
        ], 201);
    }
}
