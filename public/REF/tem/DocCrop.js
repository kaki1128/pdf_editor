import React, { useState } from "react";
import ContentImage from "./ContentImage";
import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
import demoImage from "./WaiMing_Blank.jpg";
import { Grid } from "@mui/material";

function DocCrop() {
    const [cropConfig, setCropConfig] = useState(
        // default crop config
        {
            unit: "%",
            width: 30,
            aspect: 16 / 9
        }
    );

    const [imageRef, setImageRef] = useState();

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef,
                crop,
                "croppedImage.jpeg" // destination filename
            );

            // calling the props function to expose
            // croppedImage to the parent component
            // onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        // creating the cropped image from the source image
        const canvas = document.createElement("canvas");
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                // returning an error
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }

                blob.name = fileName;
                // creating a Object URL representing the Blob object given
                const croppedImageUrl = window.URL.createObjectURL(blob);

                resolve(croppedImageUrl);
            }, "image/jpeg");
        });
    }



    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);

    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const image = reader.result;

                setImageToCrop(image);
            });

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <Grid container>
            <input type="file" accept="image/*" onChange={onUploadFile} />
            <Grid item xs={4}>
                <ReactCrop
                    src={imageToCrop}
                    crop={cropConfig}
                    ruleOfThirds
                    onImageLoaded={(imageRef) => setImageRef(imageRef)}
                    onComplete={(cropConfig) => cropImage(cropConfig)}
                    onChange={(cropConfig) => setCropConfig(cropConfig)}
                    onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                    crossorigin="anonymous" // to avoid CORS-related problems
                >
                    <img src={imageToCrop} />
                </ReactCrop>
            </Grid>

            {croppedImage && (
                <Grid item xs={4}>
                    <h2>Cropped Image</h2>
                    <img alt="Cropped Img" src={croppedImage} />
                </Grid>
            )}
        </Grid>
    );
}

export default DocCrop;