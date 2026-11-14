import { Database, Cable } from "lucide-react";
import type { DatabaseInfo } from "@/src/components/admin/system/types";

type Props = {
    database: DatabaseInfo;
    onTest: () => void;
    testing: boolean;
    message?: string | null;
};

export default function DatabaseStatus({
    database,
    onTest,
    testing,
    message,
}: Props) {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full h-full">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-300 px-5 py-4">
                <Database size={25} color="blue" />
                <p className="text-black font-semibold text-[18px]">
                    Status Database
                </p>
            </div>

            {/* Content */}
            <div className="px-5 py-4 flex flex-col">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">Koneksi</p>
                    <p
                        className={`font-semibold ${
                            database.connected
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {database.connected ? "Terhubung" : "Terputus"}
                    </p>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">Tipe Server</p>
                    <p className="font-medium">{database.type}</p>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">Versi</p>
                    <p className="font-medium">{database.version}</p>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <p className="font-semibold text-[14px]">Waktu Respons</p>
                    <p className="font-medium">
                        {database.responseMs}ms
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onTest}
                    disabled={testing}
                    className="mt-5 w-full border border-slate-300 bg-blue-50 text-blue-700 rounded-md py-3 flex items-center justify-center gap-2 font-medium hover:bg-blue-100 disabled:opacity-60"
                >
                    <Cable size={17} />
                    {testing ? "Menguji..." : "Tes Koneksi"}
                </button>

                {message && (
                    <p className="mt-3 text-center text-[12px] text-slate-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
