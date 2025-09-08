<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdmissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }
    

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            // Step 1: Personal Info
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'nationality' => 'required|string|max:255',
            'religion' => 'required|string|max:255',
            'email' => 'required|email|unique:admissions,email',
            'phone_number' => 'required|digits:11',
            'permanent_address' => 'required|string|max:500',
            'current_address' => 'required|string|max:500',
            'status' => 'nullable|string|in:draft,pending,approved,rejected',

            // Step 2: Guardian Info
            'guardian.full_name' => 'required|string|max:255',
            'guardian.occupation' => 'required|string|max:255',
            'guardian.email' => 'required|email',
            'guardian.address' => 'required|string|max:500',
            'guardian.relationship' => 'required|string|max:255',

            // Step 3: Academic Info
            'academic.previous_school' => 'required|string|max:255',
            'academic.level_category' => 'required|in:elementary,highschool,senior_high,college',
            'academic.grade_level' => 'required|string|max:255',
            'academic.academic_strands' => 'nullable|string|max:255',

            // Step 4: Document Info
            'documents.birth_cert_url' => 'required|string|max:500',
            'documents.report_card_url' => 'required|string|max:500',
            'documents.good_moral_url' => 'required|string|max:500',
            'documents.parent_id_url' => 'required|string|max:500',
            'documents.is_birth_cert_readable' => 'required|boolean',
            'documents.is_report_card_readable' => 'required|boolean',
            'documents.is_good_moral_readable' => 'required|boolean',
            'documents.is_parent_id_readable' => 'required|boolean'
        ];
    }
}
