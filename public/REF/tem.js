import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import MultiCrops from 'react-multi-crops';
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.

function useDebounceEffect(fn, waitTime, deps) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.apply(undefined, deps);
        }, waitTime);
        return () => {
            clearTimeout(t);
        };
    }, deps);
}

const TO_RADIANS = Math.PI / 180;
async function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('No 2d context');
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    // const pixelRatio = 1
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    ctx.save();
    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 3) Rotate around the origin
    ctx.rotate(rotateRads);
    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
    ctx.restore();
}

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(makeAspectCrop({
        unit: '%',
        width: 90,
    }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
}

let previewUrl = '';
function toBlob(canvas) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve);
    });
}
// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
async function imgPreview(image, crop, scale = 1, rotate = 0) {
    const canvas = document.createElement('canvas');
    canvasPreview(image, canvas, crop, scale, rotate);
    const blob = await toBlob(canvas);
    if (!blob) {
        console.error('Failed to create blob');
        return '';
    }
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }
    previewUrl = URL.createObjectURL(blob);
    return previewUrl;
}

export default function App() {
    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    // const [crop, setCrop] = useState();
    const crop = {
        unit: "%",
        x: 15.5,
        y: 6.5,
        width: 74,
        height: 88
    }
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState(16 / 9);
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            // setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () => { var _a; return setImgSrc(((_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString()) || ''); });
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            // setCrop(centerAspectCrop(width, height, aspect));
        }
    }
    useDebounceEffect(async () => {
        if ((completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.width) &&
            (completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.height) &&
            imgRef.current &&
            previewCanvasRef.current) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(imgRef.current, previewCanvasRef.current, crop, scale, rotate);
            // imgPreview(imgRef.current, completedCrop, scale, rotate)
        }
    }, 100, [completedCrop, scale, rotate]);
    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined);
        }
        else if (imgRef.current) {
            const { width, height } = imgRef.current;
            setAspect(16 / 9);
            // setCrop(centerAspectCrop(width, height, 16 / 9));
        }
    }
    return (
        <div className="App">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                {/* <div>
                    <button onClick={handleToggleAspectClick}>
                        Crop {aspect ? 'off' : 'on'}
                    </button>
                </div> */}
            </div>
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                // onChange={(_, percentCrop) => setCrop(percentCrop)}
                // onComplete={(c) => setCompletedCrop(c)}
                // aspect={aspect}
                >
                    {console.log(previewCanvasRef)}
                    <img
                        // width="50%"
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            <div>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: crop.width,
                        height: crop.height,
                    }}
                />

                {/* <img src={imgSrc}
                        style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />

                    <div
                        style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            // width: completedCrop.width,
                            // height: completedCrop.height,
                        }}
                    >
                        <MultiCrops
                            src={previewCanvasRef}
                            width={"100%"}
                        />
                    </div> */}
            </div>
        </div >
    )
}