import React, { forwardRef, useEffect, useRef, useState } from "react";
import MultiCrops from "react-multi-crops";
import { Card, CardContent, Grid } from "@mui/material";
import { Controller, FormProvider, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { Selection, HiddenInput, Input, TestController } from "../../src/DocTemplate/Controllers";
import { types } from "../src/DocTemplate/DataLists";
import Prefix from "../src/DocTemplate/Prefix";
import Format from "../src/DocTemplate/Format";
import HiddenPart from "../src/DocTemplate/HiddenPart";


const App = () => {

    const form = useForm();
    const { register, handleSubmit, control, setValue, watch, getValues, reset } = useForm({
        defaultValues: {},
        shouldUnregister: true
    });
    const { fields, append, remove } = useFieldArray({ control, name: "Array" });
    const watchAllFields = watch();

    // File upload
    const [file, setFile] = useState();
    const handleFileUplaod = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    // Image actual size
    const [actualWidth, setActualWidth] = useState();

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
    const changeCoordinate = (coordinate, index, coordinates) => {
        setCoordinates(coordinates);
    };
    const deleteCoordinate = (coordinate, index, coordinates) => {
        setCoordinates(coordinates);
        remove()
    };

    useEffect(() => {
        const changeCoordinate = (coordinate, index, coordinates) => {
            setTimeout(() => {
                setCoordinates(coordinates);
            }, 1000);
        }
    }, [])

    // Update controller
    useEffect(() => {reset()}, [coordinates])
    useEffect(() => {reset()}, [ratio])

    return (
        <form onSubmit={handleSubmit(console.log)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className={'card-box'}>
                        <div className="card-header">
                            <div className="card-header--title">
                                <b className="font-size-md text-primary">Upload File</b>
                                <small>Document & Attachment</small>
                            </div>
                        </div>
                        <CardContent className="h-100 d-flex flex-column">
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <input type="file" onChange={handleFileUplaod} />

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={'card-box'}>
                        <div className="card-header">
                            <div className="card-header--title">
                                <b className="font-size-md text-primary">File Preview</b>
                                <small>Document & Attachment</small>
                            </div>
                        </div>

                        <CardContent className="h-100 d-flex flex-column">
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <div ref={imgRef}>
                                        <MultiCrops src={file}
                                            coordinates={coordinates}
                                            onDraw={changeCoordinate}
                                            onChange={changeCoordinate}
                                            onDelete={deleteCoordinate}
                                            width={"100%"}
                                            onLoad={event => {
                                                setActualWidth(event.target.naturalWidth)
                                            }}
                                        // onLoad={event => {
                                        //     setSize({
                                        //         height: event.target.naturalHeight,
                                        //         width: event.target.naturalWidth
                                        //     })
                                        // }}
                                        />
                                    </div>

                                    {renderWidth && actualWidth &&
                                        <div>
                                            <span>Render Width: {renderWidth}</span>
                                            <br />
                                            <span>Actual Width: {actualWidth}</span>
                                            <br />
                                            <span>Ratio: {actualWidth / renderWidth}</span>
                                        </div>}

                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={6}>
                                            <Card className={'card-box'}>
                                                <div className="card-header">
                                                    <div className="card-header--title">
                                                        <b className="font-size-md text-primary">Input type selection</b>
                                                    </div>
                                                </div>
                                                <CardContent className="h-100 d-flex flex-column">

                                                    {coordinates.map((item, index) => (
                                                        <div>
                                                            {index + 1}:
                                                            <div style={{ display: "" }}>
                                                                <input {...register(`Array.${index}.x`, { required: true })} value={parseInt(item.x * ratio)} />
                                                                <input {...register(`Array.${index}.y`, { required: true })} value={parseInt(item.y * ratio)} />
                                                                <input {...register(`Array.${index}.height`, { required: true })} value={parseInt(item.height * ratio)} />
                                                                <input {...register(`Array.${index}.width`, { required: true })} value={parseInt(item.width * ratio)} />
                                                            </div>
                                                            {/* useEffect: <HiddenPart value={parseInt(item.width * size.width / renderWidth)} index={index} control={control} register={register} />
                                                            Controller: <TestController name={`Array.${index}.width-test1`} value={parseInt(item.width * size.width / renderWidth)} {...{ control, register }} /> */}
                                                            {/* <HiddenInput value={parseInt(item.y * size.width / renderWidth)} name={`Array.${index}.y`} {...{ control, register }} />
                                                            <HiddenInput value={parseInt(item.height * size.width / renderWidth)} name={`Array.${index}.height`} {...{ control, register }} />
                                                            <HiddenInput value={parseInt(item.width * size.width / renderWidth)} name={`Array.${index}.width`} {...{ control, register }} /> */}

                                                            <Selection data={types} label="Select type"
                                                                name={`Array..${index}.selectType`}
                                                                {...{ control, register }}
                                                            />
                                                            <br /><br />

                                                            <Format index={index} control={control} register={register} />

                                                            <Prefix index={index} control={control} register={register} />

                                                            <br />
                                                            x:{parseInt(item.x * ratio)} /
                                                            y:{parseInt(item.y * ratio)} /
                                                            height:{parseInt(item.height * ratio)} /
                                                            width:{parseInt(item.width * ratio)}
                                                            <h4>
                                                                x:{parseInt(item.x)} /
                                                                y:{parseInt(item.y)} /
                                                                height:{parseInt(item.height)} /
                                                                width:{parseInt(item.width)}
                                                            </h4>
                                                            <br />
                                                        </div>

                                                    ))}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Card className={'card-box'}>
                                                <div className="card-header">
                                                    <div className="card-header--title">
                                                        <b className="font-size-md text-primary">Details</b>
                                                    </div>
                                                </div>
                                                <CardContent className="h-100 d-flex flex-column">
                                                    <pre>{JSON.stringify(watch(), null, 2)}</pre>
                                                    {/* {console.log(watchAllFields)} */}
                                                    {/* {watchAllFields ?
                                                          (
                                                              <>
                                                                  {watchAllFields.Array.map(info => (
                                                                      <p>
                                                                          Index&nbsp;{info.index}: <br />
                                                                          x:&nbsp;{info.x} /
                                                                          y:&nbsp;{info.y} /
                                                                          Height:&nbsp;{info.height} /
                                                                          Width:&nbsp;{info.width} /
                                                                          Type:&nbsp;{info.selectType}
                                                                      </p>
                                                                  ))}
                                                              </>
                                                          ) : (
                                                              <div></div>
                                                          )
                                                      } */}

                                                    < input type="submit" />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </form >
    )
}

export default App;
