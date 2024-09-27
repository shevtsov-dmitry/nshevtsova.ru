import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function EstateManagementForm(type) {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const SERVER_URL = GLOBAL_VALUES.serverUrl;

    const TYPE = {
        ADD: 'ADD',
        EDIT: 'EDIT'
    };

    const [estateJson, setEstateJson] = useState({
        estate: {
            address: '',
            estateType: 'APARTMENT',
            price: 0
        },
        innerAttributes: {
            totalSizeSquareMeters: '',
            kitchenSizeSquareMeters: '',
            roomsAmount: '',
            hasFinishing: false,
            ceilHeight: '',
            toiletsAmount: ''
        },
        outerAttributes: {
            hasParking: false,
            description: '',
            releaseDate: '',
            floor: 0,
            allFloors: 0
        }
    });

    const [mainPictureIdx, setMainPictureIdx] = useState();
    const [imageFiles, setImageFiles] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Function to handle input changes
    const handleFormInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name in estateJson) {
            setEstateJson((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        } else {
            const [outerKey, innerKey] = name.split('.');
            setEstateJson((prev) => ({
                ...prev,
                [outerKey]: {
                    ...prev[outerKey],
                    [innerKey]: type === 'checkbox' ? checked : value
                }
            }));
        }
    };

    async function handleFormSubmit(e) {
        e.preventDefault();

        const resEstate = await fetch(`${SERVER_URL}/estates/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estateJson)
        });
        if (!resEstate.ok) {
            console.error('Error saving estate json:', resEstate.statusText);
            setNotification({ message: 'Ошибка при сохранении недвижимости.', type: 'error' });
            return;
        }

        const estateId = await resEstate.text();

        const imageFormData = new FormData();
        imageFormData.append('estateId', estateId);
        imageFiles.forEach((file) => {
            imageFormData.append('images', file);
        });

        const resImagesSave = await fetch(`${SERVER_URL}/estates/images/save`, {
            method: 'POST',
            body: imageFormData
        });

        if (resImagesSave.status !== 200) {
            let errMes = await resImagesSave.json();
            errMes = errMes["message"];
            console.error(errMes);
            setNotification({ message: 'Ошибка при сохранении изображений.', type: 'error' });
            return;
        }

        setNotification({ message: 'Недвижимость успешно сохранена!', type: 'success' });
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]); // Add new files to the existing array
    };

    const handleRemoveImage = (index) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the image at the specified index
    };

    // Function to render uploaded images with delete option
    const displayRenderImages = () => {
        return (
            <div className={'grid grid-cols-3 gap-2'}>
                {imageFiles.map((file, index) => (
                    <div key={index} className="relative inline-block">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`upload-${index}`}
                            className="uploaded-image"
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute right-0 top-0 scale-90 rounded-full bg-red-500 px-1 text-white"
                            aria-label="Remove image"
                        >
                            &times;
                        </button>
                        <button
                            onClick={() => setMainPictureIdx(index)}
                            className={`absolute right-5 top-0 scale-90 rounded-full px-1 text-white ${mainPictureIdx === index ? 'bg-green-500' : 'bg-gray-300'}`}
                            aria-label="Set as main image"
                        >
                            ✓
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="absolute z-20 flex h-full w-full items-center justify-center">
            <div
                id="form-holder"
                className={`min-h-4/5 w-1/3 rounded-xl bg-white p-5 max-laptop:w-2/3 max-mobile:mx-6 max-mobile:w-full`}
            >
                <form id="estate-form" className="flex flex-col gap-2">
                    <div
                        className={'form-attribute-input'}
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <label>Адрес</label>
                        <input
                            type="text"
                            name="address"
                            value={estateJson.estate.address}
                            onChange={handleFormInputChange}
                            className={'w-[88%]'}
                            placeholder={
                                'г. Воронеж, Ленинский проспект, дом 5Б, 2 подъезд, 38 кабинет'
                            }
                        />
                    </div>
                    <div className={'flex items-center justify-around gap-1'}>
                        <div className={'form-attribute-input'}>
                            <label>Цена</label>
                            <input
                                type="number"
                                name="price"
                                value={estateJson.estate.price}
                                onChange={handleFormInputChange}
                                placeholder={'4 199 000'}
                            />
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <label>Тип недвижимости</label>
                            <select
                                name="estateType"
                                value={estateJson.estate.estateType}
                                onChange={handleFormInputChange}
                                className={'number-selector'}
                            >
                                <option value="APARTMENT">Квартира</option>
                                <option value="HOUSE">Дом</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            <label className="upload-picture-label">
                                Загрузите фотографии недвижимости.{' '}
                                <span className={'text-green-500'}>✓</span> -
                                заглавная картинка.
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div id="images-pool">{displayRenderImages()}</div>
                    <div className="flex flex-shrink-0 gap-5">
                        <div className="flex-1">
                            <label>Внешние характеристики</label>
                            <hr className={'py-1'} />
                            <div className={'inner-outer-attributes-holder'}>
                                <div className="form-attribute-input">
                                    <label>Размер квартиры (м²)</label>
                                    <input
                                        type="number"
                                        name="innerAttributes.totalSizeSquareMeters"
                                        value={
                                            estateJson.innerAttributes
                                                .totalSizeSquareMeters
                                        }
                                        onChange={handleFormInputChange}
                                        placeholder={'57,9'}
                                    />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Размер кухни (м²)</label>
                                    <input
                                        type="number"
                                        name="innerAttributes.kitchenSizeSquareMeters"
                                        value={
                                            estateJson.innerAttributes
                                                .kitchenSizeSquareMeters
                                        }
                                        onChange={handleFormInputChange}
                                        placeholder={'23,5'}
                                    />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Количество комнат</label>
                                    <input
                                        type="number"
                                        name="innerAttributes.roomsAmount"
                                        value={
                                            estateJson.innerAttributes
                                                .roomsAmount
                                        }
                                        onChange={handleFormInputChange}
                                        placeholder={'2'}
                                    />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Высота потолков (м)</label>
                                    <input
                                        type="number"
                                        name="innerAttributes.ceilHeight"
                                        value={
                                            estateJson.innerAttributes
                                                .ceilHeight
                                        }
                                        onChange={handleFormInputChange}
                                        placeholder={'2.2'}
                                    />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Количество санузлов</label>
                                    <input
                                        type="number"
                                        name="innerAttributes.toiletsAmount"
                                        value={
                                            estateJson.innerAttributes
                                                .toiletsAmount
                                        }
                                        onChange={handleFormInputChange}
                                        placeholder={'1'}
                                    />
                                </div>
                                <div className="form-attribute-checkbox">
                                    <label>Наличие отделки</label>
                                    <input
                                        type="checkbox"
                                        name="innerAttributes.hasFinishing"
                                        checked={
                                            estateJson.innerAttributes
                                                .hasFinishing
                                        }
                                        onChange={handleFormInputChange}
                                        className={'checkbox-shift-fix'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label>Внутренние характеристики</label>
                            <hr className={'py-1'} />
                            <div className={'inner-outer-attributes-holder'}>
                                <div className="form-attribute-input flex-col">
                                    <label>Описание</label>
                                    <textarea
                                        name="outerAttributes.description"
                                        value={
                                            estateJson.outerAttributes
                                                .description
                                        }
                                        onChange={handleFormInputChange}
                                        className="focus:shadow-outline min-h-[60px] w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                                    ></textarea>
                                </div>
                                <div className="flex flex-shrink-0 gap-2">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <div className="selector-holder">
                                            <label>Год сдачи</label>
                                            <select
                                                name="outerAttributes.releaseDate"
                                                value={
                                                    estateJson.outerAttributes
                                                        .releaseDate
                                                }
                                                onChange={handleFormInputChange}
                                                className="number-selector"
                                            >
                                                {[...Array(100).keys()].map(
                                                    (num) => {
                                                        const year =
                                                            new Date().getFullYear() -
                                                            num;
                                                        return (
                                                            <option
                                                                key={year}
                                                                value={year}
                                                            >
                                                                {year}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                        <div className="selector-holder flex-1">
                                            <label>Этаж</label>
                                            <select
                                                name="outerAttributes.floor"
                                                value={
                                                    estateJson.outerAttributes
                                                        .floor
                                                }
                                                onChange={handleFormInputChange}
                                                className="floor-selector number-selector"
                                            >
                                                {[...Array(26).keys()].map(
                                                    (num) => (
                                                        <option
                                                            key={num}
                                                            value={num - 1}
                                                        >
                                                            {num - 1}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div className="selector-holder flex-1">
                                            <label>Всего этажей</label>
                                            <select
                                                name="outerAttributes.allFloors"
                                                value={
                                                    estateJson.outerAttributes
                                                        .allFloors
                                                }
                                                onChange={handleFormInputChange}
                                                className="floor-selector number-selector"
                                            >
                                                {[...Array(25).keys()].map(
                                                    (num) => (
                                                        <option
                                                            key={num + 1}
                                                            value={num + 1}
                                                        >
                                                            {num + 1}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="form-attribute-checkbox">
                                            <label>Наличие парковки</label>
                                            <input
                                                type="checkbox"
                                                name="outerAttributes.hasParking"
                                                checked={
                                                    estateJson.outerAttributes
                                                        .hasParking
                                                }
                                                onChange={handleFormInputChange}
                                                className={'checkbox-shift-fix'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <button
                            className="w-fit select-none rounded-lg bg-white px-4 pb-2 pt-1 font-ptsans-bold text-2xl transition-all hover:scale-105"
                            style={{
                                boxShadow:
                                    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            }}
                            onClick={handleFormSubmit}
                        >
                            Сохранить
                        </button>
                    </div>
                    {notification.message && (
                        <div className={`mt-2 p-2 rounded text-center ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {notification.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
