/*
    @param font and @param textSize expected like tailwind string
    example font = {"font-sans"} text = {"text-[2rem]"}
*/
export default function Navigation({ font, textSize }) {
    const CUSTOM_STYLE = ` ${font} ${textSize} `;
    console.log(CUSTOM_STYLE);
    return (
        <ul id="tabs-holder" className="flex items-center gap-5">
            <li className={`tab-txt ${CUSTOM_STYLE}`}>портфолио</li>
            <li className={`tab-txt ${CUSTOM_STYLE}`}>отзывы</li>
            <li className={`tab-txt mr-3 ${CUSTOM_STYLE}`}>
                цены
                <span className={`tab-txt-arrow-down ${CUSTOM_STYLE}`}>⯆</span>
            </li>
            <li className={`tab-txt mr-3 ${CUSTOM_STYLE}`}>
                услуги
                <span className={`tab-txt-arrow-down ${CUSTOM_STYLE}`}>⯆</span>
            </li>
            <li className={`tab-txt ${CUSTOM_STYLE}`}>новости</li>
        </ul>
    );
}
