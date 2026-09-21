import Link from "next/link";
type cardExamLiveProps = {
    status: string
    judul: string
    id: number
    timer: string
    peserta: string
    kelas: string
    progres: string
}


export default function CardExamLive({
    id,
    status,
    judul,
    peserta,
    timer,

    kelas,
    progres
}: cardExamLiveProps) {
    const isActived = status === "BERLANGSUNG";
    return (
        <div>
            {isActived

                ? <div className="bg-[#2563EB] w-full rounded-xl shadow-lg p-[27px] gap-4 flex flex-col text-white">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            <p
                                className="text-[10px] px-2 py-2 rounded-xl font-semibold w-fit"
                                style={{ backgroundColor: "rgba(247, 244, 243, 0.2)", }}
                            >SEDANG {status}</p>
                            <p className="text-[30px] font-semibold">Ujian - {judul}</p>
                            <p className="text-[15px] text-slate-800 text-white">{kelas} • waktu Ujian {timer}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-4xl font-semibold">{peserta}</p>
                            <p className="text-[15px]">Peserta Online</p>
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="h-2 w-full rounded-full bg-slate-500"
                        >
                            <div className="h-2 rounded-full bg-white"
                                style={{ width: progres }} />
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-[15px] font-medium">PROGRES KEHADIRAN</p>
                            <p className="text-[]18px font-semibold">{progres}</p>
                        </div>
                    </div>
                </div>

                : <div className="">
                    <p>Belum Ada Ujian Yang dimulai?</p>
                    <Link href={'/guru/ujian'}>Kelola Sekarang</Link>
                </div>
            }
        </div>
    );
}