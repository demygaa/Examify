import { Headset } from "lucide-react";
import Link from "next/link";
export default function CustemerServiceCard() {
    return (
        <div className="bg-white mt-3 p-3 sm:p-[15px] w-full flex flex-col gap-3 sm:gap-4 rounded-xl">
            <div className="flex flex-row items-center gap-2 text-black">
                <Headset
                    size={24}
                    color="blue"
                    className="sm:w-[30px] sm:h-[30px]"
                />
                <p className="font-semibold text-sm sm:text-base">Butuh Bantuan?</p>
            </div>
            <p className="min-w-0 text-black text-slate-600 text-xs sm:text-sm">
                Jika Anda mengalami kendala
                teknis sebelum memulai, silakan
                hubungi pengawas.
            </p>
            <Link href={"/helpdesk"} className="text-blue-700 font-semibold text-sm sm:text-base">Hubungi Helpdesk</Link>


        </div>
    );
}