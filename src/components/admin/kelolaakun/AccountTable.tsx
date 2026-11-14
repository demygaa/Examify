import { Eye } from "lucide-react";
import { useState } from "react";
import AccountDetailDrawer from "./AccountDetailDrawer";

export type Account = {
    id: string;
    nama: string;
    username: string;
    role: "Student" | "Teacher" | "Administrator";
    identifier: string;
    kelas: string;
    status: "Active" | "Inactive";
    login: string;
    createdAt: string;
};

type Props = {
    data: Account[];
    onChanged?: () => void;
};

export default function AccountTable({ data, onChanged }: Props) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

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
                                            @{account.username}
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

                            <td>{account.kelas}</td>

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
                                    type="button"
                                    aria-label={`Lihat detail ${account.nama}`}
                                    onClick={() => setSelectedId(account.id)}
                                    className="rounded-md p-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <Eye size={15} />
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

            <AccountDetailDrawer
                id={selectedId}
                onClose={() => setSelectedId(null)}
                onChanged={onChanged}
            />
        </div>
    );
}
