// app.js
import React, { useEffect, useRef, useState } from "react";
import MultiCrops from "react-multi-crops";
import { Card, CardContent, Grid } from "@mui/material";
import { Controller, FormProvider, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { Form } from "./Form";


const App = () => {

    const form = useForm();
    const { register, handleSubmit, control, setValue, watch, getValues, reset } = useForm({
        defaultValues: {},
        shouldUnregister: true
    });
    const { fields, append, remove } = useFieldArray({ control, name: "ArrayField" });
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
    const coData = [];
    const changeCoordinate = (coordinate, index, coordinates) => {
        setCoordinates(coordinates);
        // append(coordinate)
    };
    const deleteCoordinate = (coordinate, index, coordinates) => {
        setCoordinates(coordinates);
        remove(index);

    };
    coordinates.forEach((data) => {
        coData.push({
            x: parseInt(data.x * ratio),
            y: parseInt(data.y * ratio),
            height: parseInt(data.height * ratio),
            width: parseInt(data.width * ratio)
        })
    })

    // Update controller
    useEffect(() => {
        coData.forEach((element, index) => setValue(`ArrayField.${index}.bounding`, element));
    }, [coordinates, ratio, setValue])

    // useEffect(() => {
    //     coData.forEach((element, index) => remove(index));
    // }, [coordinates])


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
                                        />
                                    </div>
                                    <div>
                                        {renderWidth && actualWidth &&
                                            <div>
                                                <span>Render Width: {renderWidth}</span>
                                                <br />
                                                <span>Actual Width: {actualWidth}</span>
                                                <br />
                                                <span>Ratio: {actualWidth / renderWidth}</span>
                                            </div>
                                        }
                                    </div>

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

                                                    {coData.map((item, index) => (
                                                        <div key={item.id}>
                                                            <Form index={index} control={control} register={register} />
                                                            <h4>
                                                                x:{parseInt(item.x)} /
                                                                y:{parseInt(item.y)} /
                                                                height:{parseInt(item.height)} /
                                                                width:{parseInt(item.width)}
                                                            </h4>
                                                            <button onClick={() => remove(index)}>Remove</button>
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
                                                    {/* {console.log(watchAllFields.ArrayField[0])} */}
                                                    {/* {watchAllFields ?
                                                          (
                                                              <>
                                                                  {watchAllFields.ArrayField.map(info => (
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