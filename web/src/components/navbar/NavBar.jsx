export default function NavBar() {
    return <div className="z-10 w-full bg-red-300 h-[5rem] flex justify-between items-center">
        {/* ⮟   ⯆  */}
        <ul id="navBarTabs" className="flex gap-2">
            <li className="navBarTab">Портфолио</li>
            <li className="navBarTab">отзывы</li>
            <li className="navBarTab">
                цены <span className="navTabArrowDown">⯆</span>
            </li>
            <li className="navBarTab">
                услуги<span className="navTabArrowDown">⯆</span>
            </li>
            <li className="navBarTab">новости</li>
        </ul>

        <div id="phone-number-and-icons" className="flex">
            <p>+7 (903) 733-57-57</p>
            <ul id="icons" className="flex">
                <img src="images/navbar/telegram.png" className="socialMediaIcon" />
                <img src="images/navbar/viber.png" className="socialMediaIcon" />
                <img src="images/navbar/vk.png" className="socialMediaIcon" />
                <img src="images/navbar/whatsapp.png" className="socialMediaIcon" />
            </ul>
        </div>

    </div >
}
