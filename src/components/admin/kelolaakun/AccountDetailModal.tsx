"use client";

import {
    X,
    User,
    ShieldCheck,
    CalendarDays,
    Clock3,
    GraduationCap,
    BookOpen,
} from "lucide-react";

type Account = {
    nama: string;
    username: string;
    email: string;
    role: "Siswa" | "Guru" | "Admin";
    status: "Aktif" | "Nonaktif";
    nis?: string;
    nip?: string;
    kelas?: string;
    mapel?: string;
    dibuat: string;
    terakhirLogin: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    account: Account | null;
};

export default function AccountDetailModal({
    isOpen,
    onClose,
    account,
}: Props) {
    if (!isOpen || !account) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            {/* MODAL */}
            <div className="w-full max-w-[520px] rounded-2xl bg-white shadow-xl">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-base font-semibold text-slate-800">
                            Detail Akun
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Informasi lengkap akun pengguna
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* PROFILE */}
                <div className="flex items-center gap-4 px-6 py-5">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User size={28} />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-800">
                            {account.nama}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            {account.email}
                        </p>

                        <div className="mt-2 flex items-center gap-2">

                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
                                {account.role}
                            </span>

                            <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                    account.status === "Aktif"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-500"
                                }`}
                            >
                                {account.status}
                            </span>

                        </div>
                    </div>
                </div>

                {/* DETAIL */}
                <div className="px-6 pb-5">

                    <div className="grid grid-cols-2 gap-3">

                        {/* USERNAME */}
                        <DetailItem
                            icon={<User size={15} />}
                            label="Username"
                            value={account.username}
                        />

                        {/* NIS / NIP */}
                        <DetailItem
                            icon={<ShieldCheck size={15} />}
                            label={account.role === "Guru" ? "NIP" : "NIS"}
                            value={
                                account.role === "Guru"
                                    ? account.nip || "-"
                                    : account.nis || "-"
                            }
                        />

                        {/* KELAS */}
                        {account.role === "Siswa" && (
                            <DetailItem
                                icon={<GraduationCap size={15} />}
                                label="Kelas"
                                value={account.kelas || "-"}
                            />
                        )}

                        {/* MAPEL */}
                        {account.role === "Guru" && (
                            <DetailItem
                                icon={<BookOpen size={15} />}
                                label="Mata Pelajaran"
                                value={account.mapel || "-"}
                            />
                        )}

                        {/* CREATED */}
                        <DetailItem
                            icon={<CalendarDays size={15} />}
                            label="Akun Dibuat"
                            value={account.dibuat}
                        />

                        {/* LOGIN */}
                        <DetailItem
                            icon={<Clock3 size={15} />}
                            label="Terakhir Login"
                            value={account.terakhirLogin}
                        />

                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Hapus
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Edit
                    </button>

                </div>
            </div>
        </div>
    );
}


/* =========================
   DETAIL ITEM
========================= */

function DetailItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 p-3">

            <div className="flex items-center gap-2 text-slate-400">
                {icon}

                <span className="text-[10px] font-medium">
                    {label}
                </span>
            </div>

            <p className="mt-2 text-xs font-semibold text-slate-700">
                {value}
            </p>

        </div>
    );
}