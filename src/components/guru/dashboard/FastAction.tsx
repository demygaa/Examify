import { PlusCircle, History, Archive, Eye} from "lucide-react";
import Link from "next/link";

export default function FastAction() {
    return (
        <div className="mt-3 sm:mt-[20px] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-3 sm:p-4 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-2">
                    <PlusCircle
                        size={24}
                        className="text-black p-1 rounded-xl"
                        style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-xs sm:text-sm font-semibold">Tambah Soal</p>
                </Link>
            </div>
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-3 sm:p-4 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-2">
                    <History
                        size={24}
                        className="text-black p-1 rounded-xl"
                        style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-xs sm:text-sm font-semibold">Riwayat ujian</p>
                </Link>
            </div>
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-3 sm:p-4 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-2">
                    <Archive
                        size={24}
                        className="text-black p-1 rounded-xl"
                        style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-xs sm:text-sm font-semibold">Bank Soal</p>
                </Link>
            </div>
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-3 sm:p-4 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-2">
                    <Eye
                        size={24}
                        className="text-black p-1 rounded-xl"
                        style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-xs sm:text-sm font-semibold">Monitoring</p>
                </Link>
            </div>


        </div>
    );
}