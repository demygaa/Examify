"use client";

import CardSoal from "@/src/components/guru/banksoal/CardSoal";
import ClassPagination from "@/src/components/admin/masterdata/PageNationClass";

export type BankSoalItem = {
    id: string;
    mapel: string;
    judul: string;
    soal: string;
    value: string;
    recent: string;
};

type BankSoalListProps = {
    items: BankSoalItem[];
    page: number;
    onPageChange: (page: number) => void;
};

const PAGE_SIZE = 10;

export default function BankSoalList({
    items,
    page,
    onPageChange,
}: BankSoalListProps) {
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * PAGE_SIZE;
    const pageItems = items.slice(startIndex, startIndex + PAGE_SIZE);

    if (items.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                Tidak ada bank soal yang cocok dengan filter.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {pageItems.map((examcd) => (
                <CardSoal
                    key={examcd.id}
                    id={examcd.id}
                    mapel={examcd.mapel}
                    judul={examcd.judul}
                    soal={examcd.soal}
                    value={examcd.value}
                    recent={examcd.recent}
                />
            ))}

            <ClassPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={items.length}
                pageSize={PAGE_SIZE}
            />
        </div>
    );
}
