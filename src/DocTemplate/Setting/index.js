import React, { useEffect, useRef, useState } from "react";
import MultiCrops from "react-multi-crops";
import { Button, Card, CardContent, Grid, InputAdornment, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { FormArray } from "./FormArray";
import _ from "lodash";
import { LoadingButton } from "@mui/lab";
import iojson from 'iojson';
import Nav from "../../Nav";


const DocTemplate = () => {

    const form = useForm();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        unregister,
        setError,
        clearErrors,
        trigger,
        formState: { errors }
    } = form;
    const { fields, append, remove } = useFieldArray({ control, name: "ArrayField" });
    const watchAllFields = watch();

    const onSubmit = (data) => {
        console.log("data", data)
        iojson.exportJSON(data, 'ArrayField')
    }

    // File upload
    const [file, setFile] = useState();
    const handleFileUplaod = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    // Image actual size
    const [actualWidth, setActualWidth] = useState();
    const [actualHeight, setActualHeight] = useState();

    // Image screen size
    const imgRef = useRef();
    const [renderWidth, setRenderWidth] = useState();
    const getRenderSize = () => {
        const newWidth = imgRef.current.clientWidth;
        setRenderWidth(newWidth);
    }
    // Update 'width' at begining
    useEffect(() => {
        if (imgRef.current) {
            setRenderWidth(imgRef.current.offsetWidth)
        }
    }, [])
    // Update 'width' when the window resizes
    useEffect(() => {
        window.addEventListener("resize", getRenderSize);
    }, []);
    //Ratio
    const ratio = actualWidth / renderWidth

    // Docs crop
    const [coordinates, setCoordinates] = useState([]);
    const coData = [];
    const handleOnChange = (coordinate, index, coordinates) => {
        setCoordinates(coordinates);
        const { id, ...rest } = coordinate;
        const coData = {
            id: coordinate.id,
            x: parseInt(coordinate.x * ratio),
            y: parseInt(coordinate.y * ratio),
            height: parseInt(coordinate.height * ratio),
            width: parseInt(coordinate.width * ratio)
        }

        if (
            coordinate.x + coordinate.width > renderWidth ||
            coordinate.y + coordinate.height > actualHeight / ratio ||
            coordinate.x < 0 ||
            coordinate.y < 0
        ) {
            setError(`ArrayField.${index}.bounding`)
        } else {
            clearErrors(`ArrayField.${index}.bounding`)
            if (index + 1 > fields.length) {
                append({ bounding: coData }, { shouldFocus: false });
            } else {
                setValue(`ArrayField.${index}.bounding`, coData);
            }
        }
    };
    const handleOnDelete = (coordinate, index, coordinates) => {
        setCoordinates(coordinates);
        remove(index);
    };

    // Update controller
    coordinates.forEach((data) => {
        coData.push({
            id: data.id,
            x: parseInt(data.x * ratio),
            y: parseInt(data.y * ratio),
            height: parseInt(data.height * ratio),
            width: parseInt(data.width * ratio)
        })
    })
    useEffect(() => {
        coData.forEach((element, index) => {
            if (element.x + element.width > actualWidth ||
                element.y + element.height > actualHeight ||
                element.x < 0 ||
                element.y < 0) {
                setError(`ArrayField.${index}.bounding`)
            } else {
                clearErrors(`ArrayField.${index}.bounding`)
                setValue(`ArrayField.${index}.bounding`, element)
            }
        });
    }, [ratio])

    // Preview
    const imgPreviewRef = useRef();
    const [renderPreviewWidth, setRenderPreviewWidth] = useState();
    const getRenderPreviewSize = () => {
        const newWidth = imgPreviewRef.current.clientWidth;
        setRenderPreviewWidth(newWidth);
    }
    // Update 'width' at begining
    useEffect(() => {
        if (imgPreviewRef.current) {
            setRenderPreviewWidth(imgPreviewRef.current.offsetWidth)
        }
    }, [])
    // Update 'width' when the window resizes
    useEffect(() => {
        window.addEventListener("resize", getRenderPreviewSize);
    }, []);
    //Ratio
    const ratioPreview = actualWidth / renderPreviewWidth;

    const submitButton = () => {
        setValue("file", file);
    }

    // const fieldNameList = [];
    // const [avoid, setAvoid] = useState(false)
    // if (fields.length > 0) {
    //     watchAllFields.ArrayField.forEach((data) => {
    //         fieldNameList.push(data.fieldName)
    //     });
    // };

    // useEffect(() => {
    //     [...Array(fields.length)].forEach((item, index) => {
    //         // console.log(_.chunk(fieldNameList, index)[0], `testchunk${index}`)
    //         // console.log(watchAllFields.ArrayField[index].fieldName, `testfield${index}`)
    //         if (index > 0 && _.chunk(fieldNameList, index)[0].includes(watchAllFields.ArrayField[index].fieldName)) {
    //             setError(`ArrayField.${index}.fieldName`, {
    //                 type: "uniqueness",
    //                 message: "Please enter an unique field name !"
    //             })
    //             // console.log(`testyes${index}`)
    //         } else {
    //             clearErrors(`ArrayField.${index}.fieldName`)
    //             // console.log(`testno${index}`)
    //         }
    //     })
    // }, [_.last(fieldNameList)])
    // // }, [_.forEach(fieldNameList)])

    return (
        <>
            <Nav buttonVariant={true} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card className="shadow-xxl d-flex flex-column">
                            <div style={{ padding: 15 }}>
                                <div className="font-weight-bold text-uppercase text-primary font-size-xl">
                                    <b>Upload File</b>
                                    <Button variant="contained" component="label" size="small" style={{ marginLeft: "50px" }}>
                                        Upload File
                                        <input
                                            type="file"
                                            {...register('file')}
                                            onChange={handleFileUplaod}
                                            accept="image/*"
                                            hidden
                                        />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className="shadow-xxl d-flex flex-column">
                            <div style={{ padding: 15 }}>
                                <div className="font-weight-bold text-uppercase text-primary font-size-xl">
                                    <b>File Preview</b>
                                </div>

                                <Grid container spacing={1}>
                                    <Grid item xs={6}>

                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={6}>
                                                <div style={{ border: file ? "0.5px solid gray" : null }} ref={imgRef}>
                                                    <MultiCrops src={file}
                                                        coordinates={coordinates}
                                                        onChange={handleOnChange}
                                                        onDelete={handleOnDelete}
                                                        width={"100%"}
                                                        onLoad={event => {
                                                            setActualWidth(event.target.naturalWidth)
                                                            setActualHeight(event.target.naturalHeight)
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {file ?
                                                    <div className="card-header--title">
                                                        <b className="font-size-md text-primary">Sample Preview :</b>
                                                    </div>
                                                    : null
                                                }
                                                <div style={{
                                                    border: file ? "0.5px solid gray" : null,
                                                    position: "relative",
                                                    height: renderPreviewWidth / 2480 * 3508
                                                }}
                                                    ref={imgPreviewRef}>
                                                    <img src={file}
                                                        width="100%"
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                    {coordinates.map((item, index) => (
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: parseInt(item.y * ratio) / ratioPreview,
                                                                left: parseInt(item.x * ratio) / ratioPreview,
                                                                fontSize: 130 / ratioPreview
                                                            }}
                                                        >
                                                            preview({index + 1})
                                                        </div>
                                                    ))}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {file ? <Grid item xs={6}>
                                        <Card className={'card-box'}>
                                            <div style={{ padding: 15 }}>
                                                <div className="card-header--title">
                                                    <b className="font-size-md text-primary">Fields Setting</b>
                                                </div>

                                                <CardContent className="h-100 d-flex flex-column">
                                                    <Grid container spacing={2}>

                                                        {fields.map((field, index) => (
                                                            <Grid item md={12} lg={6} key={field.id}
                                                            // style={{ borderBottom: "dashed" }}
                                                            >
                                                                <FormArray
                                                                    index={index}
                                                                    form={form}
                                                                    errors={errors}
                                                                    coordinates={coordinates}
                                                                    ratio={ratio}
                                                                />
                                                                {errors.ArrayField?.[index]?.bounding &&
                                                                    (<div style={{ color: "red", fontSize: "12px" }}>
                                                                        Please select within the document area !
                                                                    </div>)
                                                                }

                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={12}>
                                                            <div className="text-right">
                                                                <LoadingButton
                                                                    type="submit"
                                                                    onClick={submitButton}
                                                                    variant="contained"
                                                                    className="shadow-none btn-transition-none my-auto h-100 font-weight-bold"
                                                                    disableRipple
                                                                >
                                                                    Confirm
                                                                </LoadingButton>
                                                            </div>
                                                        </Grid>
                                                        <pre>{JSON.stringify(watch(), null, 2)}</pre>
                                                    </Grid>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </Grid> : null}
                                </Grid>
                            </div>
                        </Card>
                    </Grid >
                </Grid >

            </form >
        </>
    )
}

export default DocTemplate;