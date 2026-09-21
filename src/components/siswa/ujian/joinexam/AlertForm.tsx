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
        <div className="bg-white p-8 rounded-xl mt-[20px] ">
            <p className="text-blue-700 font-bold text-[22px]">Ujian Matematika - Aljabar</p>
            <div className="grid grid-cols-2 text-black gap-6 mt-[15px]">

                <div className="flex flex-row gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-3">
                        <BookOpen
                            size={30}
                            className="text-blue-700"
                        />
                    </div>
                    <div>
                        <p className="text-[12px] text-slate-400 font-semibold">MATA PELAJARAN</p>
                        <h2 className="font-semibold mt-2">Matematika</h2>
                    </div>

                </div>

                <div className="flex flex-row gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-3">
                        <CalendarDays
                            size={30}
                            className="text-blue-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] text-slate-400 font-semibold">JADWAL</p>
                        <h2 className="font-semibold mt-2">09:00 WIB</h2>
                    </div>

                </div>

                <div className="flex flex-row gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-3">
                        <ListOrdered
                            size={30}
                            className="text-blue-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] text-slate-400 font-semibold">JUMLAH SOAL</p>
                        <h2 className="font-semibold mt-2">40 Soal</h2>
                    </div>

                </div>

                <div className="flex flex-row gap-5">
                    <div className="rounded-xl h-fit bg-[#EDEDF9] p-3">
                        <Timer
                            size={30}
                            className="text-blue-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] text-slate-400 font-semibold">DURASI</p>
                        <h2 className="font-semibold mt-2">120 Menit</h2>
                    </div>

                </div>

            </div>
            <hr className="h-[3px] text-slate-300 mt-[10px] mb-[10px]" />
            <div className="text-black flex flex-row gap-2 items-center w-[550px]">
                <label htmlFor="token" className="text-[15px] font-semibold w-1/3">Masukan Token</label>
                <input type="text" name="token" className="w-2/3 border-2 rounded-xl border-slate-300 p-2" />
            </div>
            <div className="mt-5 w-[500px]">
                <div className="flex items-center gap-2">
                    <Info
                        size={20}
                        className="shrink-0 text-red-600"
                    />

                    <p className="text-[18px] font-bold text-black">
                        Aturan Ujian
                    </p>
                </div>

                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={20}
                        className="mt-1 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium">
                        Dilarang membuka tab atau jendela browser lain selama ujian sedang
                        berlangsung.
                    </p>
                </div>
                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={20}
                        className="mt-1 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium">
                        Pastikan koneksi internet stabil dan perangkat memiliki daya
                        baterai yang cukup.
                    </p>
                </div>
                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={20}
                        className="mt-1 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium">
                        Ujian akan otomatis terhenti jika waktu durasi yang ditentukan
                        telah habis.
                    </p>
                </div>
                <div className="mt-3 flex min-w-0 items-start gap-2">
                    <Check
                        size={20}
                        className="mt-1 shrink-0 text-blue-600"
                    />

                    <p className="min-w-0 break-words text-slate-600 font-medium">
                        Pelanggaran aturan dapat menyebabkan pembatalan nilai ujian
                        secara sepihak.
                    </p>
                </div>
            </div>
        </div>
    );
}