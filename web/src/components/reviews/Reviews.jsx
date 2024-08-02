import { useRef, useState } from 'react';
import StarRating from '../common/StarRating';

export default function Reviews() {
    function ReviewDiv({ content }) {
        const [isShowMore, setIsShowMore] = useState(false);
        return (
            <div
                className={`${isShowMore ? 'h-auto' : 'h-[30%]'} flex w-1/3 flex-col gap-3 rounded bg-white px-[1.5%] py-[1%]`}
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
                <p
                    className={`${isShowMore ? 'overflow-auto' : 'overflow-hidden'} `}
                >
                    {content}
                </p>
                <p
                    className="font-[0.7rem] underline hover:cursor-pointer hover:text-blue-500"
                    onClick={() => {
                        if (isShowMore) setIsShowMore(false);
                        else setIsShowMore(true);
                    }}
                >
                    посмотреть полностью
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[url('images/reviews/foggy-city.jpg')] bg-center bg-no-repeat py-[2%]">
            <div className="h-full w-full flex-1">
                <h1 className="text-center font-ptsans-bold text-4xl">
                    Отзывы тех, кто уже совершил <br /> выгодную сделку с моей
                    помощью
                </h1>
            </div>
            <div className="flex-2 flex h-[700px] w-full items-center justify-center gap-5 px-[5%]">
                <ReviewDiv
                    content={`
                  Огромная благодарность Наталье Михайловне за высокий
                  профессионализм, надёжность и нацеленность на результат!
                  `}
                />
                <ReviewDiv
                    content={`
                  Огромная благодарность Наталье Михайловне за высокий
                  профессионализм, надёжность и нацеленность на результат!
                  Наталья Михайловна помогла нам продать квартиру, купленную
                  за мат.капитал и найти новую. Продажа таких квартир всегда
                  очень трудна, поэтому мы сразу искали отличного специалиста,
                  который точно нам поможет. Сделка прошла быстро и успешно.
                  Наталья Михайловна сама готовила документа, всегда была на
                  телефоне, с нами была от начала до конца сделки. Мастер
                  своего дела. Очень приятно работать с такими людьми.
                  `}
                />
                <ReviewDiv
                    content={`
                      Огромная благодарность Наталье Михайловне за высокий
                      профессионализм, надёжность и нацеленность на результат!
                      Наталья Михайловна помогла нам продать квартиру, купленную
                      за мат.капитал и найти новую. Продажа таких квартир всегда
                      очень трудна, поэтому мы сразу искали отличного специалиста,
                      который точно нам поможет. Сделка прошла быстро и успешно.
                      Наталья Михайловна сама готовила документа, всегда была на
                      телефоне, с нами была от начала до конца сделки. Мастер
                      Огромная благодарность Наталье Михайловне за высокий
                      профессионализм, надёжность и нацеленность на результат!
                      Наталья Михайловна помогла нам продать квартиру, купленную
                      за мат.капитал и найти новую. Продажа таких квартир всегда
                      очень трудна, поэтому мы сразу искали отличного специалиста,
                      который точно нам поможет. Сделка прошла быстро и успешно.
                      Наталья Михайловна сама готовила документа, всегда была на
                      телефоне, с нами была от начала до конца сделки. Мастер
                      Огромная благодарность Наталье Михайловне за высокий
                  `}
                />
            </div>
            <div className="flex w-full justify-center">
                <button
                    className="w-fit rounded-lg bg-white px-5 pb-4 pt-3 font-ptsans-bold text-3xl transition-all hover:scale-105"
                    style={{
                        boxShadow:
                            'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                    }}
                >
                    Оставить отзыв
                </button>
            </div>
        </div>
    );
}
