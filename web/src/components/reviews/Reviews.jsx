import StarRating from '../common/StarRating';

export default function Reviews() {
    function ReviewDiv({}) {
        return (
            <div
                className="h-auto w-1/3 rounded bg-white p-2"
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
                }}
            >
                <div className="flex items-center gap-2">
                    <img
                        id="usr-pic"
                        src={`images/reviews/default-user-pic.png`}
                        className="w-[12%]"
                    />
                    <div>
                        <h3 id="user-name">Пётр Александрович</h3>
                        <StarRating />
                    </div>
                </div>
                <p>
                    Огромная благодарность Наталье Михайловне за высокий
                    профессионализм, надёжность и нацеленность на результат!
                    Наталья Михайловна помогла нам продать квартиру, купленную
                    за мат.капитал и найти новую. Продажа таких квартир всегда
                    очень трудна, поэтому мы сразу искали отличного специалиста,
                    который точно нам поможет. Сделка прошла быстро и успешно.
                    Наталья Михайловна сама готовила документа, всегда была на
                    телефоне, с нами была от начала до конца сделки. Мастер
                    своего дела. Очень приятно работать с такими людьми.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[url('images/reviews/foggy-city.jpg')] bg-center py-[2%]">
            <div className="h-full w-full flex-1">
                <h1 className="text-center font-ptsans-bold text-4xl">
                    Отзывы тех, кто уже совершил <br /> выгодную сделку с моей
                    помощью
                </h1>
            </div>
            <div className="flex-2 flex h-[700px] w-full items-center justify-center gap-5 px-[5%]">
                <ReviewDiv />
            </div>
        </div>
    );
}
