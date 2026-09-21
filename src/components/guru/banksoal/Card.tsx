import { LucideIcon } from "lucide-react";
import { CSSProperties } from "react";
type CardLibraryProps = {
    icon : LucideIcon
    title: string
    value: string
    style?: CSSProperties
}

export default function CardLibrary({
    icon: Icon,
    style,
    title,
    value
} : CardLibraryProps) {
    return (
        <div className="bg-white w-full p-4 rounded-xl shadow-lg flex flex-col gap-2">
            <Icon 
                size={45}
                className="p-2 rounded-xl"
                style={style}
            />
            <p className="text-[15px] text-slate-400 font-semibold">{title}</p>
            <p className="text-[20px] text-black font-semibold">{value}</p>
        </div>

    );
}