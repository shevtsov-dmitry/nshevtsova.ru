export default function Navbar() {
    return <div className="absolute w-full h-12 bg-red-300 z-10 flex justify-between">
        <ul id="tabs-holder" className="flex gap-3 items-center">
            <li className="tab-txt">портфолио</li>
            <li className="tab-txt">отзывы</li>
            <li className="tab-txt">
                цены<span className="tab-txt-arrow-down">⯆</span>
            </li>
            <li className="tab-txt">
                услуги<span className="tab-txt-arrow-down">⯆</span>
            </li>
            <li className="tab-txt">новости</li>
        </ul>
        <div id="phone-num-and-icons-holder">
            <p id="phone-number" className=""></p>
            <div id="icons-holder" className="flex gap-3">
                <img src="images/navbar/telegram.png" className="icon" alt="telegram" />
                <img src="images/navbar/viber.png" className="icon" alt="viber" />
                <img src="images/navbar/nt.png" className="icon" alt="vk" />
                <img src="images/navbar/whatsapp.png" className="icon" alt="whatsapp" />
            </div>
        </div>

    </div>
}

