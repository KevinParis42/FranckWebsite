import AdminLogForm from "@/components/AdminLogForm"
import AdminPageLayout from "@/components/AdminPageLayout"
import AdminProjectTable from "@/components/AdminProjectTable"
import UploadCard from "@/components/UploadCard"
import { projectType } from "@/types"
import { useEffect, useState } from "react"


const AdminPage: React.FC = () => {

    const [logged, setLogged] = useState(false)
    const [projects, setProjects] = useState<projectType[]>([])

    const getProjects = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`)
        setProjects(await res.json())
    }

    useEffect(() => {
        getProjects()
    }, [])


    return (
        <AdminPageLayout>
            {logged ?
                <>
                    <div>
                        <UploadCard projects={projects} setProjects={setProjects} />
                    </div>
                    <br />
                    <div>
                        <AdminProjectTable projects={projects} setProjects={setProjects} />
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
