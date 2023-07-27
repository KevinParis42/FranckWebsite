import PageLayout from "@/containers/PageLayout"
import { devices } from "@/sizes"
import { projectType } from "@/types"
import { Card } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const Home = () => {

  const [projects, setProjects] = useState<projectType[]>([])

  const getProjects = async () => {
    const res = await fetch(`${BACKEND_URL}/project`)
    const datas = await res.json()
    setProjects(datas.filter((data: projectType) => data.isPublished ?? data))
  }

  useEffect(() => {
    getProjects()
    console.log(projects)
  }, [])

  return (
    <PageLayout>
      <HeroDiv>
        <HeroImg src={'/title.png'} alt="infographiste" width={0} height={0} sizes="100vw" />
      </HeroDiv>
      <GalleryDiv>
        <TitleDiv>
          <GalleryTitle>GALLERIE 3D</GalleryTitle>
          <hr />
        </TitleDiv>
        <div>
          {projects &&
            <ProjectGrid>
              {projects.map(project => <div key={project.id}>
                <Link href={`/gallery/${project.name}`}>
                  <StyledCard
                    hoverable
                    cover={<img alt="example" src={`${BACKEND_URL}/${project.images[0].imagePath}`} />}
                  >
                    <StyledCardMeta title={project.name.toUpperCase()} />
                  </StyledCard>
                </Link>
              </div>)}
            </ProjectGrid>
          }
        </div>
      </GalleryDiv>

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
  margin: 2vh 0;
  background-image: url('/form.png');
  background-repeat: repeat;
  background-size: 100% 100%;

  @media ${devices.tablet} {
    height: 10vh;
  }
`

const HeroImg = styled(Image)`
  min-width: 240px;
  width: 50%;
  height: auto;

  @media ${devices.tablet} {
    width: auto;
    height: 100%;
  }

`

const GalleryDiv = styled.div`
  /* min-height: 60vh; */
  min-width: 250px;
  margin: 2vh 4vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  border-radius: 20px;
  background: rgb(42,112,248);
  background: linear-gradient(175deg, rgba(42,112,248,1) 10%, rgba(126,73,193,1) 90%);
  box-shadow: 0.5px 0 16.5px 4.5px rgba(0, 0, 0, 0.4);

  @media ${devices.mobileM} {
    margin-left: 8vw;
    margin-right: 8vw;
  }
`

const TitleDiv = styled.div`
  width: 95%;
`

const GalleryTitle = styled.h2`
  color: white;
  font-family: 'ArcaneNine';
  /* font-size: 25px; */
  text-align: center;
  margin-top: 5px;
`

const ProjectGrid = styled.div`
  display: flex;
  margin: 4vh 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const StyledCard = styled(Card)`
  width: 240px;
  margin: 10px;
  background-color: #FEFEE2;

  @media ${devices.laptop} {
    width: 20vw;
  }
`
const StyledCardMeta = styled(Card.Meta)`
  text-align: center;
  font-family: 'ChampAndLim';
`
