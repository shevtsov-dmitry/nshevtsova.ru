import { useEffect, useRef, useState } from 'react';
import StarRating from '../common/StarRating';
import { useSelector } from 'react-redux';
import SaveReviewForm from './SaveReviewForm';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function Reviews() {
    const formHolderRef = useRef();

    const defaultUserData = {
        name: 'имя',
        surname: 'фамилия',
        reviewText: 'пример текста отзыва',
        stars: 5
    };

    const [reviewsJsonArray, setReviewsJsonArray] = useState([
        defaultUserData,
        defaultUserData,
        defaultUserData
    ]);

    const [idImageMap, setIdImageMap] = useState({});
    const [midIdx, setMidIdx] = useState(1);
    const maxReviewsFetched = 15;

    const positions = {
        LEFT: midIdx - 1,
        MID: midIdx,
        RIGHT: midIdx + 1
    };

    const sliderRef = useRef();

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = 0;
        }

    }, []);


    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const isReviewSent = useSelector((state) => state.review).isReviewSent;

    let scrollDistancePx = 300;

    if (sliderRef.current) {
        scrollDistancePx = sliderRef.current.offsetWidth / 3;
    }

    useEffect(() => {

        fetchUserReviews();

        async function fetchUserReviews() {
            const url =
                GLOBAL_VALUES.serverUrl +
                '/reviews/get/recent/' +
                maxReviewsFetched;
            const req = await fetch(url);
            const res = await req.json();
            setReviewsJsonArray(res);

            fetchUserPictures(res);
        }

        async function fetchUserPictures(jsonArray) {
            // TODO refactor into one fetch
            const ids = [];
            jsonArray.forEach(json => {
                ids.push(json['id']);
            });
            const imagesResponse = await fetch(GLOBAL_VALUES.serverUrl + '/reviews/user-pics/get/by-ids', {
                method: 'POST',
                body: JSON.stringify(ids),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const fetchedImagesMap = await imagesResponse.json();
            setIdImageMap(fetchedImagesMap);

        }

    }, [isReviewSent]);


    function ReviewDiv({ positionIdx, json }) {
        const [isShowMore, setIsShowMore] = useState(false);
        const reviewDivRef = useRef();

        const isLeft = positionIdx === positions.LEFT;
        const isMid = positionIdx === positions.MID;
        const isRight = positionIdx === positions.RIGHT;

        return (
            <SplideSlide>
                <div
                    ref={reviewDivRef}
                    className={
                        `flex h-[20em] my-[5%] w-auto flex-col rounded-lg bg-white p-5 ${isShowMore && 'z-50 h-auto'}`
                    }
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                    }}

                >
                    <div className="flex items-center gap-2 pb-[2%]">
                        <img
                            id="usr-pic"
                            src={`data:image/jpeg;base64,${idImageMap[json['id']]}`}
                            alt="Фото клиента"
                            className="w-[12%]"
                            style={{ borderRadius: '50%' }}
                        />
                        <div>
                            <h3 id="user-name">
                                {json.name} {json.surname}
                            </h3>
                            <StarRating
                                stars={json.stars}
                                isDefaultChecked={true}
                            />
                        </div>
                    </div>
                    <p className={`overflow-hidden`}>{json.reviewText}</p>
                    <p
                        className={`w-fit select-none py-[2%] font-[0.7rem] underline hover:cursor-pointer hover:text-blue-500`}
                        onClick={() => setIsShowMore(isShowMore ? false : true)}
                    >
                        {isShowMore ? 'закрыть' : 'посмотреть полностью'}
                    </p>
                </div>
            </SplideSlide>
        );
    }

    return (
        <div
            className={`flex h-full w-full flex-col bg-[url('images/reviews/foggy-city.jpg')] bg-cover bg-no-repeat py-[2%]`}
        >
            <div className="h-full w-full flex-1">
                <h1 className="text-center font-ptsans-bold text-5xl">
                    Отзывы тех, кто уже совершил <br /> выгодную сделку с моей
                    помощью
                </h1>
            </div>

            <div className="flex-2 flex h-full max-mobile:h-full overflow-hidden py-[2%]">
                <Splide
                    options={{
                        perPage: window.innerWidth < 768 ? 1 : 3,
                        lazyLoad: true,
                        speed: 700,
                        easing: 'ease-in-out',
                        snap: true,
                        gap: '2rem', 
                       arrows: true,
                       classes:  {
                        arrow: "custom-arrow"
                       }
                    }}
                    aria-label="Reviews"
                    className="w-full px-[3%]"
                >
                    {reviewsJsonArray.map((json, idx) => (
                        <ReviewDiv key={idx} json={json} positionIdx={idx} />
                    ))}
                </Splide>
            </div>

            <SaveReviewForm formHolderRef={formHolderRef} />

            <div className="flex w-full flex-1 justify-center">
                <button
                    onClick={() => {
                        formHolderRef.current.style.display = 'block';
                    }}
                    className="w-fit select-none rounded-lg bg-white px-5 pb-4 pt-3 font-ptsans-bold text-3xl transition-all hover:scale-105"
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
