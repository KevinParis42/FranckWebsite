import PageLayout from "@/containers/PageLayout"
import { devices } from "@/sizes"
import { NextPage } from "next"
import styled from "styled-components"


const AboutMe: NextPage = () => {

    return (
        <PageLayout>
            <GalleryDiv>
                <TitleDiv>
                    <GalleryTitle>A PROPOS DE MOI</GalleryTitle>
                    <hr />
                </TitleDiv>

            </GalleryDiv>
        </PageLayout>
    )
}

export default AboutMe

const GalleryDiv = styled.div`
  min-height: 60vh;
  min-width: 250px;
  margin: 2vh 4vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  border-radius: 20px;
  background: rgb(42,112,248);
  background: linear-gradient(37deg, rgba(42,112,248,1) 10%, rgba(126,73,193,1) 90%);
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
