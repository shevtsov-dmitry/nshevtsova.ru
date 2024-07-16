export default function Preview() {
    const PREVIEW_IMG_URL = "bg-[url('images/preview/preview-bg-laptop.png')]"
    /* TODO
        if laptop <img src="images/preview-bg.jpg" /> 
public/images/preview/preview-bg-laptop.png */
    return <div className={`${PREVIEW_IMG_URL} w-screen h-screen bg-cover bg-no-repeat bg-center`}> </div>


}
