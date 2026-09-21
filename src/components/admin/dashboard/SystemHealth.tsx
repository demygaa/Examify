import { Server, Database, Cpu, Circle, Users, User } from "lucide-react";
export default function SystemHealth() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-[18px] gap-[18px] flex flex-col">
            <p className="text-[20px] font-semibold">System health</p>
            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl">
                <div className="flex flex-row gap-2 items-center">
                    <Server
                        size={20}
                        className="text-slate-500"
                    />
                    <p className="font-semibold">Server</p>
                </div>
                <div className="flex flex-row gap-2 items-center p-2 bg-green-100 rounded-full">
                    <Circle
                        size={10}
                        strokeWidth={3}
                        className="text-emerald-500"
                    />
                    <p className="font-semibold text-[15px] text-green-700">ONLINE</p>
                </div>
            </div>
            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl">
                <div className="flex flex-row gap-2 items-center">
                    <Database
                        size={20}
                        className="text-slate-500"
                    />
                    <p className="font-semibold">Database</p>
                </div>
                <div className="flex flex-row gap-2 items-center p-2 bg-green-100 rounded-full">
                    <Circle
                        size={10}
                        strokeWidth={3}
                        className="text-emerald-500"
                    />
                    <p className="font-semibold text-[15px] text-green-700">CONECTED</p>
                </div>
            </div>
            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl">
                <div className="flex flex-row gap-2 items-center">
                    <Cpu
                        size={20}
                        className="text-slate-500"
                    />
                    <p className="font-semibold">System</p>
                </div>
                <div className="flex flex-row gap-2 items-center p-2 bg-green-100 rounded-full">
                    <Circle
                        size={10}
                        strokeWidth={3}
                        className="text-emerald-500"
                    />
                    <p className="font-semibold text-[15px] text-green-700">OPERATIONAL</p>
                </div>
            </div>
            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl items-center">
                <div className="flex flex-row gap-2 items-center">
                    <Users
                        size={40}
                        className="text-white bg-blue-700 p-2 rounded-full"
                    />
                    <p className="font-semibold">Active User</p>
                </div>
                <div>
                    <p className="font-semibold text-[20px] text-blue-700">24</p>
                </div>
            </div>
        </div>
    );
}