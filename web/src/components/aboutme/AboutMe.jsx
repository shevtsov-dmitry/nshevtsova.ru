import { Fade, Slide } from 'react-awesome-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faShieldAlt, faSearch, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function AboutMe() {
    return (
        <div className="flex justify-between w-[60%] bg-white rounded-lg">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-2 space-y-6">
                    <Fade>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Обо мне
                        </h1>
                    </Fade>

                    <Fade cascade>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Я не просто риелтор — я ваш надёжный партнёр в решении вопросов с
                            недвижимостью. Моей задачей является сделать процесс покупки или
                            продажи вашего жилья максимально комфортным и безопасным.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Опираясь на более чем 10 лет опыта, я внимательно изучу ваши
                            пожелания и помогу найти оптимальный вариант, будь то покупка
                            квартиры или её продажа. Каждая сделка — это индивидуальный подход
                            и тщательная проработка всех деталей.
                        </p>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon icon={faSearch} className="text-blue-500 text-3xl" />
                                <p className="text-gray-600">
                                    Подробный поиск объектов, учитывающий все ваши пожелания.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 text-3xl" />
                                <p className="text-gray-600">
                                    Безопасность каждой сделки благодаря моим знаниям и опыту.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon icon={faHeadset} className="text-yellow-500 text-3xl" />
                                <p className="text-gray-600">
                                    Возможность связаться со мной по вопросам сделки в любой момент.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon icon={faChartLine} className="text-purple-500 text-3xl" />
                                <p className="text-gray-600">
                                    Актуальная информация по рынку и советы для выгодных решений.
                                </p>
                            </div>
                        </div>
                    </Fade>
                    <div className={''}>
                        <u className={'hover:cursor-pointer hover:text-blue-500'}>Посмотреть сертификаты</u>
                    </div>
                </div>

                <div className="flex-1">
                    <img
                        src="images/aboutme/realtor-picture.jpg"
                        alt="Фотография Натальи"
                        className="rounded-md shadow-lg max-w-[25rem] mx-auto"
                    />
                </div>
            </div>
        </div>
    )
        ;
}
