import { MoreVertical } from "lucide-react";

type QuestionCardProps = {
    nomor: number;
    soal: string;
    jawaban: string[];
    jawabanBenar?: number;
};

export default function QuestionCard({
    nomor,
    soal,
    jawaban,
    jawabanBenar,
}: QuestionCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">

            {/* Header soal */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold">
                        {nomor}
                    </span>

                    <span className="text-xs text-slate-500">
                        Pilihan Ganda
                    </span>
                </div>

                <MoreVertical
                    size={18}
                    className="text-slate-400"
                />
            </div>

            {/* Pertanyaan */}
            <p className="mt-4 text-sm font-medium text-slate-900">
                {soal}
            </p>

            {/* Jawaban */}
            <div className="mt-4 flex flex-col gap-2">
                {jawaban.map((item, index) => {
                    const isCorrect = index === jawabanBenar;

                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                                isCorrect
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-200"
                            }`}
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                                {String.fromCharCode(65 + index)}
                            </span>

                            <span className="text-slate-700">
                                {item}
                            </span>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}