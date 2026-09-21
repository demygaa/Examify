import LoginBranding from "@/src/components/auth/LoginBranding";
import AdminLoginForm from "@/src/components/auth/AdminLoginForm";

export default function AdminLoginPage() {
    return (
        <main className="min-h-screen bg-slate-50">

            <div className="mx-auto flex min-h-screen max-w-8xl">

                {/* Kiri */}
                <LoginBranding />

                {/* Kanan */}
                <section className="flex w-2/5  items-center justify-center p-8 bg-white shadow-2xl">
                    <AdminLoginForm />
                </section>

            </div>

        </main>
    );
}