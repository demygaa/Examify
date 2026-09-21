import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AccountDetailModal from "./AccountDetailModal";

export type Account = {
    id: string;
    nama: string;
    email: string;
    role: "Student" | "Teacher" | "Administrator";
    identifier: string;
    className: string;
    status: "Active" | "Inactive";
    login: string;
};

type Props = {
    data: Account[];
};

export default function AccountTable({ data }: Props) {
    const account = {
        nama: "Ahmad Fauzan",
        username: "ahmad.fauzan",
        email: "ahmad@examify.sch.id",
        role: "Guru",
        status: "Aktif",
        nip: "1987654321",
        mapel: "Matematika",
        dibuat: "12 Januari 2026",
        terakhirLogin: "22 September 2026, 08:42",
    };

    const [showDetail, setShowDetail] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    return (
        <div className="overflow-x-auto px-[10px]">
            <table className="w-full">
                <thead>
                    <tr className="h-9 border-b border-slate-300 text-left text-[9px] uppercase text-slate-600">
                        <th>Account</th>
                        <th>Role</th>
                        <th>Identifier</th>
                        <th>Class</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((account) => (
                        <tr
                            key={account.id}
                            className="h-14 border-b border-slate-300 text-xs"
                        >
                            <td>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold">
                                        {account.nama
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {account.nama}
                                        </p>

                                        <p className="text-[9px] text-slate-500">
                                            {account.email}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <span
                                    className={
                                        account.role === "Student"
                                            ? "rounded bg-blue-100 px-2 py-1 text-[9px] text-blue-700"
                                            : account.role === "Teacher"
                                                ? "rounded bg-orange-100 px-2 py-1 text-[9px] text-orange-700"
                                                : "rounded bg-purple-100 px-2 py-1 text-[9px] text-purple-700"
                                    }
                                >
                                    {account.role}
                                </span>
                            </td>

                            <td>{account.identifier}</td>

                            <td>{account.className}</td>

                            <td>
                                <span
                                    className={
                                        account.status === "Active"
                                            ? "rounded bg-emerald-100 px-2 py-1 text-[9px] text-emerald-700"
                                            : "rounded bg-slate-200 px-2 py-1 text-[9px] text-slate-600"
                                    }
                                >
                                    ● {account.status}
                                </span>
                            </td>

                            <td>{account.login}</td>

                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedAccount(account);
                                        setShowDetail(true);
                                    }}
                                >
                                    <MoreHorizontal size={15} />
                                </button>
                            </td>
                        </tr>
                    ))}

                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={7}
                                className="py-10 text-center text-sm text-slate-500"
                            >
                                Tidak ada data akun
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <AccountDetailModal
                isOpen={showDetail}
                onClose={() => setShowDetail(false)}
                account={selectedAccount}
            />
        </div>
    );
}