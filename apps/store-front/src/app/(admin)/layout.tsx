import DefaultAdminLayout from "@/components/admin/DefaultAdminLayout";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DefaultAdminLayout>
            {children}
        </DefaultAdminLayout>
    );
}
