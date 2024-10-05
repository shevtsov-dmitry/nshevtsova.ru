// UserPicCropper.js
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/ImageCroppers';

export default function UserPicCropper({
    userPicFile,
    setUserPicFile,
    isCropped,
    setIsCropped
}) {
    const [userPicCropped, setUserPicCropped] = useState(null);
    const [userPicBase64, setUserPicBase64] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useEffect(() => {
        async function readFile() {
            if (userPicFile) {
                const base64Image = await toBase64(userPicFile);
                setUserPicBase64(base64Image);
            }
        }

        readFile();
    }, [userPicFile]);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onZoomChange = (event) => {
        setZoom(event.target.value);
    };

    useEffect(() => {
        async function processImageCrop() {
            if (isCropped || !croppedAreaPixels || !userPicBase64) {
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
        processImageCrop();
    }, [croppedAreaPixels, isCropped, userPicBase64, userPicFile]);

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
                                if (userPicCropped) {
                                    setUserPicFile(userPicCropped);
                                }
                            }}
                        >
                            Обрезать фото
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
