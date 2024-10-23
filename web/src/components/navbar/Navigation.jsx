import { Link } from 'react-scroll';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';

export default function Navigation({ isFooter }) {
    const isMobile = window.innerWidth <= 768;

    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const PhoneNumber = () => {
        const [saveNumberNotification, setSaveNumberNotification] =
            useState(false);

        function copyPhoneNumber(el) {
            navigator.clipboard.writeText(el.currentTarget.textContent);
            setSaveNumberNotification(true);
            setTimeout(() => setSaveNumberNotification(false), 2000);
        }

        return (
            <div
                id="phone-number-holder"
                className={`${isMobile ? 'relative h-fit w-fit text-center' : ''}`}
            >
                <button
                    className={`${isMobile ? 'text-xs' : 'text-sm'} text-nowrap text-white underline`}
                    onClick={copyPhoneNumber}
                >
                    {GLOBAL_VALUES.phoneNumber}
                </button>
                {saveNumberNotification && (
                    <div className={'saved-message max-mobile:text-sm'}>
                        номер сохранён
                    </div>
                )}
            </div>
        );
    };

    return (
        <ul
            id="tabs-holder"
            className={`ml-5 flex items-center font-jost ${isMobile ? 'mt-1 flex-wrap items-center gap-x-3 gap-y-0' : 'gap-5'}`}
        >
            <Link
                to="portfolio"
                smooth={true}
                duration={500}
                className={`${isFooter ? 'footer-label' : 'nav-bar-label'}`}
            >
                портфолио
            </Link>
            <li className={`${isMobile ? 'mr-2.5' : 'mr-4'} flex items-center`}>
                <Link
                    to="offered-services"
                    smooth={true}
                    duration={500}
                    className={`${isFooter ? 'footer-label' : 'nav-bar-label'}`}
                >
                    услуги
                </Link>
                <div className={'relative'}>
                    {!isFooter && (
                        <FaCaretDown
                            className={`absolute text-white ${isMobile ? 'mt-[-6px]' : 'mt-[-10px]'} `}
                            size={isMobile ? 20 : 30}
                        />
                    )}
                </div>
            </li>
            <Link
                to="price-list"
                smooth={true}
                duration={500}
                className={`${isFooter ? 'footer-label' : 'nav-bar-label'}`}
            >
                цены
            </Link>
            <li className={`${isMobile ? 'mr-2.5' : 'mr-4'} flex items-center`}>
                <Link
                    to="about-me"
                    smooth={true}
                    duration={500}
                    className={`${isFooter ? 'footer-label' : 'nav-bar-label'} whitespace-nowrap`}
                >
                    обо мне
                </Link>
                <div className={'relative'}>
                    {!isFooter && (
                        <FaCaretDown
                            className={`absolute text-white ${isMobile ? 'mt-[-6px]' : 'mt-[-10px]'} `}
                            size={isMobile ? 20 : 30}
                        />
                    )}
                </div>
            </li>
            <Link
                to="reviews"
                smooth={true}
                duration={500}
                className={`${isFooter ? 'footer-label' : 'nav-bar-label'}`}
            >
                отзывы
            </Link>
            {!isFooter && (
                <div className={'mb-[-8px] max-mobile:mb-[-3px]'}>
                    <PhoneNumber />
                </div>
            )}
        </ul>
    );
}
