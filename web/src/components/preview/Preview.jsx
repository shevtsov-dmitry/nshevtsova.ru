import { Fade, Slide } from 'react-awesome-reveal'; // Ensure you have this import

export default function Preview() {
    const initialFadeDelayMs = 750;
    const fadeRevealDelayStepMs = 200;

    return (
        <div
            className="flex h-screen w-full items-center bg-[url('/images/preview/new-preview.jpg')] bg-cover bg-center">
            <div className="flex-[4]" />
            <div className="w-full flex-[5] font-andika-bold">
                <Fade direction="down" delay={200}>
                    <h1 className="mb-5 text-6xl text-white">
                        ВАШ НАДЁЖНЫЙ РИЕЛТОР
                    </h1>
                </Fade>
                <Fade direction="down" delay={400}>
                    <h1 className="text-6xl text-white">НАТАЛЬЯ ШЕВЦОВА</h1>
                </Fade>
                <ul className="mt-[5%] flex flex-col gap-5 text-nowrap">
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
