import { Sigma } from "lucide-react";
import Link from "next/link";

export default function TabelNotDone() {
    return (
        <div className="overflow-hidden text-black  border border-slate-300  rounded-xl bg-white">
            <table className="w-full">
                <thead>
                    <tr className="text-[20px] font-semibold text-slate-500 bg-[#EDEDF9] text-left">
                        <td className="h-[59px] w-[430px] px-[27px] py-[18px]">JUDUL</td>
                        <td className="h-[59px] w-[202px] px-[27px] py-[18px]">SUBJEK</td>
                        <td className="h-[59px] w-[181px] px-[27px] py-[18px]">TANGGAL BATAS</td>
                        <td className="h-[59px] w-[245px] px-[27px] py-[18px]">AKSI</td>
                    </tr>

                </thead>
                <tbody>
                    <tr className="border-b border-slate-300">
                        <td className="pl-[27px]">
                            <div className="flex gap-4 w-[430px]">
                                <div className="bg-[#DCE2F3] rounded-xl p-2">
                                    <Sigma
                                        size={30}
                                    />
                                </div>

                                <div>
                                    <h1 className="text-[18px] font-semibold">Matematika Dasar : Aljabar</h1>
                                    <p className="text-[15px] text-slate-400 font-semibold">90 Menit • 40 Soal</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-[27px] py-[38px] text-[18px]">
                            Matematika
                        </td>
                        <td>
                            <div className="flex flex-col items-center gap-2 ">
                                <p className="text-[18px] font-semibold">1 Hari lagi</p>
                                <p className="text-[15px]">24 Desember 2023</p>
                            </div>
                        </td>
                        <td className=" p-[27px] text-center">
                            <Link
                                href={'/ujian/id'}
                                className="bg-[#004AC6] !text-[white] px-[22.5px] py-[11.25px] rounded-xl font-semibold"
                            
                            >Kerjakan Sekarang</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}