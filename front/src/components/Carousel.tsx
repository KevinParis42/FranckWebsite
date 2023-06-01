import React from 'react';
import { Carousel, Image } from 'antd';

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
};

const CarouselContainer: React.FC<{ images: imageType[] }> = ({ images }) => (
    <div id='carousel-container' style={{ width: '90%' }}>
        <Carousel autoplay>
            {images && images.map(image =>
                <div>
                    <div style={contentStyle}>
                        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.imagePath}`} height={'100%'} alt='baka' />
                    </div>
                </div>
            )}
        </Carousel>
    </div>
);

export default CarouselContainer;
