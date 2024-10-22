import { useSelector } from 'react-redux';
import { Fade, Slide } from 'react-awesome-reveal'; // Change the import to Slide
import { useEffect, useState } from 'react';

export default function OfferedServices() {
    const IMAGES_PATH = 'images/offered-services';
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const FADE_REVEAL_BASE_TIMING = 570;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const ServiceDiv = ({ title, icon, description }) => {
        return (
            <div className={`grid h-auto w-full grid-cols-4 grid-rows-3 gap-2 rounded-[0.75rem] border border-gray-300 py-[4%] pr-[5%] ${isMobile ? 'grid-cols-1 grid-rows-none py-[2%] pr-[2%]' : ''}`}>
                <div className="col-span-1 row-span-1 flex h-full w-full items-center justify-center">
                    <img className={`${isMobile ? 'w-[40%]' : 'w-[60%]'}`} src={`${icon}`} />
                </div>
                <div className="col-span-3 row-span-1 flex h-full w-full items-center">
                    <h1 className={`font-ptsans-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>{title}</h1>
                </div>
                {!isMobile && <div className="col-span-1 row-span-3" />}
                <ul className={`col-span-3 row-span-3 flex list-disc flex-col gap-2 marker:text-yellow-400 ${isMobile ? 'gap-1' : ''}`}>
                    {description.map((text, index) => (
                        <li key={index} className="">
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="mb-[2.5%] h-fit w-full">
            <Slide triggerOnce>
                <div className="flex h-1/5 items-center justify-start ${isMobile ? 'ml-[2%]' : 'ml-[5%]'}">
                    <h1 className={`my-[2%] font-ptsans-bold ${isMobile ? 'text-3xl' : 'text-4xl'}`}>ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ</h1>
                </div>
            </Slide>
            <div className={`grid h-4/5 w-full gap-5 px-[5%] ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                <Slide cascade={isMobile ? false : true} triggerOnce direction="up" damping={0.3}>
                    <ServiceDiv
                        title={'ПОКУПКА'}
                        icon={`${IMAGES_PATH}/house-key.png`}
                        description={[
                            'Подбор идеальной недвижимости',
                            'Сопровождение сделки на каждом этапе',
                            'Юридическая проверка документов',
                            'Переговоры с продавцами'
                        ]}
                    />
                    <ServiceDiv
                        title={'ПРОДАЖА'}
                        icon={`${IMAGES_PATH}/deal.png`}
                        description={[
                            'Оценка рыночной стоимости',
                            'Подготовка к продаже',
                            'Маркетинг и реклама',
                            'Проведение показов'
                        ]}
                    />
                    <ServiceDiv
                        title={'ПОИСК НЕДВИЖИМОСТИ'}
                        icon={`${IMAGES_PATH}/find-house.png`}
                        description={[
                            'Поиск по заданным критериям',
                            'Консультации по районам',
                            'Организация просмотров',
                            'Анализ рынка недвижимости'
                        ]}
                    />
                    <Fade delay={1 * FADE_REVEAL_BASE_TIMING} triggerOnce>
                        <ServiceDiv
                            title={'АРЕНДА'}
                            icon={`${IMAGES_PATH}/rent.png`}
                            description={[
                                'Поиск долгосрочной аренды',
                                'Оформление договоров',
                                'Консультации по аренде',
                                'Подбор арендаторов'
                            ]}
                        />
                    </Fade>
                    <Fade delay={2 * FADE_REVEAL_BASE_TIMING} triggerOnce>
                        <ServiceDiv
                            title={'ПОМОЩЬ В ОФОРМЛЕНИИ'}
                            icon={`${IMAGES_PATH}/document.png`}
                            description={[
                                'Сбор необходимых документов',
                                'Юридическое сопровождение',
                                'Оформление ипотеки',
                                'Консультации по налогам'
                            ]}
                        />
                    </Fade>
                    <Fade delay={3 * FADE_REVEAL_BASE_TIMING} triggerOnce>
                        <ServiceDiv
                            title={'КОНСУЛЬТАЦИЯ'}
                            icon={`${IMAGES_PATH}/consult.png`}
                            description={[GLOBAL_VALUES.phoneNumber]}
                        />
                    </Fade>
                </Slide>
            </div>
        </div>
    );
}