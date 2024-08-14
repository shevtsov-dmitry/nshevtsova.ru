import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';

export default function Navbar() {
    const [heightCSS, setHeightCSS] = useState('h-12');
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    return (
        <div
            className={`${heightCSS} absolute z-10 mt-[1%] flex w-full justify-between bg-purple-700`}
        >
            <div className="ml-[4%] mt-[0.15rem]">
                <Navigation textSize={'text-3xl'} font={'font-jost'} />
            </div>
            <div
                id="phone-num-and-icons-holder"
                className="mr-[4%] flex items-center gap-7"
            >
                <div id="phone-number-holder" className="mb-[-3px]">
                    <u className="phone-number-ul">
                        <p
                            className="phone-number-p text-sm"
                            onClick={(el) => {
                                navigator.clipboard.writeText(
                                    el.currentTarget.textContent
                                );
                            }}
                        >
                            {GLOBAL_VALUES.phoneNumber}
                        </p>
                    </u>
                </div>

                <div id="icons-holder" className={`${heightCSS} flex gap-7`}>
                    <img
                        src="images/navbar/telegram.png"
                        className="icon"
                        alt="telegram"
                    />
                    <img
                        src="images/navbar/viber.png"
                        className="icon"
                        alt="viber"
                    />
                    <img src="images/navbar/vk.png" className="icon" alt="vk" />
                    <img
                        src="images/navbar/whatsapp.png"
                        className="icon"
                        alt="whatsapp"
                    />
                </div>
            </div>
        </div>
    );
}
