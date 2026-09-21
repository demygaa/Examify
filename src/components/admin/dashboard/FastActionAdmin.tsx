import Link from "next/link";
import { UserPlus, Building, FileEdit, GraduationCap, School } from "lucide-react";
export default function FastActionAdmin() {
    return (
        <div className="bg-white p-[18px] gap-[18px] border border-slate-300 shadow-sm rounded-xl">
            <p className="text-black font-semibold text-[20px]">Aksi Cepat</p>
            <div className="grid grid-cols-2 gap-[18px] mt-[18px]">
                <Link href={'/admin/create'} className="flex flex-col items-center border border-slate-300 shadow-sm py-2 rounded-xl gap-2">
                    <UserPlus 
                        size={30}
                        className="text-black"
                    />
                    <p className="font-semibold">Tambah Akun</p>
                </Link>
                <Link href={'/admin/create'} className="flex flex-col items-center border border-slate-300 shadow-sm py-2 rounded-xl gap-2">
                    <Building
                        size={30}
                        className="text-black"
                    />
                    <p className="font-semibold">Tambah Kelas</p>
                </Link>
                 <Link href={'/admin/create'} className="flex flex-col items-center border border-slate-300 shadow-sm py-2 rounded-xl gap-2">
                    <FileEdit
                        size={30}
                        className="text-black"
                    />
                    <p className="font-semibold">Tambah Mapel</p>
                </Link>
                 <Link href={'/admin/create'} className="flex flex-col items-center border border-slate-300 shadow-sm py-2 rounded-xl gap-2">
                    <School
                        size={30}
                        className="text-black"
                    />
                    <p className="font-semibold">Edit Profile</p>
                </Link>
            </div>

        </div>
    );
}