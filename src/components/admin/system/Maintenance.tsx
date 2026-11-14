"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import type { SystemSettingsData } from "@/src/components/admin/system/types";

type SavePayload = {
    systemName: string;
    maintenanceMode: boolean;
    sessionTimeout: number;
    timezone: string;
};

type Props = {
    settings: SystemSettingsData;
    saving: boolean;
    message?: string | null;
    messageType?: "success" | "error";
    onSave: (payload: SavePayload) => void;
};

export default function SystemConfiguration({
    settings,
    saving,
    message,
    messageType = "success",
    onSave,
}: Props) {
    const [systemName, setSystemName] = useState(settings.systemName);
    const [maintenance, setMaintenance] = useState(settings.maintenanceMode);
    const [sessionTimeout, setSessionTimeout] = useState(
        String(settings.sessionTimeout)
    );
    const [timezone, setTimezone] = useState(settings.timezone);

    function handleSubmit() {
        onSave({
            systemName: systemName.trim() || settings.systemName,
            maintenanceMode: maintenance,
            sessionTimeout: Number(sessionTimeout),
            timezone,
        });
    }

    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-300 px-5 py-4">
                <Settings size={22} className="text-blue-600" />

                <p className="text-black font-semibold text-[18px]">
                    Konfigurasi Sistem
                </p>
            </div>

            {/* Content */}
            <div className="px-5 py-4 flex flex-col gap-4">
                {/* System Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-black font-medium text-[13px]">
                        Nama Sistem
                    </label>

                    <input
                        type="text"
                        value={systemName}
                        onChange={(e) => setSystemName(e.target.value)}
                        className="border border-slate-300 rounded-md px-3 py-2 text-[13px] outline-none focus:border-blue-500"
                    />
                </div>

                {/* Maintenance Mode */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-black font-medium text-[13px]">
                            Mode Pemeliharaan
                        </p>

                        <p className="text-slate-600 text-[11px]">
                            Batasi akses hanya untuk admin
                        </p>
                    </div>

                    {/* Toggle */}
                    <button
                        type="button"
                        role="switch"
                        aria-checked={maintenance}
                        onClick={() => setMaintenance(!maintenance)}
                        className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                            maintenance ? "bg-blue-600" : "bg-slate-300"
                        }`}
                    >
                        <span
                            className={`block w-3 h-3 bg-white rounded-full transition-transform ${
                                maintenance ? "translate-x-3" : "translate-x-0"
                            }`}
                        />
                    </button>
                </div>

                {/* Session Timeout */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-black font-medium text-[13px]">
                        Batas Waktu Sesi (Menit)
                    </label>

                    <select
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        className="border border-slate-300 rounded-md px-3 py-2 text-[13px] outline-none focus:border-blue-500"
                    >
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="120">120</option>
                    </select>
                </div>

                {/* Timezone */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-black font-medium text-[13px]">
                        Zona Waktu Default
                    </label>

                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="border border-slate-300 rounded-md px-3 py-2 text-[13px] outline-none focus:border-blue-500"
                    >
                        <option value="WIB">
                            WIB (Waktu Indonesia Barat)
                        </option>

                        <option value="WITA">
                            WITA (Waktu Indonesia Tengah)
                        </option>

                        <option value="WIT">
                            WIT (Waktu Indonesia Timur)
                        </option>
                    </select>
                </div>

                {/* Save */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-blue-700 text-white font-medium text-[13px] py-2.5 rounded-md hover:bg-blue-800 disabled:opacity-60"
                >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
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
