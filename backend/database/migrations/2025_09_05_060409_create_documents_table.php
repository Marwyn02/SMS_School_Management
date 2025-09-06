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
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('admission_id')->constrained('admissions')->onDelete('cascade');
            $table->text('birth_cert_url');
            $table->text('report_card_url');
            $table->text('good_moral_url');
            $table->text('parent_id_url');
            $table->boolean('is_birth_cert_readable')->default(false);
            $table->boolean('is_report_card_readable')->default(false);
            $table->boolean('is_good_moral_readable')->default(false);
            $table->boolean('is_parent_id_readable')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
