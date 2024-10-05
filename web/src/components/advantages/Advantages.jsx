import { Slide, Fade, Zoom } from 'react-awesome-reveal';

export default function Advantages() {
    const fadeRevealDelayStepMs = 300;

    return (
        <div
            className="flex h-fit w-full flex-col gap-5 px-[5%] text-black"
            style={{
                background:
                    'rgb(255,255,255) linear-gradient(180deg, rgba(255,255,255,0.4191877434567577) 15%, rgba(219,216,216,0.6236695361738445) 73%)'
            }}
        >
            <div className="flex gap-3">
                <div className="flex h-auto flex-col gap-x-10 max-mobile:gap-5">
                    <Slide direction="left" triggerOnce>
                        <h1 className="pb-[2%] font-ptsans-bold text-4xl">
                            ВОЗЬМУ ВСЮ РАБОТУ НА СЕБЯ
                        </h1>
                    </Slide>
                    <Fade
                        delay={200}
                        cascade
                        triggerOnce
                        className="text-[1.3rem] max-laptop:text-[1.15rem]"
                    >
                        <p>
                            Моя задача - сохранить ваше время и деньги и уберечь
                            от стресса в таком нелегком процессе, как продажа
                            квартиры.
                        </p>
                        <p>
                            Сбор необходимых документов, уборка в квартире,
                            размещение объявлений, показы и заключение сделки —
                            все эти этапы я возьму на себя.
                        </p>
                        <p>
                            А вы каждую неделю будете получать подробный отчет о
                            результатах.
                        </p>
                    </Fade>
                    <div className="flex h-full w-full items-center justify-center">
                        <ul className="grid grid-cols-2 gap-y-10 text-[1.2rem] max-laptop:grid-cols-1 max-laptop:gap-y-4">
                            <Fade delay={fadeRevealDelayStepMs * 0}>
                                <Zoom delay={fadeRevealDelayStepMs * 0}>
                                    <li className="advantage-icon-holder">
                                        <img
                                            src="images/advantages/benefits.png"
                                            alt=""
                                            className="advantage-icon"
                                        />
                                        <p className="advantage-icon-label">
                                            Решение о цене недвижимости всегда
                                            за клиентом
                                        </p>
                                    </li>
                                </Zoom>
                            </Fade>
                            <Fade
                                direction="down"
                                delay={fadeRevealDelayStepMs * 1}
                            >
                                <Zoom delay={fadeRevealDelayStepMs * 1}>
                                    <li className="advantage-icon-holder">
                                        <img
                                            src="images/advantages/pack-house.png"
                                            alt=""
                                            className="advantage-icon"
                                        />
                                        <p className="advantage-icon-label">
                                            Грамотная упаковка объекта для
                                            продажи
                                        </p>
                                    </li>
                                </Zoom>
                            </Fade>
                            <Fade
                                direction="down"
                                delay={fadeRevealDelayStepMs * 2}
                            >
                                <Zoom delay={fadeRevealDelayStepMs * 2}>
                                    <li className="advantage-icon-holder">
                                        <img
                                            src="images/advantages/evaluate.png"
                                            alt=""
                                            className="advantage-icon"
                                        />
                                        <p className="advantage-icon-label">
                                            Точная и качественная оценка
                                            квартиры
                                        </p>
                                    </li>
                                </Zoom>
                            </Fade>
                            <Fade
                                direction="down"
                                delay={fadeRevealDelayStepMs * 3}
                            >
                                <Zoom delay={fadeRevealDelayStepMs * 3}>
                                    <li className="advantage-icon-holder">
                                        <img
                                            alt=""
                                            className="advantage-icon"
                                            src="images/advantages/adds.png"
                                        />
                                        <p className="advantage-icon-label">
                                            Эффективная реклама и размещение
                                            объявлений
                                        </p>
                                    </li>
                                </Zoom>
                            </Fade>
                        </ul>
                    </div>
                </div>
                <div className="flex w-fit items-center justify-center max-laptop:w-full max-mobile:hidden">
                    <img
                        src="images/advantages/smile-near-green-flower.jpg"
                        alt="Фотография Натальи"
                        className="h-fit"
                    />
                </div>
            </div>
        </div>
    );
}
