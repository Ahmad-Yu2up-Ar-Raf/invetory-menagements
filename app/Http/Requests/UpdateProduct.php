<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProduct extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
         return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $productsId = $this->route('product')->id;

        return [
            'name' => 'required|unique:products,name,' . $productsId .'|max:255|string',
           'image' => 'required|image|mimes:jpg,png,jpeg|max:2048|dimensions:min_width=100,min_height=100',
           'price' => 'required|numeric|min:0|max:9999999999999.99',
            'deskripsi' => 'nullable|string',
            'status' => 'nullable|string',
            'visibility' => 'nullable|string',
            'quantity' => 'nullable|integer|min:1',
            
      
        ];
    }
}
