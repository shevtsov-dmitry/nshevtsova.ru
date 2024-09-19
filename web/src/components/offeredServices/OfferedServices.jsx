import { useSelector } from 'react-redux';
import Slide from 'react-reveal/Slide'; // Change the import to Slide
import Fade from 'react-reveal/Fade'; // Import Fade

export default function OfferedServices() {
    const IMAGES_PATH = 'images/offered-services';
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const revealDelayStepMs = 130;
    const extraFadeRevealDelayMs = 70;

    function ServiceDiv(props) {
        const TITLE = props.title;
        const DESCRIPTION_LIST = props.description;
        const IMAGE_SRC = props.icon;

        return (
            <div className="grid h-auto w-full grid-cols-4 grid-rows-3 gap-2 rounded-[0.75rem] border border-gray-300 py-[4%] pr-[5%]">
                <div className="col-span-1 row-span-1 flex h-full w-full items-center justify-center">
                    <img className="w-[60%]" src={`${IMAGE_SRC}`} />
                </div>
                <div className="col-span-3 row-span-1 flex h-full w-full items-center"> <h1 className="font-ptsans-bold text-2xl">{TITLE}</h1>
                </div>
                <div className="col-span-1 row-span-3" />
                <ul className="col-span-3 row-span-3 flex list-disc flex-col gap-2 marker:text-yellow-400">
                    {DESCRIPTION_LIST.map((text, index) => (
                        <li key={index} className="">
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="mb-[2.5%] h-fit w-full">
            <Slide left>
                <div className="flex h-1/5 items-center justify-start">
                    <h1 className="my-[2%] ml-[5%] font-ptsans-bold text-4xl">
                        ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ
                    </h1>
                </div>
            </Slide>
            <section className="grid h-4/5 w-full grid-cols-3 gap-5 px-[5%]">
                <Slide bottom delay={revealDelayStepMs * 1}>
                    <div> {/* Add a wrapper div */}
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
                    </div>
                </Slide>
                <Slide bottom delay={revealDelayStepMs * 2}>
                    <div> {/* Add a wrapper div */}
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
                    </div>
                </Slide>
                <Slide bottom delay={revealDelayStepMs * 3}>

                    <div> {/* Add a wrapper div */}
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
                    </div>
                </Slide>
                <Slide bottom delay={revealDelayStepMs * 1}>
                    <Fade delay={revealDelayStepMs * 1 + extraFadeRevealDelayMs}>
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
                </Slide>

                <Slide bottom delay={revealDelayStepMs * 2}>
                    <Fade delay={revealDelayStepMs * 2 + extraFadeRevealDelayMs}>
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
                </Slide>
                <Slide bottom delay={revealDelayStepMs * 3}>
                    <Fade delay={revealDelayStepMs * 3 + extraFadeRevealDelayMs}>
                        <ServiceDiv
                            title={'КОНСУЛЬТАЦИЯ'}
                            icon={`${IMAGES_PATH}/consult.png`}
                            description={[GLOBAL_VALUES.phoneNumber]}
                        />
                    </Fade>
                </Slide>

            </section>
        </div>
    );
}
