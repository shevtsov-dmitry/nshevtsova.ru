import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';
import StarRating from '../common/StarRating';
import getCroppedImg from '../../utils/ImageCroppers';
import { setIsReviewSent } from '../../store/reviewSlice';

export default function SaveReviewForm({ formHolderRef }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [operationStatusMessage, setOperationStatusMessage] =
        useState('');
    const [userPicFile, setUserPicFile] = useState("");
    const stars = useSelector(state => state.review).stars

    const isReviewSent = useSelector((state) => state.review).isReviewSent
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const dispatch = useDispatch()

    async function handleFormSubmit(e) {
        if (isReviewSent) {
            return;
        }

        e.preventDefault();
        const reviewData = { name, surname, stars, reviewText };

        if (name.length < 2) {
            setOperationStatusMessage("Пожалуйста, укажите своё имя ❌")
            return
        } else if (name.length > 50) {
            setOperationStatusMessage("Слишком длинное имя ❌")
            return
        } else if (surname.length < 2) {
            setOperationStatusMessage("Пожалуйста, укажите свою фамилию ❌")
            return
        } else if (surname.length > 70) {
            setOperationStatusMessage("Слишком длинная фамилия ❌")
            return
        } else if (stars === 0) {
            setOperationStatusMessage("Пожалуйста, оставьте оценку ⭐")
            return
        } else if (reviewText.length < 10) {
            setOperationStatusMessage("Пожалуйста, напишите отзыв (от 3-ёх слов) ❌")
            return
        } else if (reviewText.length > 10000) {
            setOperationStatusMessage("Лимит символов отзыва привышен (10 000) ❌")
            return
        }

        const userReviewRes = await fetch(GLOBAL_VALUES.serverUrl + '/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });

        const savedReview = await userReviewRes.json()
        const picSaveRes = userPicFile !== "" && await saveUserPic(savedReview.id)

        const didSaveReview = userReviewRes.status === 200
        const didSaveImageOrDecideNotTo = userPicFile === "" || picSaveRes.status === 200
        dispatch(setIsReviewSent(didSaveReview && didSaveImageOrDecideNotTo))

        visualizeResponse(isReviewSent);

        function visualizeResponse(statusIsOk) {
            if (statusIsOk) {
                setOperationStatusMessage(
                    'Благодарим за оставленный отзыв! ✅'
                );
            } else {
                setOperationStatusMessage(
                    'Ошибка при добавлении нового отзыва. ❌'
                );
            }
        }


    }

    async function saveUserPic(reviewId) {
        const formData = new FormData();
        formData.append('reviewId', reviewId);
        formData.append('userPic', userPicFile);

        return await fetch(
            GLOBAL_VALUES.serverUrl + '/reviews/user-pics/save',
            {
                method: 'POST',
                body: formData
            }
        );
    }
    useEffect(() => {
        if (formHolderRef.current) {
            formHolderRef.current.style.display = 'none';
        }

    }, []);


    const [isCropped, setIsCropped] = useState(false)

    function UserPicCropper() {
        const [userPicCropped, setUserPicCropped] = useState(null);
        const [userPicBase64, setUserPicBase64] = useState("")
        const [crop, setCrop] = useState({ x: 0, y: 0 })
        const [zoom, setZoom] = useState(1)
        const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)


        useEffect(() => {
            async function readFile() {
                const base64Image = await toBase64(userPicFile);
                setUserPicBase64(base64Image);
            }

            readFile();
        }, [])

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            // reader.onerror = reject;
        });

        const onCropComplete = (croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels)
        }

        const onZoomChange = (event) => {
            setZoom(event.target.value);
        }

        useEffect(() => {
            async function proccessImageCrop() {
                if (isCropped) {
                    return
                }

                const blobImage = await getCroppedImg(
                    userPicBase64,
                    userPicFile.type,
                    croppedAreaPixels,
                )

                const file = new File([blobImage], userPicFile.name, { type: userPicFile.type })

                setUserPicCropped(file)
            }
            proccessImageCrop()

        }, [croppedAreaPixels])

        return (
            <div className=''>
                <div className={`relative ${isCropped ? "h-auto" : "h-[300px]"} max-mobile:h-[200px] w-full`}>
                    {isCropped ? <img
                        src={userPicBase64}
                        className='mx-auto mb-5'
                        alt='превью обрезанной фотографии'
                        style={{ borderRadius: '50%' }}
                    /> : <Cropper
                        image={userPicBase64}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />}
                </div>
                {!isCropped && <div>
                    <div className="w-full flex justify-center">
                        <input className={"bg-pink-400"}
                            type="range"
                            value={zoom}
                            min={1} max={3} step={0.1}
                            aria-labelledby='Увеличение'
                            onChange={onZoomChange} />
                    </div>
                    <div className='w-full flex justify-center'>
                        <button
                            className="my-5 form-button"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsCropped(true)
                                setUserPicFile(userPicCropped)
                            }}>
                            Обрезать фото
                        </button>
                    </div>
                </div>}
                {/* <button className='font-bold font-sans text-2xl bg-white p-2 text-blue-400'> */}
                {/*     OK */}
                {/* </button> */}
            </div>
        )

    }


    return (
        <div className={'absolute z-50 mt-[8%] w-full justify-center'}>
            <div
                className="z-50 mx-auto w-1/4 p-4 max-laptop:w-1/3 max-mobile:w-3/4"
                ref={formHolderRef}
            >
                <form
                    onSubmit={handleFormSubmit}
                    className="mb-4 rounded-lg bg-white px-10 max-mobile:px-4 pb-8 pt-6"
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
                    }}
                >
                    <div
                        id={'close-sign-holder'}
                        className={'mt-[-1rem] flex justify-end'}
                    >
                        <div
                            id="form-close-sign"
                            className={
                                'select-none text-right font-mono text-3xl font-bold hover:cursor-pointer'
                            }
                            onClick={() => {
                                // setIsFormActive(false)
                                formHolderRef.current.style.display =
                                    'none';
                            }}
                        >
                            X
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Имя
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Фамилия
                        </label>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Оценка
                        </label>
                        <StarRating stars={0} isDefaultChecked={false} />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Отзыв
                        </label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="focus:shadow-outline min-h-[100px] w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Ваша фотография (к пожеланию)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setUserPicFile(e.target.files[0])}
                            className="w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 hover:cursor-pointer"
                        />
                    </div>
                    {/* {isCropped && <img src={userPickedImage} />} */}
                    {userPicFile.length !== 0 && <UserPicCropper />}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="form-button"
                        >
                            Оставить отзыв
                        </button>
                        <div className={'absolute mt-[70px]'}>
                            {operationStatusMessage}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
