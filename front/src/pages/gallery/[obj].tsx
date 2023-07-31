import CarouselContainer from "@/components/Carousel"
import ObjViewer from "@/components/ObjViewer"
import PageLayout from "@/containers/PageLayout"
import { projectType } from '@/types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import styled from 'styled-components'

const BACKEND_URL = process.env.BACKEND_URL

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && params.obj) {
    const queryName = typeof (params.obj) === "object" ? params.obj[0] : params.obj

    const res = await fetch(`${BACKEND_URL}/project/${queryName}`)
    const data = await res.json()

    return {
      props: {
        obj: queryName,
        images: data.images
      },
      revalidate: 10
    }
  }
  return {
    notFound: true
  }
}

export async function getStaticPaths() {

  const res = await fetch(`${BACKEND_URL}/project`)
  const data = await res.json()

  const paths = data.map((project: projectType) => {
    return {
      params: { obj: project.name }
    }
  })

  return {
    paths: paths,
    fallback: 'blocking'
  }
}



function ObjPage({ obj, images }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <PageLayout>
      <ObjPageContainer>
        <HeaderContainer>
          <h1>{obj.toUpperCase()}</h1>
        </HeaderContainer>
        <br />
        <ObjViewer projectName={obj} />
        <br />
        <CarouselContainer images={images} />
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
  font-family: 'ArcaneNine';
`

export default ObjPage
