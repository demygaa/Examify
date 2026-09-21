"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

export default function ExamHistoryPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: Props) {

    const startItem =
        (currentPage - 1) * itemsPerPage + 1;

    const endItem =
        Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-between border-t border-slate-200 p-4">

            <p className="text-sm text-slate-600">
                Menampilkan {startItem}-{endItem} dari {totalItems} ujian
            </p>

            <div className="flex gap-2">

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-200 p-2 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-200 p-2 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                    <ChevronRight size={18} />
                </button>

            </div>

        </div>
    );
}