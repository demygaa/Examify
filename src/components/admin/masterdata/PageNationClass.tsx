"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ClassPaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function ClassPagination({
    currentPage,
    totalPages,
    onPageChange,
}: ClassPaginationProps) {
    return (
        <div className="flex items-center justify-between border-t border-slate-200 p-3">

            <p className="text-sm text-slate-600">
                Showing 1 to 10 of 32 entries
            </p>

            <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="rounded-lg border border-slate-300 p-2 disabled:opacity-40"
                >
                    <ChevronLeft size={15} />
                </button>

                {/* Number */}
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`h-8 w-8 rounded-lg text-sm ${
                            currentPage === page
                                ? "bg-blue-600 text-white"
                                : "text-slate-700"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="rounded-lg border border-slate-300 p-2 disabled:opacity-40"
                >
                    <ChevronRight size={15} />
                </button>

            </div>

        </div>
    );
}