import { useState } from "react";
import { useSelector } from "react-redux";

export default function PhoneNumbers() {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const isMobile = window.innerWidth <= 768;
    const [saveNumberNotification, setSaveNumberNotification] = useState(false);

    function copyPhoneNumber(el) {
        navigator.clipboard.writeText(el.currentTarget.textContent);
        saveHideSaveNumberNotification();
    }

    function saveHideSaveNumberNotification() {
        setSaveNumberNotification(true);
        setTimeout(() => setSaveNumberNotification(false), 2000);
    }

    return (
        <div
            id="phone-number"
            className={`flex items-center gap-3 max-mobile:flex-col`}
        >
            <img src="images/footer/phone.png" className={`w-[17%]`} />
            <div className="flex flex-col gap-1">
                <div className="phone-number-ul">
                    <button
                        className="phone-number-p underline"
                        onClick={copyPhoneNumber}
                    >
                        {GLOBAL_VALUES.phoneNumber}
                    </button>
                </div>
                <div className="phone-number-ul">
                    <button
                        className="phone-number-p underline"
                        onClick={copyPhoneNumber}
                    >
                        {GLOBAL_VALUES.additionalPhoneNumber}
                    </button>
                    {saveNumberNotification && (
                        <div className={'saved-message'}>номер сохранён</div>
                    )}
                </div>
            </div>
        </div>
    );
}
