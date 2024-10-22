import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const UploadCertificateForm = ({ setIsFormShown }) => {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const [image, setImage] = useState(null);
    const [notification, setNotification] = useState(null); // State for notifications

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(
                `${GLOBAL_VALUES.serverUrl}/certificates/save`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                setNotification({
                    message: 'Сертификат успешно загружен 😃',
                    type: 'success'
                });
            } else {
                throw new Error('Failed to upload');
            }
        } catch (error) {
            console.error('Ошибка при загрузке сертификата:', error);
            setNotification({
                message: 'Загрузка не удалась 😞',
                type: 'error'
            });
        }

        setTimeout(() => setNotification(null), 7000);
    };

    return (
        <div
            className="absolute flex h-fit items-center justify-center rounded-2xl"
            style={{
                boxShadow:
                    'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
            }}
        >
            <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <button
                    className="absolute right-2 top-0 text-2xl text-gray-500 hover:scale-105 hover:text-black"
                    onClick={() => {
                        setImage(null);
                        setIsFormShown(false);
                    }}
                >
                    &times;
                </button>
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                    Загрузка сертификата
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Выберите изображение сертификата
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2 w-full rounded-lg border p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Загрузить
                    </button>
                </form>

                {/* Notification Message */}
                {notification && (
                    <p
                        className={`mt-4 text-center ${notification.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {notification.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UploadCertificateForm;
