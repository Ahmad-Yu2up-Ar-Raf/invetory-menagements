import AuthLayoutTemplate from './auth-simple-layout';

export default function AuthLayout({ children, module, loading, title, description, ...props }: { children: React.ReactNode; module?: "signup" | "signin"; loading:boolean, title: string; description: string }) {
    return (
        <AuthLayoutTemplate loading={loading} mode={module} title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}