import { Sigma } from "lucide-react";
import Link from "next/link";

export default function TabelNotDone() {
    return (
        <div className="overflow-x-auto text-black border border-slate-300 rounded-xl bg-white">
            <table className="w-full min-w-[580px] sm:min-w-[650px]">
                <thead>
                    <tr className="text-sm sm:text-base lg:text-[20px] font-semibold text-slate-500 bg-[#EDEDF9] text-left">
                        <td className="h-[48px] sm:h-[59px] w-[250px] sm:w-[430px] px-3 sm:px-[27px] py-2.5 sm:py-[18px]">JUDUL</td>
                        <td className="h-[48px] sm:h-[59px] w-[120px] sm:w-[202px] px-3 sm:px-[27px] py-2.5 sm:py-[18px]">SUBJEK</td>
                        <td className="h-[48px] sm:h-[59px] w-[110px] sm:w-[181px] px-3 sm:px-[27px] py-2.5 sm:py-[18px]">TANGGAL BATAS</td>
                        <td className="h-[48px] sm:h-[59px] w-[160px] sm:w-[245px] px-3 sm:px-[27px] py-2.5 sm:py-[18px]">AKSI</td>
                    </tr>

                </thead>
                <tbody>
                    <tr className="border-b border-slate-300">
                        <td className="pl-3 sm:pl-[27px]">
                            <div className="flex gap-2.5 sm:gap-4 w-[250px] sm:w-[430px] py-4">
                                <div className="bg-[#DCE2F3] rounded-xl p-1.5 sm:p-2 flex-shrink-0">
                                    <Sigma
                                        size={22}
                                        className="sm:w-[30px] sm:h-[30px]"
                                    />
                                </div>

                                <div>
                                    <h1 className="text-sm sm:text-[18px] font-semibold line-clamp-2">Matematika Dasar : Aljabar</h1>
                                    <p className="text-xs sm:text-[15px] text-slate-400 font-semibold">90 Menit • 40 Soal</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-3 sm:px-[27px] py-4 sm:py-[38px] text-sm sm:text-[18px]">
                            Matematika
                        </td>
                        <td>
                            <div className="flex flex-col items-center gap-1 sm:gap-2 px-2">
                                <p className="text-sm sm:text-[18px] font-semibold">1 Hari lagi</p>
                                <p className="text-xs sm:text-[15px] whitespace-nowrap">24 Desember 2023</p>
                            </div>
                        </td>
                        <td className="p-3 sm:p-[27px] text-center">
                            <Link
                                href={'/ujian/id'}
                                className="bg-[#004AC6] !text-[white] px-3 sm:px-[22.5px] py-2 sm:py-[11.25px] rounded-xl font-semibold text-xs sm:text-base inline-block whitespace-nowrap"
                            
                            >Kerjakan Sekarang</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}