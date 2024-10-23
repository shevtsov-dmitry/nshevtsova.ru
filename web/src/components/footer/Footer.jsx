import Navigation from '../navbar/Navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function PhoneNumbers({ GLOBAL_VALUES, isMobile }) {
    const [saveNumberNotification, setSaveNumberNotification] = useState(false);

    function copyPhoneNumber(el) {
        navigator.clipboard.writeText(el.currentTarget.textContent);
        saveHideSaveNumberNotification();
    }

    function saveHideSaveNumberNotification() {
        setSaveNumberNotification(true);
        setTimeout(() => setSaveNumberNotification(false), 2000);
    }

    return (
        <div
            id="phone-number"
            className={`flex items-center gap-3 ${isMobile ? 'flex-col items-start' : ''}`}
        >
            <img
                src="images/footer/phone.png"
                className={`w-[17%] ${isMobile ? 'w-[25%]' : ''}`}
            />
            <div className="flex flex-col gap-1">
                <div className="phone-number-ul">
                    <button
                        className="phone-number-p underline"
                        onClick={copyPhoneNumber}
                    >
                        {GLOBAL_VALUES.phoneNumber}
                    </button>
                </div>
                <div className="phone-number-ul">
                    <button
                        className="phone-number-p underline"
                        onClick={copyPhoneNumber}
                    >
                        {GLOBAL_VALUES.additionalPhoneNumber}
                    </button>
                    {saveNumberNotification && (
                        <div className={'saved-message'}>номер сохранён</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SocialMedias({ GLOBAL_VALUES, isMobile }) {
    const ICON_STYLE = `w-10 hover:scale-105 transition-all ${isMobile ? 'w-8' : ''}`;
    const IMAGES_PATH = 'images/footer';
    return (
        <div className={`flex gap-6 ${isMobile ? 'gap-4' : ''}`}>
            <a href={GLOBAL_VALUES.vk}>
                <img
                    src={`${IMAGES_PATH}/vk.png`}
                    className={`${ICON_STYLE}`}
                />
            </a>
            <a href={GLOBAL_VALUES.viber}>
                <img
                    src={`${IMAGES_PATH}/viber.png`}
                    className={`${ICON_STYLE}`}
                />
            </a>
            <a href={GLOBAL_VALUES.whatsapp}>
                <img
                    src={`${IMAGES_PATH}/whatsapp.png`}
                    className={`${ICON_STYLE}`}
                />
            </a>
            <a href={GLOBAL_VALUES.telegram}>
                <img
                    src={`${IMAGES_PATH}/telegram.png`}
                    className={`${ICON_STYLE}`}
                />
            </a>
        </div>
    );
}

export default function Footer() {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const isMobile = window.innerWidth <= 768;

    return (
        <footer
            className={
                `h-auto w-full bg-neutral-900 py-[2%] ` +
                `max-mobile:px-4 max-mobile:py-6`
            }
        >
            <div className="flex w-full justify-center">
                <div
                    className={`flex w-[90%] items-center justify-between ${isMobile ? 'flex-col space-y-4' : ''}`}
                >
                    <PhoneNumbers
                        GLOBAL_VALUES={GLOBAL_VALUES}
                        isMobile={isMobile}
                    />
                    <Navigation isFooter={true} />
                </div>
            </div>
            <div className="mt-4 flex w-full justify-center">
                <div
                    className={`flex w-[90%] items-center justify-between ${isMobile ? 'flex-col space-y-4' : ''}`}
                >
                    <SocialMedias
                        GLOBAL_VALUES={GLOBAL_VALUES}
                        isMobile={isMobile}
                    />
                    <address
                        className={`text-white ${isMobile ? 'text-sm' : ''}`}
                    >
                        г. Воронеж, Ленинский проспект, дом 5Б, 2 подъезд, 38
                        кабинет
                    </address>
                    <p
                        className={`text-white ${isMobile ? 'text-left text-sm' : 'text-end text-[0.9rem]'}`}
                    >
                        Copyright © 2024 <br />
                        Индивидуальный предприниматель <br /> Шевцова Наталья
                        Николаевна <br />
                        ИНН 123456789012 <br />
                        ОГРН 123456789012345
                    </p>
                </div>
            </div>
        </footer>
    );
}
