import ServiceDiv from './ServiceDiv'

export default function OfferedServices() {
    const IMAGES_PATH = "images/offered-services"

    return (
        <div className='h-fit w-full mb-[2.5%]'>
            <div className='h-1/5 flex items-center justify-start'>
                <h1 className="ml-[5%] font-ptsans-bold text-4xl my-[2%]">ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ</h1>
            </div>
            <section className="grid w-full grid-cols-3 gap-5 px-[5%] h-4/5">
                <ServiceDiv
                    title={'ПОКУПКА'}
                    icon={`${IMAGES_PATH}/house-key.png`}
                    description={[
                        'Подбор идеальной недвижимости',
                        'Сопровождение сделки на каждом этапе',
                        'Юридическая проверка документов',
                        'Переговоры с продавцами',
                    ]}
                />
                <ServiceDiv
                    title={'ПРОДАЖА'}
                    icon={`${IMAGES_PATH}/house.png`}
                    description={[
                        'Оценка рыночной стоимости',
                        'Подготовка к продаже',
                        'Маркетинг и реклама',
                        'Проведение показов',
                    ]}
                />
                <ServiceDiv
                    title={'ПОИСК НЕДВИЖИМОСТИ'}
                    icon={`${IMAGES_PATH}/find-house.png`}
                    description={[
                        'Поиск по заданным критериям',
                        'Консультации по районам',
                        'Организация просмотров',
                        'Анализ рынка недвижимости',
                    ]}
                />
                <ServiceDiv
                    title={'АРЕНДА'}
                    icon={`${IMAGES_PATH}/rent.png`}
                    description={[
                        'Поиск долгосрочной аренды',
                        'Оформление договоров',
                        'Консультации по аренде',
                        'Подбор арендаторов',
                    ]}
                />
                <ServiceDiv
                    title={'ПОМОЩЬ В ОФОРМЛЕНИИ'}
                    icon={`${IMAGES_PATH}/document.png`}
                    description={[
                        'Сбор необходимых документов',
                        'Юридическое сопровождение',
                        'Оформление ипотеки',
                        'Консультации по налогам',
                    ]}
                />
                <ServiceDiv
                    title={'КОНСУЛЬТАЦИЯ'}
                    icon={`${IMAGES_PATH}/consult.png`}
                    description={["+7 (903) 733-57-57",]}
                />
            </section>
        </div>
    )
}
