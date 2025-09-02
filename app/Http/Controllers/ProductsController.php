<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProducts;
use App\Http\Requests\UpdateProduct;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');
           $page = $request->input('page', 1);

        $status = $request->input('status');
        $query = Products::where('user_id', Auth::id());

     if ($search) {
            $query->where(function($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw('LOWER(name) LIKE ?', ["%{$searchLower}%"])
                  ->orWhereRaw('LOWER(deskripsi) LIKE ?', ["%{$searchLower}%"]);
            });
        }

        // FIX: Multiple status filter
        if ($status) {
            if (is_array($status)) {
                $query->whereIn('status', $status);
            } else if (is_string($status)) {
                $statusArray = explode(',', $status);
                $query->whereIn('status', $statusArray);
            }
        }


       $products = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
    $products->through(function($item) {
            return [
                ...$item->toArray(),
                'image' => $item->image ? url($item->image) : null
            ];
        });

        return Inertia::render('Dashboard/products', [
            'Products' => $products->items() ?? [],
         'filters' => [
                'search' => $search ?? '',
           
                'status' => $status ?? [],
            ],
            'pagination' => [
                'data' => $products->toArray(),
                'total' => $products->total(),
                'currentPage' => $products->currentPage(),
                'perPage' => $products->perPage(),
                'lastPage' => $products->lastPage(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProducts $request)
    {
        try {

            
                    $imagePath = null;
    if (request()->hasFile('image')) {
            $file = request()->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads/', $filename, 'public');
            $imagePath = 'storage/' . $path;
        }
            // Observer akan handle file upload seproductsa otomatis
            $products = Products::create([
                ...$request->validated(),
                'user_id' => Auth::id(),
                    'image' => $imagePath,
            ]);

            $fileCount = count($products->files ?? []);
            $message = $fileCount > 0 
                ? "Products berhasil ditambahkan dengan {$fileCount} file."
                : "Products berhasil ditambahkan.";

            return redirect()->route('dashboard.products.index')
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Products creation error: ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduct $request, Products $product)
    {
        try {
           
                $updateData = [
             'name' => $request['name'],

            'deskripsi' => $request['deskripsi'],
            'price' => $request['price'],
            'status' => $request['status'],
            'visibility' => $request['visibility'],
            'quantity' => $request['quantity'],
        
        
           
        ];

 if (request()->hasFile('image')) {
            Log::info('New image file detected');
            
            // Hapus gambar lama jika ada
            if ( $product->image && Storage::disk('public')->exists(str_replace('storage/', '',  $product->image))) {
                Storage::disk('public')->delete(str_replace('storage/', '',  $product->image));
                Log::info('Old image deleted: ' .  $product->image);
            }
            
            // Upload gambar baru
            $file = request()->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $updateData['image'] = 'storage/' . $path;
            
            Log::info('New image uploaded: ' . $updateData['image']);
        } else {
            Log::info('No new image file, keeping existing image');
           
        }






            $product->update($updateData);

            $fileCount = count($product->files ?? []);
            $message = request()->hasFile('files') || request()->has('files')
                ? "Products berhasil diupdate dengan {$fileCount} file."
                : "Products berhasil diupdate.";

            return redirect()->route('dashboard.products.index')
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Products update error: ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat mengupdate data: ' . $e->getMessage()
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ids = $request->input('ids');
        if (empty($ids)) {
            return redirect()->route('dashboard.products.index')
                ->with('error', 'Tidak ada mobil yang dipilih untuk dihapus.');
        }

        // Validasi apakah semua ID milik user yang sedang login
        $products = Products::whereIn('id', $ids)->where('user_id', Auth::id())->get();
        if ($products->count() !== count($ids)) {
            return redirect()->route('dashboard.products.index')
                ->with('error', 'Unauthorized access atau mobil tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
            
            // SOLUSI: Delete satu per satu agar Observer terpicu
            foreach ($products as $merch) {
                $merch->delete(); // Ini akan trigger observer products
            }
            
            DB::commit();

            $deletedCount = $products->count();
            return redirect()->route('dashboard.products.index')
                ->with('success', "{$deletedCount} Products berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Products deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.products.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }


  public function statusUpdate(Request $request)
    {
        
        $ids = $request->input('ids');
        $value = $request->input('value');
        $colum = $request->input('colum');

        if (empty($ids)) {
            return redirect()->route('dashboard.products.index')
                ->with('error', 'Tidak ada event yang dipilih untuk dihapus.');
        }

        // Validasi apakah semua ID milik user yang sedang login
        $products = Products::whereIn('id', $ids)->where('user_id', Auth::id())->get();
        if ($products->count() !== count($ids)) {
            return redirect()->route('dashboard.products.index')
                ->with('error', 'Unauthorized access atau event tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
              
             foreach ($products as $event) {
                $event->update([$colum => $value]);
            }

   

            
            
            DB::commit();
            

            $deletedCount = $products->count();
            return redirect()->route('dashboard.products.index')
                ->with('success', "{$deletedCount} Products berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Products deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.products.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }

}
