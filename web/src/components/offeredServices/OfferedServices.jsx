import ServiceBlock from './ServiceBlock'

export default function OfferedServices() {
  return (
    <section className="grid h-screen w-screen grid-cols-3 gap-5 p-5">
      <ServiceBlock
        title={'ПОКУПКА'}
        icon={'images/offered-services/house-key.png'}
        description={[
          'Подбор идеальной недвижимости',
          'Сопровождение сделки на каждом этапе',
          'Юридическая проверка документов',
          'Переговоры с продавцами',
        ]}
      />
      <ServiceBlock
        title={'ПРОДАЖА'}
        icon={'images/offered-services/house.png'}
        description={[
          'Оценка рыночной стоимости',
          'Подготовка к продаже',
          'Маркетинг и реклама',
          'Проведение показов',
        ]}
      />
      <ServiceBlock
        title={'ПОИСК НЕДВИЖИМОСТИ'}
        icon={'images/offered-services/find-house1.png'}
        description={[
          'Поиск по заданным критериям',
          'Консультации по районам',
          'Организация просмотров',
          'Анализ рынка недвижимости',
        ]}
      />
      <ServiceBlock
        title={'АРЕНДА'}
        icon={'images/offered-services/rent1.png'}
        description={[
          'Поиск долгосрочной аренды',
          'Оформление договоров',
          'Консультации по аренде',
          'Подбор арендаторов',
        ]}
      />
      <ServiceBlock
        title={'ПОМОЩЬ В ОФОРМЛЕНИИ'}
        icon={'images/offered-services/document.png'}
        description={[
          'Сбор необходимых документов',
          'Юридическое сопровождение',
          'Оформление ипотеки',
          'Консультации по налогам',
        ]}
      />
      <ServiceBlock
        title={'КОНСУЛЬТАЦИЯ'}
        icon={'images/offered-services/consult.png'}
        description={[]}
      />
    </section>
  )
}
