import React from 'react';
import { Slide } from 'react-awesome-reveal';

const PriceList = () => {
    const services = [
        { title: 'Стоимость услуг при покупке новостройки', price: '2%' },
        {
            title: 'Стоимость услуг при продаже квартиры',
            price: '2% (от 180 000 ₽)'
        },
        {
            title: 'Стоимость услуг при покупке вторичного жилья',
            price: '2% (от 180 000 ₽)'
        },
        {
            title: 'Покупка квартиры по ипотеке, жилищному сертификату, субсидии',
            price: '2% (от 190 000 ₽)'
        },
        {
            title: 'Альтернативная сделка, обмен квартир',
            price: '2% (от 240 000 ₽)'
        }
    ];

    const PriceBlock = ({ service, isMobile }) => {
        return (
            <div
                className={`flex items-center justify-between rounded-lg bg-white p-6 shadow-md max-mobile:px-6 max-mobile:py-2 ${isMobile ? 'flex-col items-start space-y-2' : ''}`}
            >
                <span
                    className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}
                >
                    {service.title}
                </span>
                <span
                    className={`font-semibold text-yellow-600 ${isMobile ? 'text-base' : 'text-lg'}`}
                >
                    {service.price}
                </span>
            </div>
        );
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <div
            className={`flex h-auto flex-col items-center bg-[#E9E7E7] py-[4%] max-mobile:px-4 max-mobile:py-10`}
        >
            <Slide direction="up">
                <h1
                    className={`mb-8 font-ptsans-bold text-4xl font-bold max-mobile:text-2xl`}
                >
                    ЦЕНЫ НА РИЕЛТОРСКИЕ УСЛУГИ
                </h1>
            </Slide>
            <div className="w-full max-w-4xl space-y-4">
                {services.map((service, index) => (
                    <Slide
                        direction={index % 2 === 0 ? 'left' : 'right'}
                        key={index}
                    >
                        <PriceBlock service={service} isMobile={isMobile} />
                    </Slide>
                ))}
            </div>
        </div>
    );
};

export default PriceList;
