import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const [heightCSS, setHeightCSS] = useState('h-12')
    const GLOBAL_VALUES = useSelector(state => state.globalStringValues)

    return (
        <div
            className={`${heightCSS} absolute z-10 mt-[1%] flex w-full justify-between`}
        >
            <ul id="tabs-holder" className="ml-[4%] flex items-center gap-5">
                <li className="tab-txt">портфолио</li>
                <li className="tab-txt">отзывы</li>
                <li className="tab-txt mr-3">
                    цены<span className="tab-txt-arrow-down">⯆</span>
                </li>
                <li className="tab-txt mr-3">
                    услуги<span className="tab-txt-arrow-down">⯆</span>
                </li>
                <li className="tab-txt">новости</li>
            </ul>
            <div
                id="phone-num-and-icons-holder"
                className="mr-[4%] flex items-center gap-7"
            >
                <div id="phone-number-holder" className='mb-[-3px]'>
                    <u className="phone-number-ul">
                        <p className="phone-number-p text-sm"
                            onClick={el => {
                                navigator.clipboard.writeText(el.currentTarget.textContent)
                            }}>
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
                    <img src="images/navbar/viber.png" className="icon" alt="viber" />
                    <img src="images/navbar/vk.png" className="icon" alt="vk" />
                    <img
                        src="images/navbar/whatsapp.png"
                        className="icon"
                        alt="whatsapp"
                    />
                </div>
            </div>
        </div>
    )
}
