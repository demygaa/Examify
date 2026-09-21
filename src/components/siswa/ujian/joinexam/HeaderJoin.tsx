import Image from "next/image";
import { GraduationCapIcon } from "lucide-react";

export default function JoinHeader() {
    return (
        <header className="flex items-center px-[20px] py-[20px] justify-between mb-[30px]">
            {/* Bagian kiri */}
            <div className="flex items-center relative -top-[20px] border-slate-200 gap-5" >
                            <Image
                                src="/logo.png"
                                alt="Examify"
                                width={40}
                                height={40}
                            />
                            <div className="flex-column gap-2">
                                <h1 className="text-[20px] font-bold text-black">
                                    Examify
                                </h1>
                            </div>
            
                        </div>

            {/* Bagian kanan */}
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-[20px] font-semibold text-slate-900">
                        Dimas Prayoga
                    </p>

                    <p className="text-[15px] text-slate-500">
                        XI RPL 1
                    </p>
                </div>

                <div className="flex items-center justify-center relative h-[60px] w-[60px] overflow-hidden rounded-full border border-slate-200">
                   <GraduationCapIcon size={40}
                    color="blue"
                   />
                </div>
            </div>
        </header>
    );
}