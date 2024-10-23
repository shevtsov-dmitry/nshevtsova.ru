import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import Navigation from './Navigation';

export default function Navbar() {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const SocialMediaIcons = () => {
        return (
            <div
                id="icons-holder"
                className={
                    `h-12 w-fit` +
                    ` ${isMobile ? (isBurgerOpened ? 'flex' : 'hidden') : 'flex'} ` +
                    ` ${isMobile ? 'top-0 flex-col gap-2' : 'm-3 gap-7'}`
                }
            >
                <a href={GLOBAL_VALUES.telegram} className="h-full w-full">
                    <img
                        src="images/navbar/telegram.png"
                        className="icon"
                        alt="telegram"
                    />
                </a>

                <a href={GLOBAL_VALUES.viber} className="h-full w-full">
                    <img
                        src="images/navbar/viber.png"
                        className="icon"
                        alt="viber"
                    />
                </a>

                <a href={GLOBAL_VALUES.vk} className="h-full w-full">
                    <img src="images/navbar/vk.png" className="icon" alt="vk" />
                </a>

                <a href={GLOBAL_VALUES.whatsapp} className="h-full w-full">
                    <img
                        src="images/navbar/whatsapp.png"
                        className="icon"
                        alt="whatsapp"
                    />
                </a>
            </div>
        );
    };

    return (
        <div className="flex w-full justify-center">
            <div
                className={`absolute z-10 flex w-full justify-between ${isMobile ? 'h-5 flex-wrap' : 'h-12'}`}
            >
                <div className={`${isMobile ? 'order-1 mt-0 w-[87%]' : ''}`}>
                    <Navigation font={'font-jost'} isMobile={isMobile} />

                </div>
                <div
                    id="phone-num-and-icons-holder"
                    className={`flex w-full justify-end`}
                >
                    {isMobile ? (
                        <>
                            <button
                                onClick={() =>
                                    setIsBurgerOpened(!isBurgerOpened)
                                }
                                className="absolute right-2.5 top-4 text-white hover:cursor-pointer"
                            >
                                {isBurgerOpened ? (
                                    <FaTimes size={30} />
                                ) : (
                                    <FaBars size={30} />
                                )}
                            </button>
                            <div
                                className={`${isMobile ? 'absolute top-14 mr-0.5' : 'block'}`}
                            >
                                <SocialMediaIcons />
                            </div>
                        </>
                    ) : (
                        <SocialMediaIcons />
                    )}
                </div>
            </div>
        </div>
    );
}
