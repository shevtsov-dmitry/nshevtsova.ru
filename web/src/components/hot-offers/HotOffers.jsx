import { useState } from 'react';

export default function HotOffers() {
    const [estatesList, setEstatesList] = useState([
        {
            imageBase64: '',
            price: 2490000,
            roomsAmount: 2,
            floor: 5,
            allFlors: 16,
            sizeSquareMeters: 39,
            address: 'Борисоглебск, Третьяковская ул., 73'
        }
    ]);

    function Estate({ json }) {
        return (
            <div className="h-[400px] w-[300px] rounded-3xl bg-purple-400">
                <img
                    className="h-[300px] rounded-t-3xl bg-purple-200 p-5"
                    alt="картинка квартиры"
                />
                <p className="text-2xl">{json.price} ₽</p>
                <p className="">
                    {json.roomsAmount} комн. {json.sizeSquareMeters} м кв.{' '}
                    {json.floor}/{json.allFlors} этаж
                </p>
            <p className='text-gray-700'>{json.address}</p>
            </div>
        );
    }

    return (
        <div className="h-[700px] w-full bg-neutral-200">
            <h1 className="py-[2%] pl-[5%] font-ptsans-bold text-4xl">
                ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ
            </h1>
            <div className="ml-[5%]">
                {estatesList.map((item, idx) => (
                    <Estate key={idx} json={item} />
                ))}
            </div>
        </div>
    );
}
