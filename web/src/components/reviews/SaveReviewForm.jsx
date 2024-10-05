// SaveReviewForm.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from '../common/StarRating';
import getCroppedImg from '../../utils/ImageCroppers';
import { setIsReviewSent } from '../../store/reviewSlice';
import UserPicCropper from './UserPicCropper'; // Adjust the path as necessary

export default function SaveReviewForm({ formHolderRef }) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [operationStatusMessage, setOperationStatusMessage] = useState('');
    const [userPicFile, setUserPicFile] = useState(null); // Initialize as null
    const stars = useSelector((state) => state.review.stars);

    const isReviewSent = useSelector((state) => state.review.isReviewSent);
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        if (formHolderRef.current) {
            formHolderRef.current.style.display = 'none';
        }
    }, [formHolderRef]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (isReviewSent) {
            return;
        }

        const reviewData = { name, surname, stars, reviewText };

        if (!validateFormInputs(reviewData)) {
            return;
        }

        try {
            const userReviewRes = await fetch(
                `${GLOBAL_VALUES.serverUrl}/reviews/add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                }
            );

            if (!userReviewRes.ok) {
                throw new Error('Failed to add review');
            }

            const savedReview = await userReviewRes.json();

            let picSaveRes = { status: 200 };
            if (userPicFile) {
                picSaveRes = await saveUserPic(savedReview.id);
            }

            const didSaveReview = userReviewRes.status === 200;
            const didSaveImageOrDecideNotTo =
                !userPicFile || picSaveRes.status === 200;
            dispatch(
                setIsReviewSent(didSaveReview && didSaveImageOrDecideNotTo)
            );

            setOperationStatusMessage(
                userReviewRes.status === 200
                    ? 'Благодарим за оставленный отзыв! ✅'
                    : 'Ошибка при добавлении нового отзыва. ❌'
            );
        } catch (error) {
            console.error(error);
            setOperationStatusMessage(
                'Произошла ошибка при отправке отзыва. ❌'
            );
        }
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
                'Лимит символов отзыва превышен (10 000) ❌'
            );
            return false;
        }
        return true;
    }

    async function saveUserPic(reviewId) {
        const formData = new FormData();
        formData.append('reviewId', reviewId);
        formData.append('userPic', userPicFile);

        const response = await fetch(
            `${GLOBAL_VALUES.serverUrl}/reviews/user-pics/save`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error('Failed to save user picture');
        }

        return response;
    }

    const [isCropped, setIsCropped] = useState(false);

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
                                'select-none p-2 text-right font-mono text-4xl font-bold transition-colors hover:cursor-pointer' +
                                ' max-mobile:text-2xl'
                            }
                            onClick={() => {
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
                            <StarRating
                                stars={stars}
                                isDefaultChecked={false}
                            />
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
                                    setUserPicFile(e.target.files[0] || null);
                                    setIsCropped(false);
                                }}
                            />
                        </div>
                    </div>
                    {userPicFile && (
                        <UserPicCropper
                            userPicFile={userPicFile}
                            setUserPicFile={setUserPicFile}
                            isCropped={isCropped}
                            setIsCropped={setIsCropped}
                        />
                    )}
                    <div
                        id="buttons"
                        className={`mt-3 flex w-full justify-around ${
                            isMobile ? 'flex-col gap-3' : 'gap-1'
                        }`}
                    >
                        <button type="submit" className="form-button">
                            Оставить отзыв
                        </button>
                    </div>
                    <p
                        className={`absolute left-0 mt-1 flex w-full justify-center text-center text-sm ${
                            isReviewSent ? 'text-green-700' : 'text-red-900'
                        }`}
                    >
                        {operationStatusMessage}
                    </p>
                </form>
            </div>
        </div>
    );
}
