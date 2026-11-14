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
}: CardLibraryProps) {
    return (
        <div className="bg-white w-full p-3 sm:p-[15px] rounded-xl shadow-lg flex flex-col gap-2">
            <Icon 
                size={36}
                className="p-2 rounded-xl"
                style={style}
            />
            <p className="text-[13px] text-slate-400 font-semibold sm:text-xs">{title}</p>
            <p className="text-base sm:text-[20px] text-black font-semibold">{value}</p>
        </div>
    );
}