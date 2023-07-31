import { Carousel, Image } from 'antd'
import React from 'react'
import styled from 'styled-components'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type imageType = {
    id: number,
    name: string,
    imagePath: string,
    projectId: number,
    createdAt: Date,
    updatedAt: Date
}

const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    textAlign: 'center',
}

const CarouselContainer: React.FC<{ images: imageType[] }> = ({ images }) => (
    <CarouselStyledDiv id='carousel-container'>
        <Carousel autoplay>
            {images && images.map(image =>
                <div>
                    <div style={contentStyle}>
                        <Image src={`${BACKEND_URL}/${image.imagePath}`} height={'100%'} alt='baka' />
                    </div>
                </div>
            )}
        </Carousel>
    </CarouselStyledDiv>
)

const CarouselStyledDiv = styled.div`
    width: 90%
`

export default CarouselContainer
