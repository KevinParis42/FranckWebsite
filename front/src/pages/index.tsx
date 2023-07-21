import PageLayout from "@/components/PageLayout"
import { devices } from "@/sizes"
import { projectType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Home = () => {

  const [projects, setProjects] = useState<projectType[]>([])

  const getProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`)
    const datas = await res.json()
    setProjects(datas.filter((data: projectType) => data.isPublished ?? data))
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <PageLayout>
      <br />
      <HeroDiv>
        <HeroImg src={'/title.png'} alt="infographiste" width={0} height={0} sizes="100vw" />
      </HeroDiv>
      <br />
      <GalleryDiv>
        <h2>gallerie</h2>
        <hr />
        <div>
          ici c'est les projets
        </div>
      </GalleryDiv>

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

const HeroDiv = styled.div`
  display: flex;
  min-height: 12vh;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url('/form.png');
  background-repeat: repeat;
  background-size: 100% 100%;

  @media ${devices.tablet} {
    background-image: url('/form.png');
    background-repeat: repeat;
    background-size: 100% 100%;
    height: 10vh;
  }
`

const HeroImg = styled(Image)`
  width: 50%;
  height: auto;

  @media ${devices.tablet} {
    width: auto;
    height: 100%;
  }

`

const GalleryDiv = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 8vh;
  margin-right: 8vh;
  border: 1px solid black;
  border-radius: 20px;
  background: rgb(42,112,248);
  background: linear-gradient(355deg, rgba(42,112,248,1) 10%, rgba(126,73,193,1) 90%);
  box-shadow: 0.5px 0 16.5px 4.5px rgba(0, 0, 0, 0.4);


`
