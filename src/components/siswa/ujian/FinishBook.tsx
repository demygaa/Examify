import { BookOpen } from "lucide-react";

export default function FinishBook() {
    return (
        <div className="flex flex-col gap-4 items-center mt-[70px] mb-[30px]">
            <div className="bg-[#EDEDF9] p-4 w-fit rounded-full">
                <BookOpen
                    size={50}
                    color="black"
                />
            </div>
            <p className="text-[20px] text-black font-bold">Tidak Ada Lagi Ujian</p>
            <p className="text-black text-[15px]">Semua Ujian Periode Ini Telah Ditampilkan</p>
        </div>
    );
}