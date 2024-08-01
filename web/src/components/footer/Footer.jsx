import { useSelector } from "react-redux"

export default function Footer() {
    const GLOBAL_VALUES = useSelector(state => state.globalStringValues)
    return <footer className="w-full h-96 bg-neutral-900">
        <div id="phone-number" className="flex items-center gap-3">
            <img src="images/footer/phone.png" />
            <u className="phone-number-ul">
                <p className="phone-number-p"
                    onClick={el => {
                        navigator.clipboard.writeText(el.currentTarget.textContent)
                    }}
                >{GLOBAL_VALUES.phoneNumber}</p></u>

        </div>
    </footer>
}
