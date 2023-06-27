import AdminPageLayout from "@/components/AdminPageLayout"
import AdminProjectTable from "@/components/AdminProjectTable"
import UploadCard from "@/components/UploadCard"


const AdminPage: React.FC = () => {

    return (
        <AdminPageLayout>
            <div>
                <UploadCard />
            </div>
            <br />
            <div>
                <AdminProjectTable />
            </div>
        </AdminPageLayout>
    )
}


export default AdminPage
