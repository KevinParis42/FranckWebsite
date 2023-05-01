import React from 'react';
import { Carousel, Image } from 'antd';


const contentStyle: React.CSSProperties = {
    height: '250px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselContainer: React.FC = () => (
    <div id='carousel-container' style={{ width: '90%' }}>
        <Carousel autoplay>
            <div>
                <div style={contentStyle}>
                    <Image src='/babydick.jpg' width={'100%'} height={'100%'} alt='baka' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <Image src='/babydick.jpg' width={'100%'} height={'100%'} alt='baka' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <Image src='/babydick.jpg' width={'100%'} height={'100%'} alt='baka' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <Image src='/babydick.jpg' width={'100%'} height={'100%'} alt='baka' />
                </div>
            </div>
        </Carousel>
    </div>
);

export default CarouselContainer;
