import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Slide, Fade } from 'react-reveal';
import EstateManagementForm from './EstateManagementForm.jsx';

export default function HotOffers() {
    const isAdmin = true;
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const noImgIconBase64 =
        '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GmAAtN+OZF7/OWQ//nG4irTxLwWe0L3v1aSJcTSZxz9Xp5A9AK5g9LUH2swMgPb7S/KrfcKYj3sa2dHni2SM/1Nkwc4Fw140g8PJZiXnj6102iwMgHZ7C/AisoPu2gU4/jKynv9oMrfgnHke517SYbiM4VuIq2WcCNReLwLeTTr9vrtA73EP49tV+CYyYegycrGPa8Z0XC0gawDt9GjSsfZe0tE2KT5LRgU+T65toJYzANrp02RZ7VuaLsg8/BnZT/ByslGJWswAaJ/TyJbcr6J9m4XO1TIy2/Dcpgui4ewDaJf9yfj8S0nP/6RaTToFryN7Ecy3c1ELzBpAe+xCxuVPZfgMvElxPZm4dDbZFVgtZA2geetIEF9GFt2c0mhpxusS0py5gmxWekezxVE/awDNmt4g80zgKcztopqT5mQyLLiy+99rGH5tQW1G1gCatZbMolsOvAC4q9niLIjpKxjfSIYIHyQhoBYwAJq1PbmO3jFkWu6W6i7gheTfuB3p51ALGADNOp1s0vF0sgLvZ2yZ1eN1ZFHTOjK/4WPNFkfTvDhogzqdDmTd/RvJZbS2xJMf8u+6F/gb0t+xuvdBv4PNMQCkwhwFkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpMANAKswAkAozAKTCDACpsJ8DDTjszVMuHiYAAAAASUVORK5CYII=';
    const isMobile = window.innerWidth < 768
    const isLaptop = window.innerWidth < 1500

    const [estatesList, setEstatesList] = useState([
        {
            estate: {
                imageBase64: noImgIconBase64,
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
            const url = GLOBAL_VALUES.serverUrl + '/estates/get/recent/' + (isMobile ? 4 : 8);
            const res = await fetch(url);
            const data = await res.json();
            setEstatesList(data);
        }

        fetchEstatesList();
    }, []);

    function Estate({ estate, innerAttributes, outerAttributes }) {
        const [isOfferHovered, setIsOfferHovered] = useState(false);

        return (
            <div className="flex w-full justify-center">
                <div
                    className="h-full w-5/6 rounded-3xl"
                    onMouseEnter={() => setIsOfferHovered(true)}
                    onMouseLeave={() => setIsOfferHovered(false)}
                    style={{
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                    }}
                >
                    {isAdmin && isOfferHovered &&
                        <div className='absolute top-[1%] right-[9%] hover:bg-white hover:cursor-pointer p-3 rounded-full'>
                            <img src='images/hot-offers/edit.png' />
                        </div>
                    }
                    <img
                        className="h-[300px] w-full rounded-t-3xl"
                        alt="фото квартиры"
                        src={`data:image/png;base64,${noImgIconBase64}`}
                    />
                    <div className="p-4">
                        <p className="text-2xl font-semibold text-black">
                            {estate.price} ₽
                        </p>
                        <p className="text-lg text-gray-700">
                            {innerAttributes.roomsAmount} комн.{' '}
                            {innerAttributes.totalSizeSquareMeters.toFixed(1)} м
                            кв. {outerAttributes.floor}/
                            {outerAttributes.allFloors} этаж
                        </p>
                        <p className="overflow-hidden text-base text-gray-500">
                            {estate.address}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-auto w-full bg-[#E9E7E7]">
            <div className='flex items-center'>
                <Slide left>
                    <h1 className="py-[2%] pl-[5%] font-ptsans-bold text-4xl">
                        ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ
                    </h1>
                </Slide>
                <Slide right>
                    {isAdmin && (
                        <button className="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 h-12">
                            Добавить новое
                        </button>
                    )}
                </Slide>
            </div>
            <EstateManagementForm type={"ADD"} />
            <div className={`${isMobile ? "mx-0" : "mx-[5%]"} grid ${isLaptop && !isMobile ? 'grid-cols-3' : 'grid-cols-4'} ${isMobile && 'grid-cols-1'} ${window.innerWidth < 1200 ? 'grid-cols-2' : 'grid-cols-3'} gap-8 pb-[2%]`}>
                {estatesList.map((json, idx) => (
                    <Slide bottom key={idx}>
                        <Fade>
                            <Estate
                                estate={json.estate}
                                innerAttributes={json.innerAttributes}
                                outerAttributes={json.outerAttributes}
                            />
                        </Fade>
                    </Slide>
                ))}
            </div>
            {isMobile && <p className='text-center text-blue-800 font-bold hover:cursor-pointer hover:text-blue-700'>Показать ещё</p>}
        </div>
    );
}
