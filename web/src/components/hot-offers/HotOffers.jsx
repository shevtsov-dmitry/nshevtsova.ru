import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, Fade } from 'react-reveal';
import EstateManagementForm from './EstateManagementForm.jsx';
import { setIsEstateFormVisible } from '../../store/estateFormSlice.js';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function HotOffers() {
    const dispatch = useDispatch();

    const FORM_TYPES = {
        ADD: 'ADD',
        EDIT: 'EDIT'
    };
    const placeholderEstateJson = {
        estate: {
            price: '',
            estateType: '',
            address: ''
        },
        innerAttributes: {
            roomsAmount: '',
            totalSizeSquareMeters: '',
            kitchenSizeSquareMeters: '',
            hasFinishing: false,
            ceilHeight: '',
            toiletsAmount: ''
        },
        outerAttributes: {
            floor: '',
            allFloors: '',
            releaseDate: '',
            hasParking: true,
            description: ''
        }
    };

    const estateForm = useSelector((state) => state.estateForm);
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const isVisible = estateForm.isVisible;
    const isAdmin = true; // TODO make role with auth
    const isMobile = window.innerWidth < 768;
    const isLaptop = window.innerWidth < 1500;

    const [estateJson, setEstateJson] = useState(placeholderEstateJson);
    const [currentFormType, setCurrentFormType] = useState('');
    const [estatesList, setEstatesList] = useState([estateJson]);

    useEffect(() => {
        async function fetchEstatesList() {
            const url =
                GLOBAL_VALUES.serverUrl +
                '/estates/get/recent/' +
                (isMobile ? 4 : 8);
            const res = await fetch(url);
            const data = await res.json();
            setEstatesList(data);
        }

        fetchEstatesList();
    }, []);

    function Estate({ estate, innerAttributes, outerAttributes }) {
        const [isOfferHovered, setIsOfferHovered] = useState(false);
        const [images, setImages] = useState([]);

        useEffect(() => {
            async function fetchImages() {
                const res = await fetch(
                    `${GLOBAL_VALUES.serverUrl}/estates/images/get/byId/${estate.id}`
                );
                const base64array = await res.json();
                setImages(base64array);
            }

            fetchImages();
        }, []);

        return (
            <div className="flex w-full justify-center">
                <div
                    className="h-full w-5/6 rounded-3xl bg-[#ECECEC]"
                    onMouseEnter={() => setIsOfferHovered(true)}
                    onMouseLeave={() => setIsOfferHovered(false)}
                    style={{
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                    }}
                >
                    {isAdmin && isOfferHovered && (
                        <div
                            className="absolute right-[9%] top-[1%] z-10 rounded-full p-3 hover:cursor-pointer hover:bg-white"
                            onClick={() => {
                                dispatch(setIsEstateFormVisible(true));
                                setCurrentFormType(FORM_TYPES.EDIT);
                                setEstateJson({
                                    estate: estate,
                                    innerAttributes: innerAttributes,
                                    outerAttributes: outerAttributes
                                });
                            }}
                        >
                            <img src="images/hot-offers/edit.png" />
                        </div>
                    )}
                    {images.length > 0 ? (
                        <Splide>
                            {images.map((base64image, idx) => (
                                <SplideSlide key={idx}>
                                    <img
                                        src={`data:image/jpeg;base64,${base64image}`}
                                        className={'rounded-t-3xl'}
                                    />
                                </SplideSlide>
                            ))}
                        </Splide>
                    ) : (
                        <div />
                        // <img
                        //     className="h-[300px] w-full"
                        //     alt="фото квартиры"
                        //     src={`data:image/png;base64,${noImgIconBase64}`}
                        // />
                    )}
                    <div className="p-4">
                        <p className="text-2xl font-semibold text-black">
                            {estate.price} ₽
                        </p>
                        <p className="text-lg text-gray-700">
                            {innerAttributes.roomsAmount} комн.{' '}
                            {parseFloat(
                                innerAttributes.totalSizeSquareMeters
                            ).toFixed(1)}{' '}
                            м кв. {outerAttributes.floor}/
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
            <div className="flex items-center">
                <Slide left>
                    <h1 className="py-[2%] pl-[5%] font-ptsans-bold text-4xl">
                        ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ
                    </h1>
                </Slide>
                <Slide right>
                    {isAdmin && (
                        <button
                            className="ml-5 h-12 transform rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
                            onClick={() => {
                                dispatch(setIsEstateFormVisible(true));
                                setCurrentFormType(FORM_TYPES.ADD);
                                setEstateJson(placeholderEstateJson);
                            }}
                        >
                            Добавить новое
                        </button>
                    )}
                </Slide>
            </div>
            {isVisible ? (
                <EstateManagementForm
                    formType={currentFormType}
                    json={estateJson}
                />
            ) : (
                <div />
            )}
            <div
                className={`${isMobile ? 'mx-0' : 'mx-[5%]'} grid ${isLaptop && !isMobile ? 'grid-cols-3' : 'grid-cols-4'} ${isMobile && 'grid-cols-1'} ${window.innerWidth < 1200 ? 'grid-cols-2' : 'grid-cols-3'} gap-8 pb-[2%]`}
            >
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
            {isMobile && (
                <p className="text-center font-bold text-blue-800 hover:cursor-pointer hover:text-blue-700">
                    Показать ещё
                </p>
            )}
        </div>
    );
}
