import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, Fade } from 'react-awesome-reveal';
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
            estateType: 'APARTMENT',
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
            floor: '1',
            allFloors: '16',
            releaseDate: '2000',
            hasParking: false,
            description: ''
        }
    };

    const estateForm = useSelector((state) => state.estateForm);
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const isVisible = estateForm.isVisible;
    const isAdmin = GLOBAL_VALUES.isAdmin;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLaptop, setIsLaptop] = useState(window.innerWidth < 1500);

    let responsiveGridCols = '';
    if (isMobile) {
        responsiveGridCols = 'grid-cols-1';
    } else if (isLaptop) {
        responsiveGridCols = 'grid-cols-3';
    } else {
        responsiveGridCols = 'grid-cols-4';
    }

    const [estateJson, setEstateJson] = useState(placeholderEstateJson);
    const [currentFormType, setCurrentFormType] = useState('');
    const [estatesList, setEstatesList] = useState([estateJson]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsLaptop(window.innerWidth < 1500);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
    }, [isMobile]);

    function Estate({ estate, innerAttributes, outerAttributes }) {
        const [isOfferHovered, setIsOfferHovered] = useState(false);
        const [images, setImages] = useState([]);

        useEffect(() => {
            async function fetchImages() {
                if (estate.id === undefined) {
                    return;
                }
                const res = await fetch(
                    `${GLOBAL_VALUES.serverUrl}/estates/images/get/by/id/${estate.id}`
                );
                const base64array = await res.json();
                setImages(base64array);
            }

            fetchImages();
        }, [estate.id]);

        return (
            <div className="flex w-full justify-center">
                <div
                    className={`relative h-full w-5/6 rounded-3xl bg-[#ECECEC] max-mobile:w-full`}
                    onMouseEnter={() => setIsOfferHovered(true)}
                    onMouseLeave={() => setIsOfferHovered(false)}
                    style={{
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                    }}
                >
                    {isAdmin && isOfferHovered && (
                        <div
                            className="absolute right-[1%] top-[1%] z-10 rounded-full p-3 hover:cursor-pointer hover:bg-white"
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
                        <Splide className="">
                            {images.map((base64image, idx) => (
                                <SplideSlide key={idx}>
                                    <img
                                        src={`data:image/jpeg;base64,${base64image}`}
                                        className={
                                            'h-full w-full rounded-t-3xl'
                                        }
                                    />
                                </SplideSlide>
                            ))}
                        </Splide>
                    ) : (
                        <div />
                    )}
                    <div className="p-4">
                        <p
                            className={`text-${isMobile ? 'xl' : '2xl'} font-semibold text-black`}
                        >
                            {estate.price} ₽
                        </p>
                        <p
                            className={`text-${isMobile ? 'base' : 'lg'} text-gray-700`}
                        >
                            {innerAttributes.roomsAmount} комн.{' '}
                            {parseFloat(innerAttributes.totalSizeSquareMeters)
                                .toFixed(1)
                                .toString()
                                .replace('.', ',')}{' '}
                            м кв. {outerAttributes.floor}/
                            {outerAttributes.allFloors} этаж
                        </p>
                        <p
                            className={`overflow-hidden text-${isMobile ? 'sm' : 'base'} text-gray-500`}
                        >
                            {estate.address}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="h-auto w-full"
            style={{
                background:
                    'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(233,231,231,1) 78%)'
            }}
        >
            <div className="flex items-center gap-8 pb-[2%]">
                <Slide direction="left" className="ml-[5%] font-ptsans-bold">
                    <h1 className={`text-4xl max-mobile:text-2xl`}>
                        ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ
                    </h1>
                </Slide>
                <Slide direction="right">
                    {isAdmin ? (
                        <button
                            className="admin-upload-button"
                            onClick={() => {
                                dispatch(setIsEstateFormVisible(true));
                                setCurrentFormType(FORM_TYPES.ADD);
                                setEstateJson(placeholderEstateJson);
                            }}
                        >
                            Добавить новое
                        </button>
                        ) : <div/>}
                </Slide>
            </div>
            {isVisible && (
                <EstateManagementForm
                    formType={currentFormType}
                    json={estateJson}
                />
            )}
            <div
                className={`mx-[5%] grid max-mobile:mx-5 ${responsiveGridCols} gap-8`}
            >
                {estatesList.map((json, idx) => (
                    <Fade delay={150} key={idx}>
                        <Estate
                            estate={json.estate}
                            innerAttributes={json.innerAttributes}
                            outerAttributes={json.outerAttributes}
                        />
                    </Fade>
                ))}
            </div>

            {isMobile && (
                <div className={'mt-4 flex w-full justify-center'}>
                    <button
                        className="text-center font-bold text-blue-800 hover:cursor-pointer hover:text-blue-700"
                        onClick={() => {
                            // TODO fetch more images on button click
                        }}
                    >
                        Показать ещё
                    </button>
                </div>
            )}
        </div>
    );
}
