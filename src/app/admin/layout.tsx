import MainLayout from "@/src/components/layouts/MainLayout";

export default function SiswaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MainLayout role="Admin">
            {children}
        </MainLayout>
    );
}