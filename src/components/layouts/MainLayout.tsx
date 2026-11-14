"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import "@/src/app/globals.css";
import { Menu, X } from "lucide-react";

type Role = "Siswa" | "Guru" | "Admin";

export default function MainLayout({
    children,
    role,
}: {
    children: React.ReactNode;
    role: Role;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-black">Examify</span>
                    <span className="text-sm text-slate-600">| {role} Portal</span>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Close button on mobile sidebar */}
            {sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden fixed top-3 right-3 z-[60] rounded-full bg-white p-2 shadow-lg"
                    aria-label="Close menu"
                >
                    <X size={18} />
                </button>
            )}

            <main className="min-w-0 w-full lg:ml-[290px] p-4 pt-20 lg:pt-8 lg:p-8 flex-1 bg-[#F0F1FD]">
                {children}
            </main>
        </div>
    );
}