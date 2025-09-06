<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name')->nullable();
            $table->date('dob');
            $table->enum('gender',['Male', 'Female', 'Other']);
            $table->string('nationality');
            $table->string('religion');
            $table->string('email')->unique();
            $table->string('phone_number');
            $table->text('permanent_address');
            $table->text('current_address');
            $table->enum('status',['draft', 'pending', 'approved','rejected'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
