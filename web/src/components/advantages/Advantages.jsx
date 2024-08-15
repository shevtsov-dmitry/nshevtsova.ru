export default function Advantages() {
    return (
        <div className="h-fit w-full flex flex-col text-black gap-5 py-[2%] px-[5%]"
        // style={ {
        //     background: "rgb(210,210,210) radial-gradient(circle, rgba(210,210,210,0.8253502084427521) 0%, rgba(207,216,226,0.4107843821122199) 100%)",
        //   } }
        style={{
          background: "rgb(255,255,255) linear-gradient(180deg, rgba(255,255,255,0.4191877434567577) 15%, rgba(219,216,216,0.6236695361738445) 73%)",
        }}
        >
            <h1 className=" font-ptsans-bold text-4xl">ВОЗЬМУ ВСЮ РАБОТУ НА СЕБЯ</h1>
            <p className="text-2xl">
                Моя задача - сохранить ваше время и деньги и уберечь от стресса
                в таком нелегком процессе, как продажа квартиры. Сбор
                необходимых документов, уборка в квартире, размещение
                объявлений, показы и заключение сделки — все эти этапы я возьму
                на себя. А вы каждую неделю будете получать подробный отчет о
                результатах.
            </p>
            <ul className="flex text-[1rem]">
                <li className="advantage-icon-holder">
                    <img src="images/advantages/benefits.png" alt="" />
                    <p>Решение о цене недвижимости всегда за клиентом</p>
                </li>
                <li className="advantage-icon-holder">
                    <img src="images/advantages/pack-house.png" alt="" />
                    <p>Грамотная упаковка объекта для продажи</p>
                </li>
                <li className="advantage-icon-holder">
                    <img src="images/advantages/evaluate.png" alt="" />
                    <p>Точная и качественная оценка квартиры</p>
                </li>
                <li className="advantage-icon-holder">
                    <img src="images/advantages/adds.png" alt="" />
                    <p>Эффективная реклама и размещение объявлений</p>
                </li>
            </ul>
        </div>
    );
}
