import {
    LayoutDashboard,
    FileText,
    Cog,
    History,
    Database,
    Eye,
    UserCog,
    School,
    HelpCircle,
} from "lucide-react";

export const sidebarMenus = {
    Siswa: [
        {   
            label: "Dashboard",
            href: "/siswa",
            icon: LayoutDashboard,
        },
        {
            label: "Ujian",
            href: "/siswa/ujian",
            icon: FileText,
        },
        {
            label: "Riwayat",
            href: "/siswa/history",
            icon: History,
        },
        
    ],

    Guru: [
        {
            label: "Dashboard",
            href: "/guru",
            icon: LayoutDashboard,
        },
        {
            label: "Bank Soal",
            href: "/guru/banksoal",
            icon: Database,
        },
        {
            label: "Ujian",
            href: "/guru/ujian",
            icon: FileText,
        },
        {
            label: "Monitoring Ujian",
            href: "/guru/monitoring",
            icon: Eye,
        },
        {
            label: "Riwayat Ujian",
            href: "/guru/history",
            icon: History,
        },

    ],

    Admin: [
        {
            label: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            label: "Master Data",
            href: "/admin/masterdata",
            icon: Database,
        },
        {
            label: "Kelola Sekolah",
            href: "/admin/sekolah",
            icon: School,
        },
        {
            label: "Kelola Akun",
            href: "/admin/kelolaakun",
            icon: UserCog,
        },
        {
            label: "Kelola Laporan",
            href: "/admin/kelolalaporan",
            icon: HelpCircle,
        },
        {
            label: "System",
            href: "/admin/system",
            icon: Cog,
        },
    ],
};