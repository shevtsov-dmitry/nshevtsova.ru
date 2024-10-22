import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Certificates = ({setIsCertificatesShown}) => {
    const [certificates, setCertificates] = useState([{}]);

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
    });

    return (
        <div className={'absolute h-auto w-1/2 bg-black bg-opacity-70'}>
            <div className={'relative'}>
                <button
                    className={
                        'absolute right-2 top-2 rounded-full bg-neutral-100 px-2 pb-1 text-3xl font-bold hover:cursor-pointer hover:bg-white z-10'
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
                                className={'max-h-fit'}
                            />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default Certificates;
