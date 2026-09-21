import { Headset } from "lucide-react";
import Link from "next/link";
export default function CustemerServiceCard() {
    return (
        <div className="bg-white mt-[20px] p-[15px] w-[250px] flex flex-col gap-4 rounded-xl">
            <div className="flex flex-row items-center gap-2 text-black">
                <Headset
                    size={30}
                    color="blue"
                />
                <p className="font-semibold">Butuh Bantuan?</p>
            </div>
            <p className="min-w-0 text-black text-slate-600">
                Jika Anda mengalami kendala
                teknis sebelum memulai, silakan
                hubungi pengawas.
            </p>
            <Link href={"/helpdesk"} className="text-blue-700 font-semibold">Hubungi Helpdesk</Link>


        </div>
    );
}