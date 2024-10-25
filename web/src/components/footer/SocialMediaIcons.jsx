import { useSelector } from 'react-redux';

export default function SocialMediaIcons() {
    const isMobile = window.innerWidth <= 768;
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
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
