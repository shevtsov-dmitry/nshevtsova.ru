import { useEffect, useState } from 'react';

export default function EstateManagmentForm(type) {
    const TYPE = {
        ADD: 'ADD',
        EDIT: 'EDIT'
    };

    const [windowViewText, setWindowViewText] = useState('');
    const [mainPicture, setMainPicture] = useState()
    const [imageFiles, setImageFiles] = useState([]); // State to hold multiple images

    const saveData = {
        'estate': {
            'address': 'г. Пенза, Молодежная улица, дом 18Б, 2 подъезд, 12 квартира',
            'estateType': 'APARTMENT',
            'price': 4189846
        },
        'innerAttributes': {
            'totalSizeSquareMeters': 39.30958579153774,
            'kitchenSizeSquareMeters': 8.256482524320505,
            'roomsAmount': 3,
            'hasFinishing': true,
            'ceilHeight': 2.2883490201411467,
            'toiletsAmount': 1
        },
        'outerAttributes': {
            'hasParking': false,
            'windowViewDescription': 'clcwlsfvdtnojedthotlmvphiamvwvsfjvmmltraieouknkbcxdgwuancitdaeuaurgvjfmkabqgtoeicmrleil',
            'releaseDate': 1954,
            'floor': 7,
            'allFloors': 13
        }
    };

    useEffect(() => {
        if (mainPicture !== null) {
            console.log(mainPicture)
        }
    }, [mainPicture])

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
    const renderImages = () => {
        return imageFiles.map((file, index) => (
            <div key={index} className="relative inline-block">
                <img src={URL.createObjectURL(file)} alt={`upload-${index}`} className="uploaded-image" />
                <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove image"
                >
                    &times; {/* Close sign */}
                </button>
                <button
                    onClick={() => setMainPicture(index)}
                    className={`absolute bottom-0 left-0 bg-green-500 text-white rounded-full p-1 ${mainPicture === index ? 'border-2 border-yellow-500' : ''}`}
                    aria-label="Set as main image"
                >
                    ✔ {/* Check sign */}
                </button>
            </div>
        ));
    };

    return (
        <div className="absolute w-full h-full flex justify-center items-center z-20">
            <div className={'bg-white w-1/3 h-4/5 rounded p-5'}>
                {/* {type === TYPE.ADD ? <h1>Добавить новую недвижимость</h1> : <h1>Редактировать</h1>} */}
                <form id="estate-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2">
                    <div className={'form-attribute-input'}>
                        <label className={'flex-1'}>Адрес</label>
                        <input type="text" className={'flex-[5]'} />
                    </div>

                    <div className={'flex gap-2 items-center'}>
                        <label>Тип недвижимости</label>
                        <select className={'w-fit py-2 px-1 rounded'}>
                            <option value="APARTMENT">Квартира</option>
                            <option value="HOUSE">Дом</option>
                        </select>
                    </div>
                    <div className={'form-attribute-input'}>
                        <label>Цена</label>
                        <input type="number" />
                    </div>
                    <div className="flex">
                        <div>
                            <label className="upload-picture-label">
                                Загрузите фотографии недвижимости
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple // Allow multiple file uploads
                                onChange={handleFileChange} // Use the new handler
                            />
                        </div>
                        <div id='images-pool'>
                            {renderImages()} {/* Display uploaded images */}
                        </div>
                    </div>
                    <hr />
                    <div className="flex gap-5 flex-shrink-0">
                        <div className="flex-1">
                            <label>Внешние характеристики</label>
                            <hr className={'py-1'} />
                            <div className={'inner-outer-attributes-holder'}>
                                <div className="form-attribute-input">
                                    <label>Размер кватиры (м²)</label>
                                    <input type="number"
                                        placeholder={'57,9'} />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Размер кухни (м²)</label>
                                    <input type="number"
                                        placeholder={'23,5'}
                                    />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Количество комнат</label>
                                    <input type="number"
                                        placeholder={'2'}
                                    />
                                </div>
                                <div className="form-attribute-checkbox">
                                    <label>Наличие отделки</label>
                                    <input type="checkbox"
                                        className={'checkbox-shift-fix'} />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Высота потолков (м)</label>
                                    <input type="number"
                                        placeholder={'2.2'}
                                    />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Количество санузлов</label>
                                    <input type="number"
                                        placeholder={'1'} />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label>Внутренние характеристики</label>
                            <hr className={'py-1'} />
                            <div className={'inner-outer-attributes-holder'}>
                                <div className="form-attribute-checkbox">
                                    <label>Наличие парковки</label>
                                    <input type="checkbox"
                                        className={'checkbox-shift-fix'} />
                                </div>
                                <div className="form-attribute-input flex-col">
                                    <label>Описание вида из окон</label>
                                    <textarea
                                        className="focus:shadow-outline min-h-[60px] w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none text-sm"
                                        value={windowViewText}
                                        onChange={(e) => setWindowViewText(e.target.value)}
                                    ></textarea>
                                    {/*<input type="text" />*/}
                                </div>
                                <div className="form-attribute-input">
                                    <label>Год сдачи</label>
                                    <input type="number" />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Этаж</label>
                                    <input type="number" />
                                </div>
                                <div className="form-attribute-input">
                                    <label>Всего этажей</label>
                                    <input type="number" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}