
"use client";

type ShowDoneProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ShowDone({
    isOpen,
    onConfirm,
    onCancel,
}: ShowDoneProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[420px] rounded-2xl bg-white p-6 shadow-xl">
                
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                    <span className="text-2xl">!</span>
                </div>

                {/* Content */}
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-800">
                        Selesaikan Ujian?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Apakah kamu yakin ingin menyelesaikan ujian?
                        Setelah dikonfirmasi, jawaban tidak dapat diubah kembali.
                    </p>
                </div>

                {/* Button */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                        Kembali
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
                    >
                        Ya, Selesaikan
                    </button>
                </div>
            </div>
        </div>
    );
}

