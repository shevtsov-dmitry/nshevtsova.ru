export default function Preview() {
    return (
        // <div className="h-screen w-full bg-[url('/images/preview/preview-bg.jpg')] bg-cover bg-center"></div>
        <div className="flex h-screen w-full items-center bg-[url('/images/preview/new-preview.jpg')] bg-cover bg-center">
            <div className="flex-[4]" />
            <div className="w-full flex-[5] font-andika-bold">
                <h1 className="text-6xl text-white mb-5">ВАШ НАДЁЖНЫЙ РИЕЛТОР</h1>
                  <h1 className="text-6xl text-white">НАТАЛЬЯ ШЕВЦОВА</h1>
                <ul className="mt-[5%] flex flex-col gap-5 text-nowrap">
                    <li className="li-holder">
                        <div className="li-num-holder">
                            <p className="li-num">10</p>
                        </div>
                        <div className="li-txt-holder">
                            <p className="li-txt">ЛЕТ ПРАКТИКИ</p>
                        </div>
                    </li>

                    <li className="li-holder">
                        <div className="li-num-holder">
                            <p className="li-num">785</p>
                        </div>
                        <div className="li-txt-holder">
                            <p className="li-txt">ДОВОЛЬНЫХ КЛИЕНТОВ</p>
                        </div>
                    </li>

                    <li className="li-holder">
                        <div className="li-num-holder">
                            <p className="li-num">5</p>
                        </div>
                        <div className="li-txt-holder">
                            <p className="li-txt">БАНК ПАРТНЁРОВ</p>
                        </div>
                    </li>

                    <li className="li-holder">
                        <div className="li-num-holder">
                            <p className="li-num">125</p>
                        </div>
                        <div className="li-txt-holder">
                            <p className="li-txt">ПРЕДАННЫХ КЛИЕНТОВ</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
