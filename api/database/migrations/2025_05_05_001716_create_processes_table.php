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
        Schema::create('processes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('process_number', 20)->unique();
            $table->date('opening_date');
            $table->text('description');
            $table->string('customer', 100);
            $table->string('attorney', 100);
            $table->foreignId('state_id')->constrained('states', 'id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('processes');
    }
};
