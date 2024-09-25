import { useState } from 'react';

export default function EstateManagmentForm(type) {
    const TYPE = {
        ADD: 'ADD',
        EDIT: 'EDIT'
    };

    const [windowViewText, setWindowViewText] = useState("")

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


    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="absolute w-full h-full flex justify-center items-center z-20">
            <div className={'bg-white w-1/3 h-4/5 rounded p-5'}>
                {/* {type === TYPE.ADD ? <h1>Добавить новую недвижимость</h1> : <h1>Редактировать</h1>} */}
                <form id="estate-form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-2">
                    <label>Адрес</label>
                    <input type="text" />
                    <label>Тип недвижимости</label>
                    <select>
                        <option value="APARTMENT">Квартира</option>
                        <option value="HOUSE">Дом</option>
                    </select>
                    <label>Цена</label>
                    <input type="number" />
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
                            <hr className={"py-1"} />
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