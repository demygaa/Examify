"use client";

type AccountTab = "all" | "student" | "teacher" | "administrator";

type Props = {
    activeTab: AccountTab;
    onTabChange: (tab: AccountTab) => void;
};

export default function AccountTabs({
    activeTab,
    onTabChange,
}: Props) {
    const tabs = [
        {
            label: "All Accounts",
            value: "all" as const,
        },
        {
            label: "Students",
            value: "student" as const,
        },
        {
            label: "Teachers",
            value: "teacher" as const,
        },
        {
            label: "Administrators",
            value: "administrator" as const,
        },
    ];

    return (
        <div className="flex h-11 gap-6 border-b border-slate-300 px-5">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={`text-xs font-medium ${
                        activeTab === tab.value
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-slate-600"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}