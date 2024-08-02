export default function Reviews() {
    function ReviewDiv({}) {
        return <div className="h-1/3 w-1/3 bg-red-200"></div>;
    }

    return (
        <div className="flex flex-col bg-[url('images/reviews/foggy-city.jpg')] py-[2%]">
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
