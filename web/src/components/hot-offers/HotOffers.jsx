import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HotOffers() {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const [estatesList, setEstatesList] = useState([
        {
            estate: {
                imageBase64: '',
                price: 11248458,
                estateType: 'APARTMENT',
                createdAt: '2024-08-24T14:33:24',
                address: 'Борисоглебск, Третьяковская ул., 73'
            },
            innerAttributes: {
                roomsAmount: 2,
                totalSizeSquareMeters: 70.05079696151134,
                kitchenSizeSquareMeters: 22.145527081439372,
                hasFinishing: false,
                ceilHeight: 2.0427580314220233,
                toiletsAmount: 3
            },
            outerAttributes: {
                floor: 9,
                allFloors: 9,
                releaseDate: 1958,
                hasParking: true,
                windowViewDescription: 'Квартира с видом на парк и реку.'
            }
        }
    ]);

    useEffect(() => {
        async function fetchEstatesList() {
            const url = GLOBAL_VALUES.serverUrl + '/estates/get/recent/' + 10;
            const res = await fetch(url);
            const data = await res.json();
            setEstatesList(data);
        }

        fetchEstatesList();
    }, []);

    function Estate({ estate, innerAttributes, outerAttributes }) {
        return (
          <div className='w-full flex justify-center'>
            <div className="h-full w-5/6 rounded-3xl bg-purple-400">
                <img
                    className="h-[300px] rounded-t-3xl bg-purple-200 p-5"
                    alt="фото квартиры"
                />
                  <div className='p-2'>
                    <p className="text-2xl">{estate.price} ₽</p>
                    <p className="">
                        {innerAttributes.roomsAmount} комн.{' '}
                        {innerAttributes.totalSizeSquareMeters.toFixed(1)} м кв.{' '}
                        {outerAttributes.floor}/{outerAttributes.allFloors} этаж
                    </p>
                    <p className="text-gray-700 overflow-hidden">{estate.address}</p>
                </div>
            </div>
          </div>
        );
    }

    return (
        <div className="h-auto w-full bg-neutral-200">
            <h1 className="py-[2%] pl-[5%] font-ptsans-bold text-4xl">
                ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ
            </h1>
            <div className="mx-[5%] pb-[2%] grid grid-cols-4 gap-8">
                              {estatesList.map((json, idx) => (
                    <Estate
                        key={idx}
                        estate={json.estate}
                        innerAttributes={json.innerAttributes}
                        outerAttributes={json.outerAttributes}
                    />
                ))}


            </div>
        </div>
    );
}
