import Image from "next/image";
import { GraduationCapIcon } from "lucide-react";

export default function JoinHeader() {
    return (
        <header className="flex items-center px-4 sm:px-[20px] py-4 sm:py-[20px] justify-between mb-4 sm:mb-[30px]">
            {/* Bagian kiri */}
            <div className="flex items-center border-slate-200 gap-3 sm:gap-5" >
                            <Image
                                src="/logo.png"
                                alt="Examify"
                                width={35}
                                height={35}
                                className="sm:w-[40px] sm:h-[40px]"
                            />
                            <div className="flex-column gap-2">
                                <h1 className="text-lg sm:text-[20px] font-bold text-black">
                                    Examify
                                </h1>
                            </div>
            
                        </div>

            {/* Bagian kanan */}
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right">
                    <p className="text-sm sm:text-[18px] lg:text-[20px] font-semibold text-slate-900">
                        Dimas Prayoga
                    </p>

                    <p className="text-xs sm:text-[15px] text-slate-500">
                        XI RPL 1
                    </p>
                </div>

                <div className="flex items-center justify-center relative h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] lg:h-[60px] lg:w-[60px] overflow-hidden rounded-full border border-slate-200 flex-shrink-0">
                   <GraduationCapIcon size={28}
                    className="sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px]"
                    color="blue"
                   />
                </div>
            </div>
        </header>
    );
}