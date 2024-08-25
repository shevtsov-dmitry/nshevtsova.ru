import { useRef, useState, useEffect } from 'react';
import StarRating from '../common/StarRating';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Reviews() {
    const defaultUserData = {
        name: 'имя',
        surnname: 'фамилия',
        reviewText: 'пример текста отзыва',
        stars: 5
    };

    const [reviewsJsonArray, setReviewsJsonArray] = useState([
        defaultUserData,
        defaultUserData,
        defaultUserData
    ]);

    const [midIdx, setMidIdx] = useState(1);
    const [maxReviewsFetched, setMaxReviewsFetched] = useState(15);

    const positions = {
        LEFT: midIdx - 1,
        MID: midIdx,
        RIGHT: midIdx + 1
    };

    const [isScrollRight, setIsScrollRight] = useState(false);

    const sliderRef = useRef();

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = 0;
        }
    }, []);

    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    let scrollDistancePx = 300;

    if (sliderRef.current) {
        scrollDistancePx = sliderRef.current.offsetWidth / 3;
    }

    function switchToPrev() {
        if (midIdx - 1 > 0) setMidIdx(midIdx - 1);
        setIsScrollRight(false);
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= scrollDistancePx;
        }
    }

    function switchToNext() {
        if (midIdx - 1 < maxReviewsFetched) setMidIdx(midIdx + 1);
        setIsScrollRight(true);
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += scrollDistancePx;
        }
    }

    useEffect(() => {
        async function fetchUserReviews() {
            const url =
                GLOBAL_VALUES.serverUrl +
                '/reviews/get/recent/' +
                maxReviewsFetched;
            const req = await fetch(url);
            const res = await req.json();
            setReviewsJsonArray(res);
        }

        fetchUserReviews();
    }, []);

    function ReviewDiv({ positionIdx, json }) {
        const [isShowMore, setIsShowMore] = useState(false);
        const reviewDivRef = useRef();

        const isLeft = positionIdx === positions.LEFT;
        const isMid = positionIdx === positions.MID;
        const isRight = positionIdx === positions.RIGHT;

        useEffect(() => {
            if (isMid) {
                reviewDivRef.current.style.transform = 'scale(1.25)';
                reviewDivRef.current.classList.add('animate-scale-up');
            }
            if (isScrollRight) {
                isLeft &&
                    reviewDivRef.current.classList.add('animate-scale-down');
            }
            if (!isScrollRight) {
                isRight &&
                    reviewDivRef.current.classList.add('animate-scale-down');
            }
        }, [midIdx]);

        return (
            <div className="mx-[3.1665%] w-[27%] flex-shrink-0">
                <div
                    ref={reviewDivRef}
                    // className={`${isMid && 'z-20'} mx-[1.665%] flex h-[20em] w-[30%] flex-shrink-0 flex-col rounded-lg bg-white p-5`}
                    className={
                        `flex h-[20em] flex-col rounded-lg bg-white p-5 ` +
                        ` ${isShowMore && isLeft && 'z-50 h-auto'} ` +
                        ` ${isShowMore && isMid && 'z-50 h-auto'} ` +
                        ` ${isShowMore && isRight && 'z-50 h-auto'} `
                    }
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                    }}
                >
                    <div className="flex items-center gap-2 pb-[2%]">
                        <img
                            id="usr-pic"
                            src={`images/reviews/default-user-pic.png`}
                            className="w-[12%]"
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
            </div>
        );
    }

    function SwitchArrows() {
        return (
            <div className="flex h-12 w-full justify-center">
                <div className="z-50 mt-[-10%] flex items-center gap-5">
                    <FaArrowLeft
                        size={30}
                        className="switch-review-arrow"
                        onClick={() => switchToPrev()}
                    />
                    {/* TODO set here somethin like 1..252 underlined. go from newest requests to oldests */}
                    <p className="select-none text-[2rem] font-bold text-white">
                        {midIdx}
                    </p>
                    <FaArrowRight
                        size={30}
                        className="switch-review-arrow"
                        onClick={() => switchToNext()}
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex h-full flex-col bg-[url('images/reviews/foggy-city.jpg')] bg-cover bg-no-repeat py-[2%]`}
        >
            <div className="h-full w-full flex-1">
                <h1 className="text-center font-ptsans-bold text-5xl">
                    Отзывы тех, кто уже совершил <br /> выгодную сделку с моей
                    помощью
                </h1>
            </div>
            <div className="flex-2 flex h-full w-full flex-col items-center justify-center">
                <div
                    // FIXME add antispam restriction for horizontal scrolling to prevent review position shift
                    ref={sliderRef}
                    className="z-20 flex w-full items-center overflow-hidden scroll-smooth py-[8%] max-mobile:h-full max-mobile:flex-col"
                >
                    {/* TODO decide what to do with confict of empty divs and smooth scrolling */}
                    {/* <div */}
                    {/*     id={'left-empty-space'} */}
                    {/*     className={`${midIdx == 0 ? 'w-1/3' : 'w-0'} flex-shrink-0 transition-all`} */}
                    {/* /> */}
                    {reviewsJsonArray.map((json, idx) => (
                        <ReviewDiv key={idx} json={json} positionIdx={idx} />
                    ))}
                    {/* <div */}
                    {/*     id={'right-empty-space'} */}
                    {/*     className={`w-1/3 flex-shrink-0`} */}
                    {/* /> */}
                </div>
                <SwitchArrows />
            </div>
            <div className="flex w-full flex-1 justify-center">
                <button
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
