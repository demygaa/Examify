import { Cpu } from "lucide-react";
type ResourceUseProps = {
    cpu: string
    memory: string
    storage: string
}
export default function ResourceUse({
    cpu,
    memory,
    storage
}: ResourceUseProps) {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full h-full">
            <div className="flex items-center gap-2 border-b border-slate-300  px-5 py-4">
                <Cpu
                    size={25}
                    color="blue"
                />
                <p className="text-black font-semibold text-[18px]">Resource</p>
            </div>
            <div className="px-5 py-4 gap-[15px] flex flex-col">
                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">CPU</p>
                        <p className="font-semibold">{cpu}%</p>
                    </div>
                    <div className="bg-slate-300 h-2 w-full rounded-full">
                        <div
                            className="bg-blue-700 h-2 rounded-full"
                            style={{ width: `${cpu}%` }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">Memory</p>
                        <p className="font-semibold">18.5 GB / 32 GB {memory}%</p>
                    </div>
                    <div className="bg-slate-300 h-2 w-full rounded-full">
                        <div
                            className="bg-blue-700 h-2 rounded-full"
                            style={{ width: `${memory}%` }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">Storage</p>
                        <p className="font-semibold">410 GB / 1 TB {storage}%</p>
                    </div>
                    <div className="bg-slate-300 h-2 w-full rounded-full">
                        <div
                            className="bg-blue-700 h-2 rounded-full"
                            style={{ width: `${storage}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    
    );
}