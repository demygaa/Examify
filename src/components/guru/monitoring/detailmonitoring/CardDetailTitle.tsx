import { File } from "lucide-react";
type CardDetailTitleProps = {
    title: string
    kelas: string
    soal: string
}

export default function CardDetaiTitle({
    title,
    kelas,
    soal
} : CardDetailTitleProps) {
    return (
        <div className="bg-white p-[27px] border border-slate-300 shadow-sm rounded-xl flex flex-row gap-3 items-center w-fit">
            <File 
                size={45}
                color="blue"
                className="bg-blue-100 p-2 rounded-full"
            />
            <div className="flex flex-col gap-1">
                <p className="text-black font-semibold text-[20px]">{title}</p>
                <p className="text-slate-300 font-semibold text-[15px]">Kelas {kelas} • Soal {soal}</p>
            </div>
            <div>
                <p className="bg-green-100 text-green-700 px-2 py-1 rounded-xl text-[15px] font-semibold">• Berlangsung</p>
            </div>
        </div>
    );
}