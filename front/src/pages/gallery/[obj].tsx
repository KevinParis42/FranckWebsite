import ObjViewer from "@/components/ObjViewer"
import { useEffect } from "react"
import { useRouter } from 'next/router';
import PageLayout from "@/components/PageLayout";
import { promises as fs } from 'fs'


import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import path from "path";
import CarouselContainer from "@/components/Carousel";


export async function getStaticPaths() {
  return {
    paths: [
      { params: { obj: 'killerqueen' } },
      { params: { obj: 'sword' } }
    ],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async (context) => {

  const publicDirectory = path.join(process.cwd(), 'public')
  const filenames = await fs.readdir(publicDirectory)

  const files = filenames.filter(file => file.includes(context.params.obj)).map(file => path.join('/', file))

  return {
    props: { mtlFilePath: files[0], objFilePath: files[1] }, // will be passed to the page component as props
  }
}

function ObjPage({ mtlFilePath, objFilePath }: InferGetStaticPropsType<typeof getStaticProps>) {


  return (
    <PageLayout>
      <ObjViewer mtlFilePath={mtlFilePath} objFilePath={objFilePath} />
      <CarouselContainer />
    </PageLayout>
  )
}

export default ObjPage
