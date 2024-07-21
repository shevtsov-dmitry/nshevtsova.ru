import { useState } from 'react'

export default function Navbar() {
  const [h_navbar, set_h_navbar] = useState('h-12')

  return (
    <div
      className={`${h_navbar} absolute z-10 mt-[1%] flex w-full justify-between`}
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
        <p id="phone-number" className="mb-[-3px] text-sm text-white">
          +7 (903) 733-57-57
        </p>
        <div id="icons-holder" className={`${h_navbar} flex gap-7`}>
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
