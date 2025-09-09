<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreAdmissionRequest;

class AdmissionController extends Controller
{   
    public function step4(StoreAdmissionRequest $request){
        DB::transaction(function () use ($request, &$admission) {
            $admission = Admission::create($request->validated());

            $admission->guardian()->create($request->guardian);
            $admission->academic()->create($request->academic);
            $admission->document()->create($request->document);
        });

        return response()->json([
            'success' => true,
            'message' => 'Admission submitted successfully',
            'admission_id' => $admission->id
        ], 201);
    }
}
