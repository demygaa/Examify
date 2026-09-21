import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import RecentActivity from "@/src/components/admin/system/ActivitySystem";
import DatabaseStatus from "@/src/components/admin/system/DatabaseStatus";
import SystemConfiguration from "@/src/components/admin/system/Maintenance";
import MaintenanceActions from "@/src/components/admin/system/MaintenanceActions";
import ResourceUse from "@/src/components/admin/system/ResourceUse";
import ServerInformation from "@/src/components/admin/system/ServerInformation";
import StatisticCardSistem from "@/src/components/admin/system/StatisticSistem";
import { AppWindow, Database, RefreshCcw, Server, Users } from "lucide-react";

export default function SystemPage() {
    const activities = [
    {
        id: 1,
        timestamp: "Hari ini, 10:45",
        eventType: "Pemeriksaan Kesehatan",
        description: "Pemeriksaan kesehatan sistem otomatis selesai.",
        status: "Success",
    },
    {
        id: 2,
        timestamp: "Hari ini, 09:12",
        eventType: "Pemeliharaan",
        description: "Cache aplikasi diperbarui secara manual.",
        status: "Success",
    },
    {
        id: 3,
        timestamp: "Kemarin, 23:30",
        eventType: "Cadangan",
        description: "Pencadangan database otomatis selesai.",
        status: "Success",
    },
];
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex flex-row justify-between">
                <HeaderAdmmin
                    title="Kelola Akun"
                    sec="Kelola akun siswa, guru dan admin"
                />
                <button className="flex flex-row gap-2 px-2 py-2 border border-slate-300 rounded-xl shadow-sm bg-white w-fit items-center justify-center">
                    <RefreshCcw
                        size={20}
                    />
                    <p>Refresh Data</p>
                </button>
            </div>
            <div className="flex flex-row gap-[20px]">
                <StatisticCardSistem
                    judul="Server Status"
                    icon={Server}
                    status="Online"
                />
                <StatisticCardSistem
                    judul="Databse"
                    icon={Database}
                    status="Conected"
                />
                <StatisticCardSistem
                    judul="Aplication"
                    icon={AppWindow}
                    status="Beroperasi"
                />
                <StatisticCarDashboardAdmin
                    title="STUDENT"
                    icon={Users}
                    value="1230"
                />
            </div>
            <div className="flex flex-row gap-[20px] w-full">
                <div className="w-full flex flex-col gap-[20px]">
                    <ServerInformation />
                    <div className="flex flex-row gap-[20px] w-full">
                        <ResourceUse 
                            cpu="50"
                            memory="58"
                            storage="45"
                        />
                        <DatabaseStatus />
                    </div>
                    <RecentActivity data={activities} />
                </div>
                <div className="flex flex-col gap-[20px] sticky top-[20px]">
                    <SystemConfiguration />
                    <MaintenanceActions />
                </div>
            </div>
        </div>
    );
}