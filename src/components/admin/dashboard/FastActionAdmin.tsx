import Link from "next/link";
import { UserPlus, Building, FileEdit, School } from "lucide-react";

const ACTIONS = [
    {
        href: "/admin/kelolaakun",
        label: "Tambah Akun",
        icon: UserPlus,
    },
    {
        href: "/admin/masterdata",
        label: "Tambah Kelas",
        icon: Building,
    },
    {
        href: "/admin/masterdata",
        label: "Tambah Mapel",
        icon: FileEdit,
    },
    {
        href: "/admin/sekolah",
        label: "Edit Profile",
        icon: School,
    },
];

export default function FastActionAdmin() {
    return (
        <div className="bg-white p-[18px] gap-[18px] border border-slate-300 shadow-sm rounded-xl">
            <p className="text-black font-semibold text-[20px]">Aksi Cepat</p>
            <div className="grid grid-cols-2 gap-[18px] mt-[18px]">
                {ACTIONS.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={label}
                        href={href}
                        className="flex flex-col items-center border border-slate-300 shadow-sm py-2 rounded-xl gap-2 hover:bg-slate-50 transition"
                    >
                        <Icon size={30} className="text-black" />
                        <p className="font-semibold">{label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
