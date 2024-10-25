import Navigation from '../navbar/Navigation';
import SocialMediaIcons from './SocialMediaIcons';
import PhoneNumbers from './PhoneNumbers';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
                    <SocialMediaIcons
                        GLOBAL_VALUES={GLOBAL_VALUES}
                        isMobile={isMobile}
                    />
                    <img
                        src="images/footer/administrator.png"
                        className="absolute mt-28 ml-1 w-8 hover:cursor-pointer max-mobile:w-6"
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
