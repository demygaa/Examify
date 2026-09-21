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
        <header className="text-black flex flex-row justify-between">
            <div>
                <p className="text-2xl font-bold text-slate-900">{title}</p>
                <p className="mt-1 text-[15px] text-slate-500">{description}</p>
            </div>
            <div className="flex flex-row gap-3 items-center">
                <div>
                    <p className="text-[20px] font-semibold text-slate-900">{name}</p>
                    <p className="text-[15px] text-slate-500">{prodi}</p>
                </div>
                <User 
                    size={50}
                    className="bg-white p-2 text-blue-700 border border-slate-300 rounded-full"
                />
            </div>
        </header>
    );
}