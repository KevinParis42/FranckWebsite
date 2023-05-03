import CarouselContainer from "@/components/Carousel";
import ObjViewer from "@/components/ObjViewer";
import PageLayout from "@/components/PageLayout";
import { promises as fs } from 'fs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import path from "path";
import styled from 'styled-components';


export async function getStaticPaths() {
  return {
    paths: [
      { params: { obj: 'killerqueen' } },
      { params: { obj: 'sword' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const publicDirectory = path.join(process.cwd(), 'public')
  const filenames = await fs.readdir(publicDirectory)

  if (params && params.obj) {
    const queryName = typeof (params.obj) === "object" ? params.obj[0] : params.obj
    let files = filenames.filter(file => file.includes(queryName)).map(file => path.join('/', file))
    return {
      props: {
        mtlFilePath: files.filter(file => file.includes('.mtl')).map(file => path.join('/', file))[0],
        objFilePath: files.filter(file => file.includes('.obj')).map(file => path.join('/', file))[0],
        obj: queryName
      },
    }
  }
  return {
    notFound: true
  }
}

function ObjPage({ mtlFilePath, objFilePath, obj }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <PageLayout>
      <ObjPageContainer>
        <HeaderContainer>
          <h1>{obj.toUpperCase()}</h1>
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p> */}
        </HeaderContainer>
        <br />
        <ObjViewer mtlFilePath={mtlFilePath} objFilePath={objFilePath} />
        <br />
        <CarouselContainer />
      </ObjPageContainer>
    </PageLayout>
  )
}

const ObjPageContainer = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default ObjPage
