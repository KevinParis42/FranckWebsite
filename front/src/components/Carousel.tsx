import React from 'react';
import { Carousel, Image } from 'antd';


const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    textAlign: 'center',
};

const CarouselContainer: React.FC = () => (
    <div id='carousel-container' style={{ width: '90%' }}>
        <Carousel autoplay>
            <div>
                <div style={contentStyle}>
                    <Image src='/shellswordface.png' height={'100%'} alt='baka' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <Image src='/shellswordSide1.png' height={'100%'} alt='baka' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <Image src='/shellswordSide2.png' height={'100%'} alt='baka' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <Image src='/shellswordBack.png' height={'100%'} alt='baka' />
                </div>
            </div>
        </Carousel>
    </div>
);

export default CarouselContainer;
