"use client";

import { useState } from "react";
import {
    Feather,
    FileUp,
    GraduationCap,
    ShieldCheck,
    Users,
} from "lucide-react";

import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import AccountTabs from "@/src/components/admin/kelolaakun/AccountTabs";
import AccountTableHeader from "@/src/components/admin/kelolaakun/AccountTableHeader";
import AccountTable, {
    Account,
} from "@/src/components/admin/kelolaakun/AccountTable";
import ClassPagination from "@/src/components/admin/masterdata/PageNationClass";
import AccountForm from "@/src/components/admin/kelolaakun/AccountForm";

type AccountTab =
    | "all"
    | "student"
    | "teacher"
    | "administrator";

type Props = {
    users: Account[];
};

export default function AccountManagement({
    users = [],
}: Props) {
    
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] =
        useState<AccountTab>("all");
    const [search, setSearch] = useState("");

    const filteredAccounts = users.filter((account) => {
        const matchRole =
            activeTab === "all" ||
            (activeTab === "student" &&
                account.role === "Student") ||
            (activeTab === "teacher" &&
                account.role === "Teacher") ||
            (activeTab === "administrator" &&
                account.role === "Administrator");

        const keyword = search.toLowerCase();

        const matchSearch =
            account.nama.toLowerCase().includes(keyword) ||
            account.email.toLowerCase().includes(keyword) ||
            account.identifier.toLowerCase().includes(keyword);

        return matchRole && matchSearch;
    });

    return (
        <div className="flex flex-col gap-[20px]">

            {/* HEADER */}
            <div className="flex flex-row justify-between">
                <HeaderAdmmin
                    title="Kelola Akun"
                    sec="Kelola akun siswa, guru dan admin"
                />

                <div className="grid grid-cols-2 gap-[20px]">

                    <button
                        className="
                            bg-white
                            text-black
                            gap-2
                            flex
                            flex-row
                            p-2
                            items-center
                            justify-center
                            text-[15px]
                            font-semibold
                            rounded-xl
                            shadow-sm
                        "
                    >
                        <FileUp size={20} />
                        Import Akun
                    </button>

                    <button
                        onClick={() => setShowForm(true)}
                        className="
                            bg-blue-700
                            text-white
                            gap-2
                            flex
                            flex-row
                            px-4
                            py-2
                            items-center
                            justify-center
                            text-[15px]
                            font-semibold
                            rounded-xl
                            shadow-sm
                        "
                    >
                        Tambah Akun
                    </button>

                </div>
            </div>


            {/* STATISTIC */}
            <div className="flex flex-row gap-[20px] w-full">

                <StatisticCarDashboardAdmin
                    title="TOTAL USER"
                    icon={Users}
                    value={String(users.length)}
                />

                <StatisticCarDashboardAdmin
                    title="SISWA"
                    icon={GraduationCap}
                    value={String(
                        users.filter(
                            (user) =>
                                user.role === "Student"
                        ).length
                    )}
                />

                <StatisticCarDashboardAdmin
                    title="GURU"
                    icon={Feather}
                    value={String(
                        users.filter(
                            (user) =>
                                user.role === "Teacher"
                        ).length
                    )}
                />

                <StatisticCarDashboardAdmin
                    title="ADMIN"
                    icon={ShieldCheck}
                    value={String(
                        users.filter(
                            (user) =>
                                user.role ===
                                "Administrator"
                        ).length
                    )}
                />

            </div>


            {/* ACCOUNT TABLE */}
            <div className="
                overflow-hidden
                rounded-xl
                border
                border-slate-300
                bg-white
                shadow-sm
            ">

                <AccountTabs
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                        setActiveTab(tab);
                        setPage(1);
                    }}
                />

                <AccountTableHeader
                    search={search}
                    onSearchChange={(value) => {
                        setSearch(value);
                        setPage(1);
                    }}
                />

                <AccountTable
                    data={filteredAccounts}
                />

                <ClassPagination
                    currentPage={page}
                    totalPages={4}
                    onPageChange={setPage}
                />

            </div>


            {/* ADD ACCOUNT MODAL */}
            {showForm && (
                <AccountForm
                    onClose={() => setShowForm(false)}
                />
            )}

        </div>
    );
}