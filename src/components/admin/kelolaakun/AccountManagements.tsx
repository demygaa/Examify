"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import ImportAccountModal from "@/src/components/admin/kelolaakun/ImportAccountModal";

type AccountTab =
    | "all"
    | "student"
    | "teacher"
    | "administrator";

type Props = {
    users: Account[];
};

const PAGE_SIZE = 10;

export default function AccountManagement({
    users = [],
}: Props) {

    const [showForm, setShowForm] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] =
        useState<AccountTab>("all");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "Active" | "Inactive"
    >("all");
    const [classFilter, setClassFilter] = useState("all");

    const router = useRouter();

    const filteredAccounts = users.filter((account) => {
        const matchRole =
            activeTab === "all" ||
            (activeTab === "student" &&
                account.role === "Student") ||
            (activeTab === "teacher" &&
                account.role === "Teacher") ||
            (activeTab === "administrator" &&
                account.role === "Administrator");

        const matchStatus =
            statusFilter === "all" ||
            account.status === statusFilter;

        const matchClass =
            classFilter === "all" || account.kelas === classFilter;

        const keyword = search.toLowerCase();

        const matchSearch =
            account.nama.toLowerCase().includes(keyword) ||
            account.username.toLowerCase().includes(keyword) ||
            account.identifier.toLowerCase().includes(keyword) ||
            account.kelas.toLowerCase().includes(keyword);

        return matchRole && matchStatus && matchClass && matchSearch;
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredAccounts.length / PAGE_SIZE)
    );
    const safePage = Math.min(page, totalPages);
    const pageData = filteredAccounts.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
    );

    const classOptions = Array.from(
        new Set(
            users
                .map((user) => user.kelas)
                .filter((kelas) => kelas && kelas !== "-")
        )
    ).sort((a, b) => a.localeCompare(b));

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
                        onClick={() => {
                            setShowImport(true);
                        }}
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
                            hover:bg-slate-50
                            transition
                        "
                    >
                        <FileUp size={20} />
                        Import Akun
                    </button>

                    <button
                        onClick={() => {
                            setShowForm(true);
                        }}
                        className="bg-blue-700 flex text-white font-semibold text-center text-[15px] items-center justify-center rounded-xl px-2 py-1 hover:bg-blue-800 transition"
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
                    status={statusFilter}
                    onStatusChange={(value) => {
                        setStatusFilter(value);
                        setPage(1);
                    }}
                    classValue={classFilter}
                    onClassChange={(value) => {
                        setClassFilter(value);
                        setPage(1);
                    }}
                    classOptions={classOptions}
                />

                <AccountTable
                    data={pageData}
                    onChanged={() => router.refresh()}
                />

                <ClassPagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    totalItems={filteredAccounts.length}
                    pageSize={PAGE_SIZE}
                />

            </div>



            {showForm && (
                <AccountForm
                    onClose={() => {
                        setShowForm(false);
                    }}
                    onSuccess={() => router.refresh()}
                />
            )}

            {showImport && (
                <ImportAccountModal
                    onClose={() => {
                        setShowImport(false);
                    }}
                    onSuccess={() => router.refresh()}
                />
            )}

        </div>
    );
}