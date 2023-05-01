import ObjViewer from "@/components/ObjViewer";
import PageLayout from "@/components/PageLayout";
import { promises as fs } from 'fs';
import CarouselContainer from "@/components/Carousel";
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import path from "path";
import styled from 'styled-components'
import Title from "antd/es/typography/Title";


export async function getStaticPaths() {
  return {
    paths: [
      { params: { obj: 'killerqueen' } },
      { params: { obj: 'sword' } }
    ],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const publicDirectory = path.join(process.cwd(), 'public')
  const filenames = await fs.readdir(publicDirectory)

  if (params && params.obj) {
    const queryName = typeof (params.obj) === "object" ? params.obj[0] : params.obj
    const files = filenames.filter(file => file.includes(queryName)).map(file => path.join('/', file))
    return {
      props: { mtlFilePath: files[0], objFilePath: files[1], obj: queryName }, // will be passed to the page component as props
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
          <Title>{obj.toUpperCase()}</Title>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
        </HeaderContainer>
        <br/>
        <ObjViewer mtlFilePath={mtlFilePath} objFilePath={objFilePath} />
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
