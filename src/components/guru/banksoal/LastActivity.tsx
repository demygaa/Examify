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
        <div className="bg-white border border-slate-200 shadow-sm text-black rounded-xl p-[27px] flex flex-col gap-3 mt-[20px]">
            <p className="font-semibold">Aktivitas Terakhir</p>

            {lastActivity.map((activity) => {
                const Icon = activity.Icon;

                return (
                    <div key={activity.id} className="flex items-center gap-3">
                        <Icon size={40} 
                            className="p-2 rounded-full"
                            style={{ 
                                backgroundColor : "#EDEDF9",   
                                color: "blue"
                            }}
                        />

                        <div>
                            <p>{activity.judul}</p>
                            <p>{activity.ket}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}