/*
    @param font and @param textSize expected like tailwind string
    example font = {"font-sans"} text = {"text-[2rem]"} isFooter={true}
*/
export default function Navigation({ font, textSize, isFooter }) {
    let CUSTOM_STYLE = ` ${font} ${textSize} `;
    if (isFooter) {
        CUSTOM_STYLE += 'underline';
    }
    return (
        <ul id="tabs-holder" className="flex items-center gap-5">
            <li className={`tab-txt ${CUSTOM_STYLE}`}>портфолио</li>
            <li className={`tab-txt ${CUSTOM_STYLE}`}>отзывы</li>
            <li className={`tab-txt ${CUSTOM_STYLE} ${!isFooter && 'mr-3'}`}>
                цены
                {!isFooter && <span className={`tab-txt-arrow-down`}>⯆</span>}
            </li>
            <li className={`tab-txt ${CUSTOM_STYLE} ${!isFooter && 'mr-3'}`}>
                услуги
                {!isFooter && <span className={`tab-txt-arrow-down`}>⯆</span>}
            </li>
            <li className={`tab-txt ${CUSTOM_STYLE}`}>новости</li>
        </ul>
    );
}
