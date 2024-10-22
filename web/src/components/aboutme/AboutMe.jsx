import { Fade, Slide } from 'react-awesome-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faHeadset,
    faSearch,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UploadCertificateForm from './UploadCertificateForm.jsx';
import Certificates from './Certificates.jsx';

export default function AboutMe() {
    const isAdmin = true; // TODO make role with auth
    const [isCertificatesShown, setIsCertificatesShown] = useState(false);
    const [isFormShown, setIsFormShown] = useState(false);

    // Adding screen size detection for mobile adaptation
    const isMobile = window.innerWidth <= 768;

    return (
        <>
            {isCertificatesShown && (
                <div className={'absolute z-20 h-full flex flex-col items-center justify-center'}>
                    <Certificates
                        setIsCertificatesShown={setIsCertificatesShown}
                    />
                </div>
            )}
            <div className={`flex ${isMobile ? 'w-full' : 'w-[60%]'} justify-between rounded-lg bg-white`}>
                <div className={'z-10'}></div>
                <div className={`flex flex-col items-center gap-12 ${isMobile ? 'flex-col' : 'lg:flex-row'}`}>
                    <div className="flex-2 space-y-6">
                        <div className={'flex gap-5'}>
                            <Fade>
                                <h1 className={`mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-gray-800`}>
                                    Обо мне
                                </h1>
                            </Fade>
                            <Slide direction={'right'}>
                                <button
                                    onClick={() => setIsFormShown(true)}
                                    className="admin-upload-button"
                                >
                                    Добавить сертификат
                                </button>
                            </Slide>
                            {isAdmin && isFormShown && (
                                <Fade duration={250} className={'z-50'}>
                                    <UploadCertificateForm
                                        setIsFormShown={setIsFormShown}
                                    />
                                </Fade>
                            )}
                        </div>
                        <Fade cascade>
                            <p className={`leading-relaxed text-gray-600 ${isMobile ? 'text-base' : 'text-lg'}`}>
                                Я не просто риелтор — я ваш надёжный партнёр в
                                решении вопросов с недвижимостью. Моей задачей
                                является сделать процесс покупки или продажи
                                вашего жилья максимально комфортным и
                                безопасным.
                            </p>
                            <p className={`leading-relaxed text-gray-600 ${isMobile ? 'text-base' : 'text-lg'}`}>
                                Опираясь на более чем 10 лет опыта, я
                                внимательно изучу ваши пожелания и помогу найти
                                оптимальный вариант, будь то покупка квартиры
                                или её продажа. Каждая сделка — это
                                индивидуальный подход и тщательная проработка
                                всех деталей.
                            </p>

                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={`text-${isMobile ? '2xl' : '3xl'} text-blue-500`}
                                    />
                                    <p className="text-gray-600">
                                        Подробный поиск объектов, учитывающий
                                        все ваши пожелания.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faShieldAlt}
                                        className={`text-${isMobile ? '2xl' : '3xl'} text-green-500`}
                                    />
                                    <p className="text-gray-600">
                                        Безопасность каждой сделки благодаря
                                        моим знаниям и опыту.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faHeadset}
                                        className={`text-${isMobile ? '2xl' : '3xl'} text-yellow-500`}
                                    />
                                    <p className="text-gray-600">
                                        Возможность связаться со мной по
                                        вопросам сделки в любой момент.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faChartLine}
                                        className={`text-${isMobile ? '2xl' : '3xl'} text-purple-500`}
                                    />
                                    <p className="text-gray-600">
                                        Актуальная информация по рынку и советы
                                        для выгодных решений.
                                    </p>
                                </div>
                            </div>
                            <button
                                className={
                                    'z-10 select-none text-2xl underline hover:cursor-pointer hover:text-blue-500'
                                }
                                onClick={() =>
                                    isCertificatesShown
                                        ? setIsCertificatesShown(false)
                                        : setIsCertificatesShown(true)
                                }
                            >
                                Посмотреть сертификаты
                            </button>
                        </Fade>
                    </div>

                    <div className="flex-1">
                        <img
                            src="images/aboutme/realtor-picture.jpg"
                            alt="Фотография Натальи"
                            className={`mx-auto ${isMobile ? 'max-w-[18rem]' : 'max-w-[25rem]'} rounded-md shadow-lg`}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
