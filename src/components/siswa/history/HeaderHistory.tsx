import Image from "next/image";
import { GraduationCapIcon } from "lucide-react";

export default function HeaderHistory() {
    return (
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-[30px] gap-4">
            {/* Bagian kiri */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Riwayat Ujian
                </h1>

                <p className="mt-1 text-sm sm:text-[15px] text-slate-500">
                    Lihat Hasil dan Detail Ujian yang belum anda kerjakan
                </p>
            </div>

            {/* Bagian kanan */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="text-left sm:text-right flex-1 sm:flex-none">
                    <p className="text-base sm:text-[18px] lg:text-[20px] font-semibold text-slate-900">
                        Dimas Prayoga
                    </p>

                    <p className="text-sm sm:text-[15px] text-slate-500">
                        XI RPL 1
                    </p>
                </div>

                <div className="flex items-center justify-center relative h-[50px] w-[50px] sm:h-[55px] sm:w-[55px] lg:h-[60px] lg:w-[60px] overflow-hidden rounded-full border border-slate-200 flex-shrink-0">
                   <GraduationCapIcon size={35}
                    color="blue"
                   />
                </div>
            </div>
        </header>
    );
}