import { useSelector } from 'react-redux';
import Navigation from '../navbar/Navigation';

function PhoneNumber({ GLOBAL_VALUES }) {
    return (
        <div id="phone-number" className="flex items-center gap-3">
            <img src="images/footer/phone.png" className="w-[17%]" />
            <div className="flex flex-col gap-1">
                <u className="phone-number-ul">
                    <p
                        className="phone-number-p"
                        onClick={(el) => {
                            navigator.clipboard.writeText(
                                el.currentTarget.textContent
                            );
                        }}
                    >
                        {GLOBAL_VALUES.phoneNumber}
                    </p>
                </u>
                <u className="phone-number-ul">
                    <p
                        className="phone-number-p"
                        onClick={(el) => {
                            navigator.clipboard.writeText(
                                el.currentTarget.textContent
                            );
                        }}
                    >
                        {GLOBAL_VALUES.additionalPhoneNumber}
                    </p>
                </u>
            </div>
        </div>
    );
}

function SocialMedias({ GLOBAL_VALUES }) {
    const ICON_STYLE = 'w-10 hover:scale-105 transition-all';
    const IMAGES_PATH = 'images/footer';
    return (
        <div className="flex gap-6">
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

    return (
        <footer className="h-auto w-full bg-neutral-900 py-[2%]">
            <div className="flex w-full justify-center">
                <div className="flex w-[90%] items-center justify-between">
                    <PhoneNumber GLOBAL_VALUES={GLOBAL_VALUES} />
                    <Navigation
                        font={'font-sans'}
                        textSize={'text-[1rem]'}
                        isFooter={true}
                    />
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="flex w-[90%] items-center justify-between">
                    <SocialMedias GLOBAL_VALUES={GLOBAL_VALUES} />
                    <address className="text-white">
                        г. Воронеж, Ленинский проспект, дом 5Б, 2 подъезд, 38
                        кабинет
                    </address>
                    <p className="text-end text-[0.9rem] text-white">
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
