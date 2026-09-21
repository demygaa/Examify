import { PlusCircle, History, Archive, Eye} from "lucide-react";
import Link from "next/link";

export default function FastAction() {
    return (
        <div className="grid grid-cols-2 gap-3 mt-[20px]">
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-8 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-3">
                    <PlusCircle
                        size={40}
                       className="text-black p-2 rounded-xl"
                       style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-black font-semibold">Tambah Soal</p>
                </Link>
            </div>
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-8 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-3">
                    <History
                        size={40}
                       className="text-black p-2 rounded-xl"
                       style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-black font-semibold">Riwayat ujian</p>
                </Link>
            </div>
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-8 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-3">
                    <Archive
                        size={40}
                       className="text-black p-2 rounded-xl"
                       style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-black font-semibold">Bank Soal</p>
                </Link>
            </div>
            <div className="bg-white items-center justify-center border border-slate-300 rounded-xl p-8 shadow-sm">
                <Link href={'/guru/tambah'} className="relativ items-center flex flex-col gap-3">
                    <Eye
                        size={40}
                       className="text-black p-2 rounded-xl"
                       style={{ backgroundColor : "#F1F5F9"}}
                    />
                    <p className="text-black font-semibold">Monitoring</p>
                </Link>
            </div>
            



        </div>
    );
}