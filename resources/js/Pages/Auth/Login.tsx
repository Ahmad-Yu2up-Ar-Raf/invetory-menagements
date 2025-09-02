import { Head, router,} from '@inertiajs/react';

import React from 'react';


import AuthLayout from '@/Layouts/auth';


import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import LoginForms from '@/components/ui/core/forms/auth/login-form';


interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    // const { data, setData, post, loading, errors, reset } = useForm<Required<LoginForm>>({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<LoginSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       remember: false
      },
    resolver: zodResolver(loginSchema),
  })


  function onSubmit(input: LoginSchema ) {
    try {
                setLoading(true)
        startTransition(async () => { 
     router.post(route('login'),  input, { 
         preserveScroll: true,
         preserveState: true,
         forceFormData: true, // Penting untuk file upload
         onSuccess: () => {
           form.reset();
         
           toast.success("Login Succes");
           setLoading(false);
         },
         onError: (error) => {
           console.error("Submit error:", error);
           toast.error(`Error: ${Object.values(error).join(', ')}`);
           setLoading(false);
              form.reset();
         }
       });
        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }


return (
     <>
      <AuthLayout module="signin" loading={loading} title="Log in to your account" description="Enter your email and password below to log in">
         
  <LoginForms  form={form} onSubmit={onSubmit} isPending={loading}/>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
     </>
)

}