export default function ServiceBlock(props) {
    const TITLE = props.title
    const DESCRIPTION_LIST = props.description
    const IMAGE_SRC = props.icon

    return (
        <div className="h-auto w-full rounded-[0.75rem] border border-gray-300 grid grid-cols-2 py-[3%] px-[2%]">
            <img src={`${IMAGE_SRC}`} alt="" />
            <h1 className="font-ptsans-bold text-2xl">{TITLE}</h1>
            <div />
            <ul className="flex flex-col gap-2 list-disc marker:text-yellow-400">
                {DESCRIPTION_LIST.map((text, index) => (
                    <li key={index} className="">
                        {text}
                    </li>
                ))}
            </ul>
        </div>

    )
}
