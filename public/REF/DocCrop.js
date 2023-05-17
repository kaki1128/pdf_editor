import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import MultiCrops from 'react-multi-crops';

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

async function canvasPreview(image, canvas, crop) {
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

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    ctx.save();
    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
    ctx.restore();
}

// let previewUrl = '';
// function toBlob(canvas) {
//     return new Promise((resolve) => {
//         canvas.toBlob(resolve);
//     });
// }

export default function App() {
    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const crop = {
        unit: "%",
        x: 15.3,
        y: 6.5,
        width: 74,
        height: 88
    }

    // Size
    const [renderSize, setRenderSize] = useState([0, 0]);

    // const [renderHeight, setRenderHeight] = useState();
    const getRenderSize = () => {
        const newSize = [imgRef.current.clientWidth, imgRef.current.clientHeight];
        setRenderSize(newSize);
    }
    // Update 'width' at begining
    useEffect(() => {
        if (imgRef.current) {
            setRenderSize([imgRef.current.offsetWidth, imgRef.current.offsetHeight])
        }
    }, [imgSrc])
    // Update 'width' when the window resizes
    useEffect(() => {
        window.addEventListener("resize", getRenderSize);
    }, []);

    const completedCrop = {
        unit: "px",
        x: renderSize[0] * crop.x / 100,
        y: renderSize[1] * crop.y / 100,
        width: renderSize[0] * crop.width / 100,
        height: renderSize[1] * crop.height / 100
    };
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => { var _a; return setImgSrc(((_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString()) || ''); });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const [previewUrl, setPreviewUrl] = useState("");
    const [isValid, setIsValid] = useState(false);
    useDebounceEffect(async () => {
        if ((completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.width) &&
            (completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.height) &&
            imgRef.current &&
            previewCanvasRef.current) {
            canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
            setIsValid(true)
        }
    }, 10, [completedCrop]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         previewCanvasRef.current.toBlob(
    //             (blob) => {
    //                 setPreviewUrl(window.URL.createObjectURL(blob));
    //                 console.log(previewUrl)
    //             },
    //             { useCORS: true },
    //             'image/wbmp');
    //     }, 500);

    // }, [imgRef])
    useEffect(() => {
        previewCanvasRef.current.toBlob(
            (blob) => {
                setPreviewUrl(window.URL.createObjectURL(blob));
            },
            { useCORS: true },
            'image/wbmp');
    }, [isValid])


    // const canvas = document.getElementById('canvas');
    // const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    // // canvasPreview(image, canvas, crop, scale, rotate);
    // const blob = toBlob(canvas);
    // if (!blob) {
    //     console.error('Failed to create blob');
    //     return '';
    // }
    // if (previewUrl) {
    //     URL.revokeObjectURL(previewUrl);
    // }
    // previewUrl = URL.createObjectURL(blob);
    // const handleSave = (params) => {
    //     previewCanvasRef.current.toBlob(
    //         (blob) => {
    //             const previewUrl = window.URL.createObjectURL(blob);
    //             console.log(previewUrl)
    //         },
    //         { useCORS: true },
    //         'image/wbmp');
    // }

    return (
        <div className="App">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                {!!imgSrc && (
                    <ReactCrop crop={crop} crossorigin='anonymous'>
                        <img ref={imgRef} src={imgSrc} style={{ height: "1px" }} />
                    </ReactCrop>
                )}
            </div>

            <div>
                <canvas
                    id='canvas'
                    ref={previewCanvasRef}
                    style={{
                        objectFit: 'contain',
                        height: "1px"
                    }}
                />



                {/* <img src={previewUrl}
                    style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: "500px",
                    }}
                /> */}

                <div
                    style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        // width: completedCrop.width,
                        // height: completedCrop.height,
                    }}
                >
                    <MultiCrops
                        src={previewUrl}
                        width={"100%"}
                    />
                </div>
            </div>
        </div >
    )
}