import CarouselContainer from "@/components/Carousel";
import ObjViewer from "@/components/ObjViewer";
import PageLayout from "@/components/PageLayout";
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && params.obj) {
    const queryName = typeof (params.obj) === "object" ? params.obj[0] : params.obj

    const res = await fetch(`${process.env.BACKEND_URL}/project/${queryName}`)
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

  const res = await fetch(`${process.env.BACKEND_URL}/project`)
  const data = await res.json()

  const paths = data.map((project) => { return { params: { obj: project.name } } })

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
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius quisquam tenetur delectus nemo ullam aut, iusto quo dolorum reprehenderit dicta ipsam iure quod quasi totam vitae doloribus voluptates pariatur!</p> */}
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
`

export default ObjPage
