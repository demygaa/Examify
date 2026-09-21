import { prisma } from "@/src/lib/prisma";
import AccountManagement from "@/src/components/admin/kelolaakun/AccountManagements";

export default async function Page() {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    console.log("DATA USER:", users);

    

    const accounts = users.map((user) => ({
        id: user.id,
        nama: "User",
        email: "-",
        role:
            user.role === "SISWA"
                ? "Student"
                : user.role === "GURU"
                    ? "Teacher"
                    : "Administrator",
        identifier: "-",
        className: "-",
        status:
            user.status === "ACTIVE"
                ? "Active"
                : "Inactive",
        login: user.lastLogin
            ? user.lastLogin.toLocaleString("id-ID")
            : "Belum pernah login",
    }));

    return (
        <AccountManagement users={accounts} />
    );
}