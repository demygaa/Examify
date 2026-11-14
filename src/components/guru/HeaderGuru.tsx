import { User } from "lucide-react";
type HeaderProps = {
    title: string,
    description: string
    name: string
    prodi: string
}

export default function HeaderGuru({
    title,
    description,
    name,
    prodi
}: HeaderProps) {
    return (
        <header className="text-black flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mb-4 sm:mb-0">
            <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{title}</p>
                <p className="mt-1 text-xs sm:text-[15px] text-slate-500">{description}</p>
            </div>
            <div className="flex flex-row gap-2 sm:gap-3 items-center">
                <div>
                    <p className="text-sm sm:text-[18px] font-semibold text-slate-900">{name}</p>
                    <p className="text-[10px] sm:text-[13px] text-slate-500">{prodi}</p>
                </div>
                <User 
                    size={35}
                    className="bg-white p-2 sm:p-2 text-blue-700 border border-slate-300 rounded-full shrink-0"
                />
            </div>
        </header>
    );
}