import {
    BookOpen,
    CalendarDays,
    ListOrdered,
    Timer,
    Info,
    Check
} from "lucide-react";
export default function AlertForm() {
    return (
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl mt-4 w-full">
            <p className="text-blue-700 font-bold text-lg sm:text-[22px]">Ujian Matematika - Aljabar</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 text-black gap-4 sm:gap-6 mt-4">

                <div className="flex flex-row gap-3 sm:gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-2 sm:p-3 flex-shrink-0">
                        <BookOpen
                            size={24}
                            className="sm:w-[30px] sm:h-[30px] text-blue-700"
                        />
                    </div>
                    <div>
                        <p className="text-[11px] sm:text-[12px] text-slate-400 font-semibold">MATA PELAJARAN</p>
                        <h2 className="font-semibold mt-1 sm:mt-2 text-sm sm:text-base">Matematika</h2>
                    </div>

                </div>

                <div className="flex flex-row gap-3 sm:gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-2 sm:p-3 flex-shrink-0">
                        <CalendarDays
                            size={24}
                            className="sm:w-[30px] sm:h-[30px] text-blue-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[11px] sm:text-[12px] text-slate-400 font-semibold">JADWAL</p>
                        <h2 className="font-semibold mt-1 sm:mt-2 text-sm sm:text-base">09:00 WIB</h2>
                    </div>

                </div>

                <div className="flex flex-row gap-3 sm:gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-2 sm:p-3 flex-shrink-0">
                        <ListOrdered
                            size={24}
                            className="sm:w-[30px] sm:h-[30px] text-blue-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[11px] sm:text-[12px] text-slate-400 font-semibold">JUMLAH SOAL</p>
                        <h2 className="font-semibold mt-1 sm:mt-2 text-sm sm:text-base">40 Soal</h2>
                    </div>

                </div>

                <div className="flex flex-row gap-3 sm:gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-2 sm:p-3 flex-shrink-0">
                        <Timer
                            size={24}
                            className="sm:w-[30px] sm:h-[30px] text-blue-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[11px] sm:text-[12px] text-slate-400 font-semibold">DURASI</p>
                        <h2 className="font-semibold mt-1 sm:mt-2 text-sm sm:text-base">120 Menit</h2>
                    </div>

                </div>

            </div>
            <hr className="h-[2px] text-slate-300 mt-4 mb-4" />
            <div className="text-black flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full">
                <label htmlFor="token" className="text-sm sm:text-[15px] font-semibold sm:w-1/3">Masukan Token</label>
                <input type="text" name="token" className="w-full sm:w-2/3 border-2 rounded-xl border-slate-300 p-2 text-sm" />
            </div>
            <div className="mt-5 w-full">
                <div className="flex items-center gap-2">
                    <Info
                        size={18}
                        className="sm:w-5 sm:h-5 shrink-0 text-red-600"
                    />

                    <p className="text-base sm:text-[18px] font-bold text-black">
                        Aturan Ujian
                    </p>
                </div>

                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={18}
                        className="sm:w-5 sm:h-5 mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium text-sm sm:text-base">
                        Dilarang membuka tab atau jendela browser lain selama ujian sedang
                        berlangsung.
                    </p>
                </div>
                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={18}
                        className="sm:w-5 sm:h-5 mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium text-sm sm:text-base">
                        Pastikan koneksi internet stabil dan perangkat memiliki daya
                        baterai yang cukup.
                    </p>
                </div>
                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={18}
                        className="sm:w-5 sm:h-5 mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium text-sm sm:text-base">
                        Ujian akan otomatis terhenti jika waktu durasi yang ditentukan
                        telah habis.
                    </p>
                </div>
                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={18}
                        className="sm:w-5 sm:h-5 mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium text-sm sm:text-base">
                        Pelanggaran aturan dapat menyebabkan pembatalan nilai ujian
                        secara sepihak.
                    </p>
                </div>
            </div>
        </div>
    );
}