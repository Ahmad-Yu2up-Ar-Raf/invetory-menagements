<?php

namespace App\Models;

use App\Enums\MerchandiseStatusEnum;
use App\Enums\VisibilityEnums;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Products extends Model
{
     use HasFactory;

    protected $table = 'Products';


    protected $fillable = [   
        'name',
        'image',
        'user_id',
 'deskripsi' ,
 'status',
  'visibility',
 'quantity',
 'price',

     ];
 
 
    
     protected $casts = 
     [    

   'name' => 'string',
   'image' => 'string',
   'deskripsi' => 'string',
   'quantity' => 'integer',
   'price' => 'decimal:2',
      'visibility' => VisibilityEnums::class,
   'status' => MerchandiseStatusEnum::class,
     ]; 




     public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }
}
