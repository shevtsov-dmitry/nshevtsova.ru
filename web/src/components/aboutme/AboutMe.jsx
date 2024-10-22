import { Fade } from 'react-awesome-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeadset,
    faShieldAlt,
    faSearch,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AboutMe() {
    const [isCertificatesShown, setIsCertificatesShown] = useState(true);
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const Certificates = () => {
        const [certificatesBase64, setCertificatesBase64] = useState(['']);

        useEffect(() => {
            async function fetchCertificates() {
                try {
                    const res = await fetch(

                        `${GLOBAL_VALUES.serverUrl}/certificates/get/all`
                    );
                    const fetchedImagesList = await res.json();
                    setCertificatesBase64(fetchedImagesList);
                } catch (e) {
                    console.error(
                        `Error fetching Certificates because of ${e.message}`
                    );
                }
            }

            fetchCertificates();
        });

        return (
            <div className={'absolute h-full w-1/2 bg-amber-200'}>
                {certificatesBase64.map((value, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${value}`} />
                ))}
            </div>
        );
    };

    return (
        <div className="flex w-[60%] justify-between rounded-lg bg-white">
            {isCertificatesShown && <Certificates />}
            <div className="flex flex-col items-center gap-12 lg:flex-row">
                <div className="flex-2 space-y-6">
                    <Fade>
                        <h1 className="mb-4 text-4xl font-bold text-gray-800">
                            Обо мне
                        </h1>
                    </Fade>

                    <Fade cascade>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Я не просто риелтор — я ваш надёжный партнёр в
                            решении вопросов с недвижимостью. Моей задачей
                            является сделать процесс покупки или продажи вашего
                            жилья максимально комфортным и безопасным.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Опираясь на более чем 10 лет опыта, я внимательно
                            изучу ваши пожелания и помогу найти оптимальный
                            вариант, будь то покупка квартиры или её продажа.
                            Каждая сделка — это индивидуальный подход и
                            тщательная проработка всех деталей.
                        </p>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="text-3xl text-blue-500"
                                />
                                <p className="text-gray-600">
                                    Подробный поиск объектов, учитывающий все
                                    ваши пожелания.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon
                                    icon={faShieldAlt}
                                    className="text-3xl text-green-500"
                                />
                                <p className="text-gray-600">
                                    Безопасность каждой сделки благодаря моим
                                    знаниям и опыту.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon
                                    icon={faHeadset}
                                    className="text-3xl text-yellow-500"
                                />
                                <p className="text-gray-600">
                                    Возможность связаться со мной по вопросам
                                    сделки в любой момент.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="text-3xl text-purple-500"
                                />
                                <p className="text-gray-600">
                                    Актуальная информация по рынку и советы для
                                    выгодных решений.
                                </p>
                            </div>
                        </div>
                        <u
                            className={
                                'select-none text-2xl hover:cursor-pointer hover:text-blue-500'
                            }
                            onClick={() => setIsCertificatesShown(true)}
                        >
                            Посмотреть сертификаты
                        </u>
                    </Fade>
                </div>

                <div className="flex-1">
                    <img
                        src="images/aboutme/realtor-picture.jpg"
                        alt="Фотография Натальи"
                        className="mx-auto max-w-[25rem] rounded-md shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}
