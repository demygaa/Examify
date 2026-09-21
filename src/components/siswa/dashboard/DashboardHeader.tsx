import Image from "next/image";
import { GraduationCapIcon } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="flex items-center justify-between mb-[30px]">
            {/* Bagian kiri */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard Siswa
                </h1>

                <p className="mt-1 text-[15px] text-slate-500">
                    Selamat datang kembali, Dimas Prayoga!
                </p>
            </div>

            {/* Bagian kanan */}
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-[20px] font-semibold text-slate-900">
                        Dimas Prayoga
                    </p>

                    <p className="text-[15px] text-slate-500">
                        XI RPL 1
                    </p>
                </div>

                <div className="flex items-center justify-center relative h-[60px] w-[60px] overflow-hidden rounded-full border border-slate-200">
                   <GraduationCapIcon size={40}
                    color="blue"
                   />
                </div>
            </div>
        </header>
    );
}