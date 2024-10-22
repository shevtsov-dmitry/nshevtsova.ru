import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Certificates = () => {
    const [certificatesObject, setCertificatesObject] = useState([{}]);

    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    useEffect(() => {
        async function fetchCertificates() {
            try {
                const res = await fetch(
                    `${GLOBAL_VALUES.serverUrl}/certificates/get/all`
                );
                const fetchedImagesList = await res.json();
                setCertificatesObject(fetchedImagesList);
            } catch (e) {
                console.error(
                    `Ошибка при получении сертификатов из-за ${e.message}`
                );
            }
        }

        fetchCertificates();
    });

    return (
        <div className={'absolute h-full w-1/2 bg-amber-200'}>
            {certificatesObject.map((certificateJson, index) => (
                <img
                    key={certificateJson['id']}
                    src={`data:image/jpeg;base64,${certificateJson['content']}`}
                />
            ))}
        </div>
    );
};

export default Certificates;
