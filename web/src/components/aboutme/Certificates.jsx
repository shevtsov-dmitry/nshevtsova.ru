import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Certificates = ({ setIsCertificatesShown }) => {
    const [certificates, setCertificates] = useState([{}]);
    const isAdmin = true; // TODO make role with auth
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    useEffect(() => {
        async function fetchCertificates() {
            try {
                const res = await fetch(
                    `${GLOBAL_VALUES.serverUrl}/certificates/get/all`
                );
                const fetchedImagesList = await res.json();
                setCertificates(fetchedImagesList);
            } catch (e) {
                console.error(
                    `Ошибка при получении сертификатов из-за ${e.message}`
                );
            }
        }

        fetchCertificates();
    }, []);

    return (
        <div
            className={
                'relative h-auto w-1/2 bg-black bg-opacity-70 max-mobile:w-full'
            }
        >
            <div className={'relative'}>
                <button
                    className={
                        'absolute right-2 top-2 z-10 rounded-full bg-neutral-100 px-2 pb-1 text-3xl font-bold hover:cursor-pointer hover:bg-white'
                    }
                    onClick={() => setIsCertificatesShown(false)}
                >
                    &times;
                </button>
                <Splide className="">
                    {certificates.map((certificateJson, index) => (
                        <SplideSlide
                            key={certificateJson['id']}
                            className={'flex items-center justify-center'}
                        >
                            <img
                                // key={certificateJson['id']}
                                src={`data:image/jpeg;base64,${certificateJson['content']}`}
                                className={'p-10'}
                            />
                        </SplideSlide>
                    ))}
                </Splide>
                {isAdmin && (
                    <div className={'absolute flex w-full items-end'}>
                        <div className={'absolute bottom-2 right-2 z-10'}>
                            <button
                                className={
                                    'r-0 h-12 transform select-none rounded-full bg-red-500 px-4 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-red-800'
                                }
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificates;
