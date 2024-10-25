import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Certificates = ({ setIsCertificatesShown }) => {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const [certificates, setCertificates] = useState([{}]);
    const isAdmin = GLOBAL_VALUES.isAdmin; // TODO make role with auth
    const [deleteStatusNotification, setDeleteStatusNotification] = useState({
        status: true,
        message: ''
    });

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
    }, [deleteStatusNotification]);

    const DeleteCertificateButton = ({ id }) => {
        async function deleteImage() {
            const res = await fetch(
                `${GLOBAL_VALUES.serverUrl}/certificates/delete/by/id/${id}`,
                { method: 'DELETE' }
            );
            if (res.status === 200) {
                setDeleteStatusNotification({
                    status: true,
                    message: 'Успешно удалено'
                });
            } else {
                setDeleteStatusNotification({
                    status: true,
                    message: 'Возникла ошибка при удалении'
                });
            }
        }

        return (
            <div className={'absolute bottom-4 flex w-full items-end'}>
                <div className={'absolute right-4 z-10'}>
                    <button
                        className={
                            'h-12 transform select-none rounded-full bg-red-500 px-4 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-red-800'
                        }
                        onClick={() => deleteImage()}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div
            className={
                'relative h-auto w-1/2 bg-black bg-opacity-70 max-mobile:w-full min-[1700px]:w-1/3'
            }
        >
            <div className={'relative'}>
                {isAdmin && (
                    <div className={'relative flex w-full justify-center'}>
                        <p
                            className={`${deleteStatusNotification.status ? 'text-green-400' : 'text-red-400'} font-andika-bold`}
                        >
                            {deleteStatusNotification.message}
                        </p>
                    </div>
                )}
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
                            {isAdmin && (
                                <DeleteCertificateButton
                                    id={certificateJson['id']}
                                />
                            )}
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default Certificates;
