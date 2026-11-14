import { LucideIcon, Pen, Plus } from "lucide-react";

type LastActivityProps = {
    icon: LucideIcon
    judul: string
    ket: string
}

export default function LastActivity({
    icon: Icon,
    judul,
    ket
}: LastActivityProps) {
    const lastActivity = [
        {
            id: 1,
            judul: "Menambahkan soal",
            ket: "perubahan dalam geometri ajamfdakjda",
            Icon: Plus
        },
        {
            id: 2,
            judul: "Mengedit draft",
            ket: "perubahan dalam geometri ajamfdakjda",
            Icon: Pen
        }

    ]
    return (
        <div className="bg-white border border-slate-200 shadow-sm text-black rounded-xl p-3 sm:p-[27px] flex flex-col gap-3 mt-[20px]">
            <p className="font-semibold text-xs sm:text-sm">Aktivitas Terakhir</p>

            {lastActivity.map((activity) => {
                const Icon = activity.Icon;

                return (
                    <div key={activity.id} className="flex items-center gap-2">
                        <Icon size={24} 
                            className="p-1.5 rounded-full"
                            style={{ 
                                backgroundColor : "#EDEDF9",   
                                color: "blue"
                            }}
                        />

                        <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate line-clamp-1">{activity.judul}</p>
                            <p className="text-xs sm:text-[12px] line-clamp-1">{activity.ket}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}