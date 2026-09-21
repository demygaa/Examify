import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import SchoolContactForm from "@/src/components/admin/kelolasekolah/FormSekolah";
import SchoolDescription from "@/src/components/admin/kelolasekolah/SchoolDescription";
import SchoolFormActions from "@/src/components/admin/kelolasekolah/SchoolFormActions";
import SchoolLogoCard from "@/src/components/admin/kelolasekolah/SchoolLogoCard";

export default function SekolahPage() {
    return (
        <div>
            <HeaderAdmmin
                title="Profil Sekolah"
                sec="Kelola profil sekolah"
            />
            <form className="space-y-5 mt-[20px]">
                
                <div className="flex flex-row gap-[20px]">
                    <SchoolLogoCard />

                    <SchoolContactForm />
                </div>

                
                <SchoolDescription />

            
                <SchoolFormActions />
            </form>
        </div>
    );
}