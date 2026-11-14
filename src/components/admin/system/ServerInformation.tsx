import { Info } from "lucide-react";
import {
    formatInTimezone,
    formatUptime,
} from "@/src/lib/format";
import type { ServerInfo } from "@/src/components/admin/system/types";

type Props = {
    info: ServerInfo;
    timezone: string;
};

export default function ServerInformation({ info, timezone }: Props) {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-300">
                <Info size={24} className="text-blue-600" />

                <p className="font-semibold text-[18px]">
                    Informasi Server
                </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 p-5">
                {/* Status */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Status</p>

                    <span className="bg-green-100 text-green-600 font-semibold text-[14px] px-3 py-1.5 rounded-md w-fit flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Online
                    </span>
                </div>

                {/* Aplikasi */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Aplikasi</p>
                    <p className="font-medium">Examify</p>
                </div>

                {/* Lingkungan */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Lingkungan</p>
                    <p className="font-medium">{info.environment}</p>
                </div>

                {/* Versi */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Versi</p>
                    <p className="font-medium">v{info.appVersion}</p>
                </div>

                {/* Hostname */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Hostname</p>
                    <p className="font-medium">{info.hostname}</p>
                </div>

                {/* Platform */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Platform</p>
                    <p className="font-medium">
                        {info.platform} ({info.arch})
                    </p>
                </div>

                {/* Node */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Node.js</p>
                    <p className="font-medium">{info.nodeVersion}</p>
                </div>

                {/* Waktu Aktif */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">Waktu Aktif</p>
                    <p className="font-medium">
                        {formatUptime(info.uptimeSeconds)}
                    </p>
                </div>

                {/* Restart Terakhir */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Restart Terakhir
                    </p>
                    <p className="font-medium">
                        {formatInTimezone(info.startTime, timezone)}
                    </p>
                </div>

                {/* Pemeriksaan Kesehatan */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-[14px]">
                        Pemeriksaan Terakhir
                    </p>
                    <p className="font-medium">
                        {formatInTimezone(info.healthCheckedAt, timezone)}
                    </p>
                </div>
            </div>
        </div>
    );
}
