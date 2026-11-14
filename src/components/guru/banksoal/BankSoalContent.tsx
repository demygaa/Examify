"use client";

import { useMemo, useState } from "react";
import BankSoalFilter, {
    type SortOrder,
} from "@/src/components/guru/banksoal/BankSoalFilter";
import BankSoalList, {
    type BankSoalItem,
} from "@/src/components/guru/banksoal/BankSoalList";

type BankSoalContentProps = {
    items: BankSoalItem[];
    mapelOptions: string[];
};

export default function BankSoalContent({
    items,
    mapelOptions,
}: BankSoalContentProps) {
    const [query, setQuery] = useState("");
    const [selectedMapel, setSelectedMapel] = useState("all");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
    const [page, setPage] = useState(1);

    const filteredItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        const result = items.filter((item) => {
            const matchesMapel =
                selectedMapel === "all" || item.mapel === selectedMapel;

            const matchesQuery =
                normalizedQuery.length === 0 ||
                [item.judul, item.mapel, item.soal].some((value) =>
                    value.toLowerCase().includes(normalizedQuery)
                );

            return matchesMapel && matchesQuery;
        });

        return result.sort((a, b) => {
            const aTime = Date.parse(a.recent) || 0;
            const bTime = Date.parse(b.recent) || 0;

            return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
        });
    }, [items, query, selectedMapel, sortOrder]);

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setPage(1);
    };

    const handleMapelChange = (value: string) => {
        setSelectedMapel(value);
        setPage(1);
    };

    const handleSortOrderChange = (value: SortOrder) => {
        setSortOrder(value);
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-5">
            <BankSoalFilter
                query={query}
                onQueryChange={handleQueryChange}
                selectedMapel={selectedMapel}
                onMapelChange={handleMapelChange}
                mapelOptions={mapelOptions}
                sortOrder={sortOrder}
                onSortOrderChange={handleSortOrderChange}
            />

            <BankSoalList
                items={filteredItems}
                page={page}
                onPageChange={setPage}
            />
        </div>
    );
}
