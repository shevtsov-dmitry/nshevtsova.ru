import { useState } from 'react'

export default function Navbar() {
  const [h_navbar, set_h_navbar] = useState('h-12')

  return (
    <div
      className={`${h_navbar} absolute z-10 flex w-full justify-between bg-red-300`}
    >
      <ul id="tabs-holder" className="flex items-center gap-3">
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
      <div id="phone-num-and-icons-holder" className="flex items-center gap-7">
        <p id="phone-number" className="text-sm">
          +7 (903) 733-57-57
        </p>
        <div
          id="icons-holder"
          className={`${h_navbar} flex w-[150%] justify-around`}
        >
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
