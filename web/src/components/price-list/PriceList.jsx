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

    const PriceBlock = ({ service }) => {
        return (
            <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
                <span className="text-lg font-semibold">{service.title}</span>
                <span className="text-lg font-semibold text-yellow-600">
                    {service.price}
                </span>
            </div>
        );
    };

    // bg-[]
    return (
        <div className="flex h-auto flex-col items-center bg-[#E9E7E7] py-[3%]">
            <Slide direction="up">
                <h1 className="mb-8 font-ptsans-bold text-4xl font-bold">
                    Прайс-лист на риэлторские услуги
                </h1>
            </Slide>
            <div className="w-full max-w-4xl space-y-4">
                {services.map((service, index) =>
                    index % 2 == 0 ? (
                        <Slide direction="left" key={index}>
                            <PriceBlock service={service} />
                        </Slide>
                    ) : (
                        <Slide direction="right" key={index}>
                            <PriceBlock service={service} />
                        </Slide>
                    )
                )}
            </div>
        </div>
    );
};

export default PriceList;
