import { Link } from 'react-scroll'; // Use react-scroll for smooth scrolling

export default function Navigation({ font, textSize, isFooter }) {
    let CUSTOM_STYLE = ` ${font} ${textSize} `;
    if (isFooter) {
        CUSTOM_STYLE += 'underline';
    }

    return (
        <ul
            id="tabs-holder"
            className="flex items-center gap-5 max-mobile:gap-2 max-mobile:text-sm"
        >
        <li className={`tab-txt ${CUSTOM_STYLE}`}>
            <Link to="portfolio" smooth={true} duration={500}>портфолио</Link>
        </li>
            <li className={`tab-txt ${CUSTOM_STYLE} ${!isFooter && 'mr-3'}`}>
                <Link to="offered-services" smooth={true} duration={500}>услуги</Link>
                {!isFooter && <span className={`tab-txt-arrow-down`}>⯆</span>}
            </li>
            <li className={`tab-txt ${CUSTOM_STYLE} ${!isFooter && 'mr-3'}`}>
                <Link to="price-list" smooth={true} duration={500}>цены</Link>
                {!isFooter && <span className={`tab-txt-arrow-down`}>⯆</span>}
            </li>
            {/* <li className={`tab-txt ${CUSTOM_STYLE}`}>
                <Link to="hot-offers" smooth={true} duration={500}>горячие предложения</Link>
            </li> */}
            <li className={`tab-txt ${CUSTOM_STYLE}`}>
                <Link to="about-me" smooth={true} duration={500}>обо мне</Link>
            </li>
            <li className={`tab-txt ${CUSTOM_STYLE}`}>
                <Link to="reviews" smooth={true} duration={500}>отзывы</Link>
            </li>
        </ul>
    );
}
