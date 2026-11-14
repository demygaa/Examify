"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { sidebarMenus } from "./SidebarMenu";

type Role = "Siswa" | "Guru" | "Admin";

export default function Sidebar({ role, onClose }: { role: Role; onClose?: () => void }) {
    const menus = sidebarMenus[role];
    const pathname = usePathname();
    const rootPath = `/${role.toLowerCase()}`;
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/auth/logout", {
            method: "POST",
            cache: "no-store",
        });

        if (onClose) onClose();
        router.push("/");
        router.refresh();
    }

    return (
        <aside className="flex h-screen w-[290px] shrink-0 flex-col border-r border-slate-200 bg-white lg:fixed">

            {/* Logo */}
            <div className="flex h-20 items-center border-b border-slate-200 px-4 gap-5" >
                <Image
                    src="/logo.png"
                    alt="Examify"
                    width={45}
                    height={45}
                />
                <div className="flex-column gap-2">
                    <h1 className="text-[20px] font-bold text-black">
                        Examify
                    </h1>
                    <p className="text-black font-medium">
                        {role} Portal
                    </p>
                </div>

            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
                <div className="space-y-1">
                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        const isRootMenu = menu.href === rootPath;
                        const isActive = isRootMenu
                            ? pathname === rootPath
                            : pathname === menu.href || pathname.startsWith(`${menu.href}/`);


                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                onClick={onClose}
                                className={`flex items-center text-[15px] gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600 rounded-tl-[0px] rounded-bl-[0px]"
                                    : "text-slate-700 hover:bg-slate-100"

                                    }`}
                            >
                                <Icon size={20} />

                                <span className={isActive ? "font-bold" : "font-medium"}>
                                    {menu.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 p-4">

                <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 rounded-lg px-2 py-3 text-[15px] text-left text-sm font-bold text-red-600 hover:bg-red-50">
                        <LogOut size={20} />
                        <span>Logout</span>

                    </button>
            </div>

        </aside>
    );
}