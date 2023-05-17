import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Form } from "./Form";
import { DocPreview } from "./DocPreview";
import setting from "./Elements/ArrayField.json"
import exportAsPdf from "./Elements/exportAsPdf";
import jsPDF from "jspdf";
import file from "./Elements/WaiMing_Blank.jpg";
import dayjs from "dayjs";
import _ from "lodash";
import Nav from "../../Nav";

const Preview = () => {

    //Set default values
    let defaultAtrributes = [];
    let defaultFieldValues = [];

    setting.ArrayField.forEach((element) => {
        if (element.details?.details?.default) {
            if (element.details?.textFieldType === "Date") {
                defaultAtrributes.push(element.bounding.id)
                defaultFieldValues.push(dayjs().format(element.details.details.format))
            } else {
                defaultAtrributes.push(element.bounding.id)
                defaultFieldValues.push(element.details.details.default)
            }
        }
    });

    const output = defaultAtrributes.map((currentValue, index) => (
        [currentValue, defaultFieldValues[index]]
    ));

    const form = useForm({
        mode: 'onChange',
        defaultValues: _.fromPairs(output)
    });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        unregister,
        trigger,
        setError,
        clearErrors,
        formState: { errors, isValid }
    } = form

    const onSubmit = (data) => {
        console.log("data", data)
    }

    // Image
    // const file = setting.file
    // Image actual size
    const [actualWidth, setActualWidth] = useState();
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
    const ratioPreview = actualWidth / renderPreviewWidth
    //Text size
    const [fontSize, setFontSize] = useState(120)

    //Doc Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        trigger()
        if (isValid) {
            setOpen(true)
        }
    };
    const handleClose = () => { setOpen(false) };
    const imgDialogRef = useRef();
    const renderDialogWidth = 600;
    const ratioDialog = actualWidth / renderDialogWidth

    //To PDF
    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "pt",
            orientation: "p",

        });

        // Adding the fonts
        doc.setFont("Inter-Regular", "normal");

        doc.html(imgDialogRef.current, {
            async callback(doc) {
                await doc.save("Document");
            },
            // x: -30,
            // y: -7,
            margin: [-8.5, 0, 0, -10],

        });

        //Close Document Dialog
        setOpen(false)
    };

    return (
        <>
            <Nav buttonVariant={false} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <Card className={'card-box'}>
                            <CardContent className="h-100 d-flex flex-column">
                                <b>Input Section</b><br /><br />
                                <Grid container spacing={1}>
                                    {setting.ArrayField.map((field, index) => (
                                        <Grid item xs={12}>
                                            <Form
                                                field={field}
                                                form={form}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                {/* <Button style={{ marginTop: "1rem" }} type="submit">Confirm</Button> */}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={'card-box'}>
                            <CardContent className="h-100 d-flex flex-column">
                                <b>Preview Section</b><br /><br />
                                <TextField label="font size" size="small" type="number"
                                    value={fontSize}
                                    onChange={(event) => {
                                        setFontSize(event.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">pt</InputAdornment>
                                    }}
                                /><br /><br />
                                <div style={{ border: "0.5px solid gray" }}>
                                    <div ref={imgPreviewRef} style={{
                                        position: "relative",
                                        width: "100%",
                                        height: renderPreviewWidth / 210 * 297
                                    }}>
                                        {/* {console.log(renderPreviewWidth, "testwidth")} */}
                                        <img
                                            src={file}
                                            height="100%"
                                            onLoad={event => { setActualWidth(event.target.naturalWidth) }}
                                        />
                                        <DocPreview
                                            getValues={getValues}
                                            fontSize={parseInt(fontSize) / ratioPreview}
                                            fields={setting.ArrayField}
                                            ratio={ratioPreview}
                                        />
                                    </div>
                                </div>
                                <br /> <br />

                                <Button
                                    // type="submit"
                                    variant="contained"
                                    onClick={handleClickOpen}
                                    size="small"
                                >
                                    Generate PDF
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    scroll='paper'
                                    sx={{
                                        "& .MuiDialog-container": {
                                            "& .MuiPaper-root": {
                                                width: "100%",
                                                maxWidth: "670px"
                                            },
                                        },
                                    }}
                                >
                                    <DialogTitle>Document Preview</DialogTitle>
                                    <DialogContent dividers='paper'>
                                        <div style={{ border: "0.5px solid gray", height: renderDialogWidth / 210 * 300 }}>
                                            <div
                                                ref={imgDialogRef}
                                                style={{
                                                    position: "relative",
                                                    width: renderDialogWidth,
                                                    height: renderDialogWidth / 210 * 297
                                                }}>
                                                <img
                                                    src={file}
                                                    width="100%"
                                                />
                                                <DocPreview
                                                    getValues={getValues}
                                                    fontSize={parseInt(fontSize) / ratioDialog}
                                                    fields={setting.ArrayField}
                                                    ratio={ratioDialog}
                                                />
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleGeneratePdf} variant="contained" style={{ margin: "5px" }}>
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </CardContent>
                        </Card>

                        <pre>{JSON.stringify(watch(), null, 2)}</pre>

                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default Preview;