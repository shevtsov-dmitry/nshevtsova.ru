import { Fade, Slide } from 'react-awesome-reveal';

export default function Preview() {
    const initialFadeDelayMs = 750;
    const fadeRevealDelayStepMs = 200;
    const isMobile = window.innerWidth <= 768;

    return (
        <div
            className={
                `mb-[2%] flex h-screen w-full items-center bg-[url('/images/preview/new-preview.jpg')] bg-cover ` +
                `${isMobile && 'mb-7 flex-col bg-[-120px_center]'}`
            }
        >
            <div className={`${isMobile ? 'flex-[0]' : 'flex-[4]'}`} />
            <div
                className={
                    `flex w-full flex-col gap-5 text-center font-andika-bold ` +
                    `${isMobile ? 'flex-[10] justify-end p-3' : 'flex-[5]'}`
                }
            >
                <Fade direction="down" delay={200}>
                    <h1
                        className={`text-white ${isMobile ? 'rounded bg-black bg-opacity-50 text-3xl' : 'text-6xl'}`}
                    >
                        ВАШ НАДЁЖНЫЙ РИЕЛТОР
                    </h1>
                </Fade>
                <Fade direction="down" delay={400}>
                    <h1
                        className={`${isMobile ? 'rounded bg-black bg-opacity-50 text-3xl' : 'text-6xl'} text-white`}
                    >
                        НАТАЛЬЯ ШЕВЦОВА
                    </h1>
                </Fade>
                <ul className={`flex flex-col gap-3 text-nowrap`}>
                    <Fade
                        delay={initialFadeDelayMs + fadeRevealDelayStepMs * 1}
                    >
                        <Slide direction="left" delay={600}>
                            <li className="li-holder">
                                <div className="li-num-holder">
                                    <p className="li-num">10</p>
                                </div>
                                <div className="li-txt-holder">
                                    <p className="li-txt">ЛЕТ ПРАКТИКИ</p>
                                </div>
                            </li>
                        </Slide>
                    </Fade>
                    <Fade
                        delay={initialFadeDelayMs + fadeRevealDelayStepMs * 2}
                    >
                        <Slide direction="left" delay={800}>
                            <li className="li-holder">
                                <div className="li-num-holder">
                                    <p className="li-num">785</p>
                                </div>
                                <div className="li-txt-holder">
                                    <p className="li-txt">ДОВОЛЬНЫХ КЛИЕНТОВ</p>
                                </div>
                            </li>
                        </Slide>
                    </Fade>
                    <Fade
                        delay={initialFadeDelayMs + fadeRevealDelayStepMs * 3}
                    >
                        <Slide direction="left" delay={1000}>
                            <li className="li-holder">
                                <div className="li-num-holder">
                                    <p className="li-num">5</p>
                                </div>
                                <div className="li-txt-holder">
                                    <p className="li-txt">БАНК ПАРТНЁРОВ</p>
                                </div>
                            </li>
                        </Slide>
                    </Fade>
                    <Fade
                        delay={initialFadeDelayMs + fadeRevealDelayStepMs * 4}
                    >
                        <Slide direction="left" delay={1200}>
                            <li className="li-holder">
                                <div className="li-num-holder">
                                    <p className="li-num">125</p>
                                </div>
                                <div className="li-txt-holder">
                                    <p className="li-txt">ПРЕДАННЫХ КЛИЕНТОВ</p>
                                </div>
                            </li>
                        </Slide>
                    </Fade>
                </ul>
            </div>
        </div>
    );
}
