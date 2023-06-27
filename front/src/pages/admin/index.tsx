import AdminLogForm from "@/components/AdminLogForm"
import AdminPageLayout from "@/components/AdminPageLayout"
import AdminProjectTable from "@/components/AdminProjectTable"
import UploadCard from "@/components/UploadCard"
import { useState } from "react"


const AdminPage: React.FC = () => {

    const [logged, setLogged] = useState(false)

    return (
        <AdminPageLayout>
            {logged ?
                <>
                    <div>
                        <UploadCard />
                    </div>
                    <br />
                    <div>
                        <AdminProjectTable />
                    </div>
                </>
                :
                <>
                    <AdminLogForm setLogged={setLogged} />
                </>}
        </AdminPageLayout>
    )
}


export default AdminPage
