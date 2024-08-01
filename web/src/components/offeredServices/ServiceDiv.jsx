export default function ServiceBlock(props) {
    const TITLE = props.title
    const DESCRIPTION_LIST = props.description
    const IMAGE_SRC = props.icon
    console.log(IMAGE_SRC)

    return (
        <div className="h-auto w-full rounded-[0.75rem] border border-gray-300 grid grid-cols-4 grid-rows-3 pr-[5%] py-[4%] gap-2">
            <div className="w-full h-full flex items-center justify-center col-span-1 row-span-1">
                <img className="w-[60%] " src={`${IMAGE_SRC}`} />
            </div>
            <div className="w-full h-full flex items-center col-span-3 row-span-1">
                <h1 className="font-ptsans-bold text-2xl">{TITLE}</h1>
            </div>
            <div className="col-span-1 row-span-3" />
            <ul className="flex flex-col gap-2 list-disc marker:text-yellow-400 col-span-3 row-span-3">
                {DESCRIPTION_LIST.map((text, index) => (
                    <li key={index} className="">
                        {text}
                    </li>
                ))}
            </ul>
        </div>

    )
}
