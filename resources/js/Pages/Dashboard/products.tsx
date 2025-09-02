import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Filters, PaginatedData, type SharedData } from '@/types';
import { ProductsSchema } from '@/lib/validations/validations';
import { ProductsDataTable } from '@/components/ui/core/merch/table/ProductsDataTable';

type PageProps = {
    pagination: PaginatedData;

    Products: ProductsSchema[]
    filters: Filters,
      flash?: {
        success?: string;
        error?: string;
      };
}



export default function Dashboard({ ...props }: PageProps) {
    console.log(props.flash?.success

    );
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Products
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <ProductsDataTable Products={props.Products} PaginatedData={props.pagination} filters={props.filters}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
