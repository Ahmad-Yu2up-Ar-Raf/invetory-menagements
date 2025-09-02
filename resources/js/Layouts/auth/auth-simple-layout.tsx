
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Box, Package } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
      mode?: "signin" | "signup" 
    children : React.ReactNode
    loading?: boolean
}



export default function AuthSimpleLayout({ children, mode, loading , title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 ">
            <div className="flex bg-background flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
          <div  className="flex   cursor-none items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Package className="size-4" />
            </div>
            <span className="  ">Electrionering</span>
          </div>
        </div>
         <div className="flex flex-1 items-center justify-center ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[21rem] lg:max-w-[22rem] ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
            { mode == 'signup' ? 'Signup' : 'Welcome' }   
            </h1>
            <p className="text-sm text-muted-foreground">
                   { mode == 'signup' ? ' Enter your email below to create your account' : ' Enter your email below to signin your account' }   
            </p>
          </div>
         {children}
         {mode && ( 
          <div className="px-8 text-center text-sm text-muted-foreground">
          { mode !== 'signup' && "Don't" } have an account?
      <Link   
  aria-disabled={loading} 
  tabIndex={loading ? -1 : undefined}  href={ mode == 'signup' ? "/login" : "/register"} className={cn("   underline text-foreground underline-offset-4" , 
    loading ? 'pointer-events-none cursor-none text-foreground/50' : ''
  )}>
      { mode == 'signup' ? ' Login' : ' Signup' }
      </Link>
          </div>
         )         }

        </div>
      </div>
                
            </div>
                <div className="relative dark:border-l hidden bg-muted lg:block">
       <img
       
          src="https://images.unsplash.com/photo-1732472126838-8b8bff829d4b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Auth-Image"
     
          width={500}
          height={900}
          
          className="absolute inset-0 h-full w-full object-cover "
        />
       
        </div>
        </div>
    );
}