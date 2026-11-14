import { Database, RefreshCw, Power, Wrench } from "lucide-react";

export type MaintenanceAction =
    | "clear-temp"
    | "refresh-cache"
    | "restart";

type Props = {
    busy: MaintenanceAction | null;
    message?: string | null;
    messageType?: "success" | "error";
    onAction: (action: MaintenanceAction) => void;
};

export default function MaintenanceActions({
    busy,
    message,
    messageType = "success",
    onAction,
}: Props) {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-300 px-5 py-4">
                <Wrench size={20} className="text-blue-600" />

                <p className="text-black font-semibold text-[18px]">
                    Aksi Pemeliharaan
                </p>
            </div>

            {/* Content */}
            <div className="px-5 py-3 flex flex-col gap-2">
                {/* Clear Temporary Data */}
                <button
                    type="button"
                    onClick={() => onAction("clear-temp")}
                    disabled={busy !== null}
                    className="w-full flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 text-left text-[13px] text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                    <Database size={14} />

                    <span>
                        {busy === "clear-temp"
                            ? "Menghapus..."
                            : "Hapus Data Sementara"}
                    </span>
                </button>

                {/* Refresh Cache */}
                <button
                    type="button"
                    onClick={() => onAction("refresh-cache")}
                    disabled={busy !== null}
                    className="w-full flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 text-left text-[13px] text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                    <RefreshCw
                        size={14}
                        className={
                            busy === "refresh-cache" ? "animate-spin" : ""
                        }
                    />

                    <span>
                        {busy === "refresh-cache"
                            ? "Menyegarkan..."
                            : "Segarkan Cache Aplikasi"}
                    </span>
                </button>

                {/* Divider */}
                <div className="border-t border-slate-200 my-2" />

                {/* Restart Application */}
                <button
                    type="button"
                    onClick={() => onAction("restart")}
                    disabled={busy !== null}
                    className="w-full flex items-center gap-2 border border-red-200 bg-red-50 rounded-md px-3 py-2 text-left text-[13px] text-red-600 hover:bg-red-100 disabled:opacity-60"
                >
                    <Power size={14} />

                    <span>
                        {busy === "restart"
                            ? "Memuat Ulang..."
                            : "Restart Aplikasi"}
                    </span>
                </button>

                {message && (
                    <p
                        className={`text-center text-[12px] ${
                            messageType === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
