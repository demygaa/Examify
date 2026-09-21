import Sidebar from "./Sidebar";
import "@/src/app/globals.css";

type Role = "Siswa" | "Guru" | "Admin";

export default function MainLayout({
    children,
    role,
}: {
    children: React.ReactNode;
    role: Role;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role={role} />

            <main className="min-w-0 ml-[290px] p-8 flex-1  bg-[#F0F1FD]">
                {children}
            </main>
        </div>
    );
} 