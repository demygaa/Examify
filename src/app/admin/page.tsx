import { redirect } from "next/navigation";
import GreatAdmin from "@/src/components/admin/dashboard/GreatAdmin";
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import SystemHealth from "@/src/components/admin/dashboard/SystemHealth";
import OverviewAccount, {
    type AccountOverviewItem,
} from "@/src/components/admin/dashboard/OverviewAccount";
import FastActionAdmin from "@/src/components/admin/dashboard/FastActionAdmin";
import { GraduationCap, School, ShieldCheck, Users } from "lucide-react";
import { prisma } from "@/src/lib/prisma";
import { getAdminUser } from "@/src/lib/session";
import { checkDatabase, getSystemSettings } from "@/src/lib/system";

export const dynamic = "force-dynamic";

type RoleKey = "SISWA" | "GURU" | "ADMIN";
type StatusKey = "ACTIVE" | "INACTIVE";

export default async function AdminDashboard() {
    const admin = await getAdminUser();

    if (!admin) {
        redirect("/");
    }

    let adminName = admin.username;
    let schoolName = "Examify";
    let maintenanceMode = false;
    let databaseConnected = false;

    let students = 0;
    let studentsActive = 0;
    let teachers = 0;
    let teachersActive = 0;
    let admins = 0;
    let adminsActive = 0;
    let totalClasses = 0;

    try {
        const [groups, classes, profile, school, settings, database] =
            await Promise.all([
                prisma.user.groupBy({
                    by: ["role", "status"],
                    _count: { _all: true },
                }),
                prisma.kelas.count(),
                prisma.karyawan.findUnique({
                    where: { userId: admin.userId },
                    select: { nama: true },
                }),
                prisma.school.findUnique({
                    where: { id: "main" },
                    select: { name: true },
                }),
                getSystemSettings(),
                checkDatabase(),
            ]);

        const countRole = (role: RoleKey, status?: StatusKey) =>
            groups
                .filter(
                    (group) =>
                        group.role === role &&
                        (!status || group.status === status)
                )
                .reduce((sum, group) => sum + group._count._all, 0);

        students = countRole("SISWA");
        studentsActive = countRole("SISWA", "ACTIVE");
        teachers = countRole("GURU");
        teachersActive = countRole("GURU", "ACTIVE");
        admins = countRole("ADMIN");
        adminsActive = countRole("ADMIN", "ACTIVE");
        totalClasses = classes;
        adminName = profile?.nama ?? admin.username;
        schoolName = school?.name ?? "Examify";
        maintenanceMode = settings.maintenanceMode;
        databaseConnected = database.connected;
    } catch (error) {
        console.error("AdminDashboard", error);
    }

    const totalAccounts = students + teachers + admins;

    const percentage = (value: number) =>
        totalAccounts > 0 ? Math.round((value / totalAccounts) * 100) : 0;

    const accountItems: AccountOverviewItem[] = [
        {
            title: "Siswa Aktif",
            active: studentsActive,
            inactive: students - studentsActive,
            percentage: percentage(students),
        },
        {
            title: "Guru Aktif",
            active: teachersActive,
            inactive: teachers - teachersActive,
            percentage: percentage(teachers),
        },
        {
            title: "Administrator",
            active: adminsActive,
            inactive: admins - adminsActive,
            percentage: percentage(admins),
        },
    ];

    return (
        <div className="w-full min-w-0">
            <GreatAdmin name={adminName} schoolName={schoolName} />

            <div className="flex flex-col lg:flex-row gap-[20px] mt-[20px] w-full">
                <div className="flex flex-col gap-[20px] w-full min-w-0 h-fit">
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-[12px] sm:gap-[20px] w-full">
                        <StatisticCarDashboardAdmin
                            title="SISWA"
                            icon={Users}
                            value={String(students)}
                        />
                        <StatisticCarDashboardAdmin
                            title="GURU"
                            icon={GraduationCap}
                            value={String(teachers)}
                        />
                        <StatisticCarDashboardAdmin
                            title="ADMIN"
                            icon={ShieldCheck}
                            value={String(admins)}
                        />
                        <StatisticCarDashboardAdmin
                            title="KELAS"
                            icon={School}
                            value={String(totalClasses)}
                        />
                    </div>

                    <div className="hidden sm:block h-full">
                        <OverviewAccount
                            total={totalAccounts}
                            items={accountItems}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[20px] w-full lg:w-[400px] lg:shrink-0">
                    <div>
                        <SystemHealth
                            serverOnline
                            databaseConnected={databaseConnected}
                            systemOperational={databaseConnected}
                            maintenanceMode={maintenanceMode}
                            activeUsers={
                                studentsActive + teachersActive + adminsActive
                            }
                        />
                    </div>
                    <div>
                        <FastActionAdmin />
                    </div>
                </div>
            </div>
        </div>
    );
}
