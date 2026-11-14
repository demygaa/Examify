import { prisma } from "@/src/lib/prisma";
import AccountManagement from "@/src/components/admin/kelolaakun/AccountManagements";
import type { Account } from "@/src/components/admin/kelolaakun/AccountTable";

export default async function Page() {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            siswa: {
                include: {
                    riwayatKelas: {
                        where: { tahunAjaran: { isActive: true } },
                        include: { kelas: true },
                        take: 1,
                    },
                },
            },
            karyawan: true,
        },
    });

    const accounts = users.map((user): Account => {
        const kelas = user.siswa?.riwayatKelas[0]?.kelas;

        return {
            id: user.id,
            nama: user.siswa?.nama ?? user.karyawan?.nama ?? user.username,
            username: user.username,
            role:
                user.role === "SISWA"
                    ? "Student"
                    : user.role === "GURU"
                        ? "Teacher"
                        : "Administrator",
            identifier:
                user.siswa?.nis ?? user.karyawan?.nip ?? user.username,
            kelas: kelas?.kodeKelas ?? "-",
            status: user.status === "ACTIVE" ? "Active" : "Inactive",
            login: user.lastLogin
                ? user.lastLogin.toLocaleString("id-ID")
                : "Belum pernah login",
            createdAt: user.createdAt.toLocaleString("id-ID"),
        };
    });

    return <AccountManagement users={accounts} />;
}
