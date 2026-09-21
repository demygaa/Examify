import GreatAdmin from "@/src/components/admin/dashboard/GreatAdmin";
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import SystemHealth from "@/src/components/admin/dashboard/SystemHealth";
import OverviewAccount from "@/src/components/admin/dashboard/OverviewAccount";
import { Users } from "lucide-react";
import FastAction from "@/src/components/guru/dashboard/FastAction";
import FastActionAdmin from "@/src/components/admin/dashboard/FastActionAdmin";

export default function AdminDashboard() {
    return (
        <div>
            <GreatAdmin />
            <div className="flex flex-row gap-[20px] mt-[20px] w-full">
                <div className="flex flex-col gap-[20px] w-full h-fit">
                    <div className="flex flex-row gap-[20px] flex-1 w-full">
                        <StatisticCarDashboardAdmin 
                            title="STUDENT"
                            icon={Users}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin 
                            title="STUDENT"
                            icon={Users}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin 
                            title="STUDENT"
                            icon={Users}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin 
                            title="STUDENT"
                            icon={Users}
                            value="1230"
                        />
                    </div>
                    <div className="h-full">
                        <OverviewAccount />
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] w-[400px]">
                    <div>
                        <SystemHealth />
                    </div>
                    <div>
                        <FastActionAdmin />
                    </div>
                </div>
                
            </div>
        </div>
    );
}