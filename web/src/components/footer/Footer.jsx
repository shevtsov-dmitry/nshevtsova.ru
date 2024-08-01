import { useSelector } from 'react-redux';
import Navigation from '../navbar/Navigation';

function PhoneNumber({ GLOBAL_VALUES }) {
    return (
        <div id="phone-number" className="flex items-center gap-3">
            <img src="images/footer/phone.png" className="w-[2.5%]" />
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
    const ICON_STYLE = 'w-12';
    const IMAGES_PATH = 'images/footer';
    return (
        <div className="flex gap-2">
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
        <footer className="h-96 w-full bg-neutral-900">
            <PhoneNumber GLOBAL_VALUES={GLOBAL_VALUES} />
            <SocialMedias GLOBAL_VALUES={GLOBAL_VALUES} />
            <div className="scale-75">
                <Navigation font={'font-sans'} textSize={'text-[1.5rem]'} />
            </div>
        </footer>
    );
}
