export default function ProgresPengerjaan() {
    return (
        <div className="bg-white p-3 sm:p-[20px] rounded-xl flex flex-col gap-3 sm:gap-4 w-full max-w-[700px] mx-auto">
            <h1 className="font-semibold text-base sm:text-[18px] ">Progres Ujian</h1>
            <div className="flex flex-row gap-3 sm:gap-4 ">
                <div className="h-1.5 sm:h-2 w-full rounded-full bg-slate-200">
                    <div
                        className="h-3 sm:h-4 rounded-full bg-blue-600 w-[100px]"
                    />
                </div>
                <p className="text-black text-xs sm:text-sm w-auto sm:w-[300px]">12 soal dari 40 soal (12%)</p>
            </div>
        </div>
    );
}