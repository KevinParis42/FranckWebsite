import PageLayout from "@/components/PageLayout"
import { projectType } from "@/types"
import Link from "next/link"
import { useEffect, useState } from "react"

const Home = () => {

  const [projects, setProjects] = useState<projectType[]>([])

  const getProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`)
    setProjects(await res.json())
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <PageLayout>
      <h1>Ceci est ma gallerie !</h1>
      {projects &&
        <>
          {projects.map(project => <div key={project.id}>
            <Link href={`/gallery/${project.name}`}>{project.name}</Link>
          </div>)}
        </>
      }
    </PageLayout>
  )
}

export default Home
