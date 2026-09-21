import { Info } from "lucide-react";

export default function ServerInformation() {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm text-blac w-fullk">

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-300">
                <Info
                    size={24}
                    className="text-blue-600"
                />

                <p className="font-semibold text-[18px]">
                    Informasi Server
                </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 p-5">

                {/* Status */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Status
                    </p>

                    <span className="bg-green-100 text-green-600 font-semibold text-[14px] px-3 py-1.5 rounded-md w-fit flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Online
                    </span>
                </div>

                {/* Aplikasi */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Aplikasi
                    </p>

                    <p className="font-medium">
                        Examify
                    </p>
                </div>

                {/* Lingkungan */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Lingkungan
                    </p>

                    <p className="font-medium">
                        Production
                    </p>
                </div>

                {/* Versi */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Versi
                    </p>

                    <p className="font-medium">
                        v1.0.0
                    </p>
                </div>

                {/* Waktu Aktif */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Waktu Aktif
                    </p>

                    <p className="font-medium">
                        12 hari, 4 jam
                    </p>
                </div>

                {/* Restart Terakhir */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Restart Terakhir
                    </p>

                    <p className="font-medium">
                        12 Oktober 2023, 03:00
                    </p>
                </div>

                {/* Pemeriksaan Kesehatan */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Pemeriksaan Terakhir
                    </p>

                    <p className="font-medium">
                        2 menit yang lalu
                    </p>
                </div>

            </div>
        </div>
    );
}