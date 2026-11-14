import React from "react";
import Link from "next/link";
import { UserRound, Timer, Calendar } from "lucide-react";

type ExamifyCardProps = {
    id: number;
    status: string,
    mapel: string,
    judul: string,
    kelas: string,
    timer: string,
    schedule: string,
}

export default function ExamifyCard({
    id,
    status,
    mapel,
    judul,
    kelas,
    timer,
    schedule
}: ExamifyCardProps) {

    const isActive = status === "BERLANGSUNG"

    return (
        <div className={`w-full h-[351px] flex flex-col gap-2 bg-white mt-4 lg:mt-[30px] p-5 sm:p-[27px] rounded-xl ${isActive
            ? "border border-blue-400 "
            : "border border-slate-300"
            }`}>
            <div className="flex flex-row justify-between">
                <div>
                    {isActive
                        ? (
                            <span className="bg-blue-200 h-fit text-blue-700 px-[9px] py-[4.5px] font-bold text-[12px] rounded-[5px]">
                                {status}
                            </span>
                        ) : (
                            <span className="bg-black bg-slate-200 text-black text-slate-400 px-[9px] py-[4.5px] font-bold text-[12px] rounded-[5px]">
                                {status}
                            </span>
                        )
                    }
                </div>
                <div>
                    {isActive
                        ? (
                            <div className="flex flex-col justify-end items-center">
                                <span className="text-black text-slate-700 font-semibold text-[13px]">
                                    MATAPELAJARAN</span>
                                <span className="self-end text-blue-700 text-[13px] font-bold">
                                    {mapel}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-end items-center">
                                <span className="text-black text-slate-700 font-semibold text-[13px]">
                                    MATAPELAJARAN</span>
                                <span className="self-end text-black text-[13px] font-bold">
                                    {mapel}</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                <p className="text-lg sm:text-[22px] font-semibold text-black line-clamp-2">
                    {judul}
                </p>
                <div className="flex flex-row gap-2 mt-[5px] items-center">
                    <UserRound
                        size={25}
                        className="text-slate-500"
                    />
                    <p className="text-slate-500 text-[15px] font-medium ">
                        Kelas {kelas}</p>
                </div>
            </div>
            <div className="flex mt-[10px] flex-row justify-between">
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex flex-row gap-2 mt-[12px]">
                        <Timer
                            size={20}
                            className="text-black text-slate-800 font-bold"
                        />
                        <p className="text-black text-slate-700 font-semibold">DURASI</p>
                    </div>
                    <p className="text-lg sm:text-[20px] text-black font-bold">{timer}</p>
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex flex-row gap-2 mt-[12px]">
                        <Calendar
                            size={20}
                            className="text-black text-slate-800 font-bold"
                        />
                        <p className="text-black text-slate-700 font-semibold">JADWAL</p>
                    </div>
                    <p className="text-lg sm:text-[20px] text-black font-bold">{schedule}</p>
                </div>
            </div>
            <div className="mt-auto">
                {isActive ? (
                    <Link
                        href={`/siswa/ujian/${id}`}
                        className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white"
                    >
                        Mulai Ujian
                    </Link>
                ) : (
                    <button
                        disabled
                        className="w-full rounded-lg bg-slate-200 py-3 text-center font-semibold text-slate-400"
                    >
                        Belum Dimulai
                    </button>
                )}
            </div>

        </div>
    );
}