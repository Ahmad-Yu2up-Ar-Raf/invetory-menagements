<?php

use App\Enums\MerchandiseStatusEnum;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
              $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 15, 2)->nullable();
            $table->integer('quantity')->default(1);
            $table->string('name', 255)->unique()->nullable();
            $table->text('deskripsi' )->nullable();
            $table->string('image')->nullable();
            $table->string('status')->default(MerchandiseStatusEnum::Available->value);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
