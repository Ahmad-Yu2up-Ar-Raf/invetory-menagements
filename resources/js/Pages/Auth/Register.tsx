import { router,} from '@inertiajs/react';

import React from 'react';


import AuthLayout from '@/Layouts/auth';


import {  registerCreateSchema, RegisterSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import LoginForms from '@/components/ui/core/forms/auth/register-form';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    // const { data, setData, post, loading, errors, reset } = useForm<Required<LoginForm>>({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<RegisterSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       password_confirmation:  "",
       name: ""
      },
    resolver: zodResolver(registerCreateSchema),
  })


  function onSubmit(input: RegisterSchema ) {
    try {
        setLoading(true)
        startTransition(async () => { 
     router.post(route('register'),  input, { 
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
      <AuthLayout module="signup"  loading={loading} title="Create your account" description="Enter your email and password and name below to log in">
         
  <LoginForms  form={form} onSubmit={onSubmit} isPending={loading}/>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
     </>
)

}