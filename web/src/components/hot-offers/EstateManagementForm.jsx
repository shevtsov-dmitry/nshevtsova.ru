import { useEffect, useState } from 'react';

export default function EstateManagementForm(type) {
    const TYPE = {
        ADD: 'ADD',
        EDIT: 'EDIT'
    };

    const [windowViewText, setWindowViewText] = useState('');
    const [mainPictureIdx, setMainPictureIdx] = useState();
    const [imageFiles, setImageFiles] = useState([]); // State to hold multiple images

    const saveData = {
        estate: {
            address:
                'г. Пенза, Молодежная улица, дом 18Б, 2 подъезд, 12 квартира',
            estateType: 'APARTMENT',
            price: 4189846
        },
        innerAttributes: {
            totalSizeSquareMeters: 39.30958579153774,
            kitchenSizeSquareMeters: 8.256482524320505,
            roomsAmount: 3,
            hasFinishing: true,
            ceilHeight: 2.2883490201411467,
            toiletsAmount: 1
        },
        outerAttributes: {
            hasParking: false,
            description:
                'clcwlsfvdtnojedthotlmvphiamvwvsfjvmmltraieouknkbcxdgwuancitdaeuaurgvjfmkabqgtoeicmrleil',
            releaseDate: 1954,
            floor: 7,
            allFloors: 13
        }
    };

    useEffect(() => {
        if (mainPictureIdx !== null) {
            console.log(mainPictureIdx);
        }
    }, [mainPictureIdx]);

    function handleSubmit(e) {
        e.preventDefault();
    }

    // Function to handle file selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]); // Add new files to the existing array
    };

    // Function to handle file removal
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
                            aria-label="Remove image" >
                            &times;
                        </button>
                        <button
                            onClick={() => setMainPictureIdx(index)}
                            className={`absolute right-5 top-0 scale-90 rounded-full px-1 text-white ${mainPictureIdx === index ? ' bg-green-500' : 'bg-gray-300'}`}
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
                className={`bg-white ${window.height < 1500 ? 'w-1/2' : 'w-1/3'} min-h-4/5 rounded-xl p-5`}
            >
                {/* {type === TYPE.ADD ? <h1>Добавить новую недвижимость</h1> : <h1>Редактировать</h1>} */}
                <form
                    id="estate-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2"
                >
                    {/* <div className='absolute'>
                            &times;
                    </div> */}
                    <div className={'form-attribute-input'}
                        style={{ justifyContent: 'flex-start' }}>
                        {/*TODO integrate address picker with: npm i react-google-autocomplete --save */}
                        <label>Адрес</label>
                        <input
                            type="text"
                            className={'w-[88%]'}
                            placeholder={
                                'г. Воронеж, Ленинский проспект, дом 5Б, 2 подъезд, 38 кабинет'
                            }
                        />
                    </div>
                    <div className={'flex items-center justify-around gap-1'}>
                        <div className={'form-attribute-input'}>
                            <label>Цена</label>
                            <input type="number" placeholder={'4 199 000'} />
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <label>Тип недвижимости</label>
                            <select className={'number-selector'}>
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
                                multiple // Allow multiple file uploads
                                onChange={handleFileChange} // Use the new handler
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
                                    <input type="number" placeholder={'57,9'} />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Размер кухни (м²)</label>
                                    <input type="number" placeholder={'23,5'} />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Количество комнат</label>
                                    <input type="number" placeholder={'2'} />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Высота потолков (м)</label>
                                    <input type="number" placeholder={'2.2'} />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Количество санузлов</label>
                                    <input type="number" placeholder={'1'} />
                                </div>
                                <div className="form-attribute-checkbox">
                                    <label>Наличие отделки</label>
                                    <input
                                        type="checkbox"
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
                                        className="focus:shadow-outline min-h-[60px] w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                                        value={windowViewText}
                                        onChange={(e) =>
                                            setWindowViewText(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="flex flex-shrink-0 gap-2">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <div className="selector-holder">
                                            <label>Год сдачи</label>
                                            <select className="number-selector">
                                                {[...Array(100).keys()].map(
                                                    (num) => {
                                                        const year =
                                                            new Date().getFullYear() -
                                                            num; // Current year minus num
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
                                            <select className="floor-selector number-selector">
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
                                            <select className="floor-selector number-selector">
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
                                    <div classsName="flex-1">
                                        <div className="form-attribute-checkbox">
                                            <label>Наличие парковки</label>
                                            <input
                                                type="checkbox"
                                                className={'checkbox-shift-fix'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <button
                            className="w-fit select-none rounded-lg bg-white px-4 pb-2 pt-1 font-ptsans-bold text-2xl transition-all hover:scale-105"
                            style={{
                                boxShadow:
                                    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            }}>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

