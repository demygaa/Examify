import LoginBranding from "@/src/components/auth/LoginBranding";
import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-slate-50">

            <div className="mx-auto flex min-h-screen max-w-8xl">

              
                <LoginBranding />

           
                <section className="flex w-2/5  items-center justify-center p-8 bg-white shadow-2xl">
                    <LoginForm />
                </section>

            </div>

        </main>
    );
}