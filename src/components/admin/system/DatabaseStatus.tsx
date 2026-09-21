import { Database, Cable } from "lucide-react";

export default function DatabaseStatus() {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full h-full">

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-300 px-5 py-4">
                <Database
                    size={25}
                    color="blue"
                />

                <p className="text-black font-semibold text-[18px]">
                    Status Database
                </p>
            </div>

            {/* Content */}
            <div className="px-5 py-4 flex flex-col">

                {/* Connection */}
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">
                        Koneksi
                    </p>

                    <p className="font-semibold text-green-500">
                        Terhubung
                    </p>
                </div>

                {/* Server Type */}
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">
                        Tipe Server
                    </p>

                    <p className="font-medium">
                        PostgreSQL 14.5
                    </p>
                </div>

                {/* Response Time */}
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">
                        Waktu Respons
                    </p>

                    <p className="font-medium">
                        12ms rata-rata
                    </p>
                </div>

                {/* Button */}
                <button className="mt-5 w-full border border-slate-300 bg-blue-50 text-blue-700 rounded-md py-3 flex items-center justify-center gap-2 font-medium hover:bg-blue-100">
                    <Cable size={17} />
                    Tes Koneksi
                </button>

            </div>
        </div>
    );
}