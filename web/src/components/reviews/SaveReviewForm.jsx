import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';
import StarRating from '../common/StarRating';
import getCroppedImg from '../../utils/ImageCroppers';
import { setIsReviewSent } from '../../store/reviewSlice';

export default function SaveReviewForm({ formHolderRef }) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [operationStatusMessage, setOperationStatusMessage] = useState('');
    const [userPicFile, setUserPicFile] = useState('');
    const stars = useSelector((state) => state.review).stars;

    const isReviewSent = useSelector((state) => state.review).isReviewSent;
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        if (formHolderRef.current) {
            formHolderRef.current.style.display = 'none';
        }
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();

        useEffect(() => {
            if (formHolderRef.current) {
                formHolderRef.current.style.display = 'none';
            }
        }, []);
        if (isReviewSent) {
            return;
        }

        const reviewData = { name, surname, stars, reviewText };

        if (!validateFormInputs(reviewData)) {
            return;
        }

        const userReviewRes = await fetch(
            GLOBAL_VALUES.serverUrl + '/reviews/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            }
        );

        const savedReview = await userReviewRes.json();
        const picSaveRes =
            userPicFile !== '' && (await saveUserPic(savedReview.id));

        const didSaveReview = userReviewRes.status === 200;
        const didSaveImageOrDecideNotTo =
            userPicFile === '' || picSaveRes.status === 200;
        dispatch(setIsReviewSent(didSaveReview && didSaveImageOrDecideNotTo));

        setOperationStatusMessage(
            userReviewRes.status === 200
                ? 'Благодарим за оставленный отзыв! ✅'
                : 'Ошибка при добавлении нового отзыва. ❌'
        );
    }

    function validateFormInputs({ name, surname, stars, reviewText }) {
        if (name.length < 2) {
            setOperationStatusMessage('Пожалуйста, укажите своё имя ❌');
            return false;
        } else if (name.length > 50) {
            setOperationStatusMessage('Слишком длинное имя ❌');
            return false;
        } else if (surname.length < 2) {
            setOperationStatusMessage('Пожалуйста, укажите свою фамилию ❌');
            return false;
        } else if (surname.length > 70) {
            setOperationStatusMessage('Слишком длинная фамилия ❌');
            return false;
        } else if (stars === 0) {
            setOperationStatusMessage('Пожалуйста, оставьте оценку ⭐');
            return false;
        } else if (reviewText.length < 10) {
            setOperationStatusMessage(
                'Пожалуйста, напишите отзыв (от 3-ёх слов) ❌'
            );
            return false;
        } else if (reviewText.length > 10000) {
            setOperationStatusMessage(
                'Лимит символов отзыва привышен (10 000) ❌'
            );
            return false;
        }
        return true;
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

    const [isCropped, setIsCropped] = useState(false);

    const UserPicCropper = () => {
        const [userPicCropped, setUserPicCropped] = useState(null);
        const [userPicBase64, setUserPicBase64] = useState('');
        const [crop, setCrop] = useState({ x: 0, y: 0 });
        const [zoom, setZoom] = useState(1);
        const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

        useEffect(() => {
            async function readFile() {
                const base64Image = await toBase64(userPicFile);
                setUserPicBase64(base64Image);
            }

            readFile();
        }, []);

        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                // reader.onerror = reject;
            });

        const onCropComplete = (croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
        };

        const onZoomChange = (event) => {
            setZoom(event.target.value);
        };

        useEffect(() => {
            async function proccessImageCrop() {
                if (isCropped) {
                    return;
                }

                const blobImage = await getCroppedImg(
                    userPicBase64,
                    userPicFile.type,
                    croppedAreaPixels
                );

                const file = new File([blobImage], userPicFile.name, {
                    type: userPicFile.type
                });

                setUserPicCropped(file);
            }
            proccessImageCrop();
        }, [croppedAreaPixels]);

        return (
            <div className="flex flex-col gap-3">
                <div
                    className={`relative ${isCropped ? 'h-auto' : 'h-[300px]'} w-full max-mobile:h-[200px]`}
                >
                    {isCropped ? (
                        <div className="w-full">
                            <img
                                src={userPicBase64}
                                className="mx-auto my-2 w-1/2"
                                style={{
                                    borderRadius: '50%',
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
                                }}
                                alt="превью обрезанной фотографии"
                            />
                        </div>
                    ) : (
                        <Cropper
                            image={userPicBase64}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    )}
                </div>
                {!isCropped && (
                    <div className="flex flex-col gap-2">
                        <div>
                            <div className="flex w-full justify-center">
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Увеличение"
                                    onChange={onZoomChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="form-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsCropped(true);
                                    setUserPicFile(userPicCropped);
                                }}
                            >
                                Обрезать фото
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={'absolute z-50 w-full justify-center'}>
            <div
                className="z-50 mx-auto w-1/4 p-4 max-laptop:w-1/3 max-mobile:w-full"
                ref={formHolderRef}
            >
                <form
                    onSubmit={handleFormSubmit}
                    className={
                        'relative mb-4 rounded-lg bg-white px-10 pb-8 pt-6' +
                        ' max-mobile:px-3'
                    }
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
                    }}
                >
                    <div
                        id={'close-sign-holder'}
                        className={'absolute right-2 top-0 flex justify-end'}
                    >
                        <div
                            id="form-close-sign"
                            className={
                                'select-none p-2 text-right font-mono text-4xl font-bold transition-colors' +
                                ' hover:cursor-pointer hover:rounded-full hover:bg-blue-400 hover:text-white' +
                                ' max-mobile:text-2xl'
                            }
                            onClick={() => {
                                // setIsFormActive(false)
                                formHolderRef.current.style.display = 'none';
                            }}
                        >
                            &times;
                        </div>
                    </div>
                    <div
                        id="inputs-holder"
                        className={'flex flex-col gap-5' + ' max-mobile:gap-1'}
                    >
                        <div>
                            <label className="form-label">Имя</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-input-form-field"
                            />
                        </div>
                        <div>
                            <label className="form-label">Фамилия</label>
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className="text-input-form-field"
                            />
                        </div>
                        <div>
                            <label className="form-label">Оценка</label>
                            <StarRating stars={0} isDefaultChecked={false} />
                        </div>
                        <div>
                            <label className="form-label">Отзыв</label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="text-input-form-field min-h-[100px]"
                            ></textarea>
                        </div>
                        <div>
                            <label className="form-label">
                                Ваша фотография (к пожеланию)
                            </label>
                            <input
                                className="mb-2 w-full"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setUserPicFile(e.target.files[0]);
                                    setIsCropped(false);
                                }}
                            />
                        </div>
                    </div>
                    {userPicFile && <UserPicCropper />}
                    <div
                        id="buttons"
                        className={`mt-3 flex w-full justify-around ${isMobile ? 'flex-col gap-3' : 'gap-1'}`}
                    >
                        <button type="submit" className="form-button">
                            Оставить отзыв
                        </button>
                    </div>
                    <div className={'absolute'}>{operationStatusMessage}</div>
                </form>
            </div>
        </div>
    );
}
