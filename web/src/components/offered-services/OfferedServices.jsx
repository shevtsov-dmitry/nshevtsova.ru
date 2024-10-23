import { useSelector } from 'react-redux';
import { Fade, Slide } from 'react-awesome-reveal';

export default function OfferedServices() {
    const IMAGES_PATH = 'images/offered-services';
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const FADE_REVEAL_BASE_TIMING = 570;
    const isMobile = window.innerWidth <= 768;

    const ServiceDiv = ({ title, icon, description }) => {
        return (
            <div
                className={`grid h-auto w-full grid-cols-4 grid-rows-3 gap-2 rounded-[0.75rem] border border-gray-300 py-[4%] pr-[5%]`}
            >
                <div className="col-span-1 row-span-1 flex h-full w-full items-center justify-center">
                    <img className={`w-[60%]`} src={`${icon}`} />
                </div>
                <div className="col-span-3 row-span-1 flex h-full w-full items-center">
                    <h1
                        className={`font-ptsans-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}
                    >
                        {title}
                    </h1>
                </div>
                {!isMobile && <div className="col-span-1 row-span-3" />}
                <ul
                    className={
                        `col-span-3 row-span-3 flex list-disc flex-col gap-2 marker:text-yellow-400 ` +
                        `${isMobile ? 'ml-10 gap-1' : ''}`
                    }
                >
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
        <div className="h-auto w-full">
            <Slide triggerOnce>
                <div
                    className={`ml-[5%] flex h-1/5 items-center justify-start max-mobile:my-4`}
                >
                    <h1
                        className={`mb-[2%] font-ptsans-bold text-4xl max-mobile:text-2xl`}
                    >
                        ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ
                    </h1>
                </div>
            </Slide>
            <div
                className={`grid h-4/5 w-full grid-cols-3 gap-5 px-[5%] max-mobile:grid-cols-1`}
            >
                <Slide cascade={true} triggerOnce direction="up" damping={0.3}>
                    <Fade delay={FADE_REVEAL_BASE_TIMING} triggerOnce>
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
                    </Fade>
                    <Fade delay={FADE_REVEAL_BASE_TIMING} triggerOnce>
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
                    </Fade>
                    <Fade delay={FADE_REVEAL_BASE_TIMING} triggerOnce>
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
                    </Fade>
                    <Fade delay={FADE_REVEAL_BASE_TIMING} triggerOnce>
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
                    <Fade delay={FADE_REVEAL_BASE_TIMING} triggerOnce>
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
                    <Fade delay={FADE_REVEAL_BASE_TIMING} triggerOnce>
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
