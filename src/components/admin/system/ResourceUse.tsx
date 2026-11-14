import { Cpu } from "lucide-react";
import { formatBytes } from "@/src/lib/format";
import type { ResourceInfo } from "@/src/components/admin/system/types";

type ResourceUseProps = {
    resources: ResourceInfo;
};

export default function ResourceUse({ resources }: ResourceUseProps) {
    const { cpuPercent, memory, storage } = resources;

    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full h-full">
            <div className="flex items-center gap-2 border-b border-slate-300 px-5 py-4">
                <Cpu size={25} color="blue" />
                <p className="text-black font-semibold text-[18px]">
                    Resource
                </p>
            </div>

            <div className="px-5 py-4 gap-[15px] flex flex-col">
                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">CPU</p>
                        <p className="font-semibold">{cpuPercent}%</p>
                    </div>
                    <div className="bg-slate-300 h-2 w-full rounded-full">
                        <div
                            className="bg-blue-700 h-2 rounded-full"
                            style={{ width: `${cpuPercent}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">Memory</p>
                        <p className="font-semibold">
                            {formatBytes(memory.used)} /{" "}
                            {formatBytes(memory.total)} ({memory.percent}%)
                        </p>
                    </div>
                    <div className="bg-slate-300 h-2 w-full rounded-full">
                        <div
                            className="bg-blue-700 h-2 rounded-full"
                            style={{ width: `${memory.percent}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">Storage</p>
                        <p className="font-semibold">
                            {formatBytes(storage.used)} /{" "}
                            {formatBytes(storage.total)} ({storage.percent}%)
                        </p>
                    </div>
                    <div className="bg-slate-300 h-2 w-full rounded-full">
                        <div
                            className="bg-blue-700 h-2 rounded-full"
                            style={{ width: `${storage.percent}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
