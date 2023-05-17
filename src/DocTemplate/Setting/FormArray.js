import { Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import SelectInputField, { SelectInputFieldwithErrorNotice } from "../rhf/SelectInputField";
import TextInputField, { TextInputFieldwithErrorNotice } from "../rhf/TextInputField";
import { CheckController, CheckWithValueController, InputController, SelectionController, SwitchController } from "./Elements/Controllers";
import { inputTypes } from "./Elements/DataLists";
import TypeCheck from "./Sections/Check";
import TypeRadio from "./Sections/Radio";
import TypeSelect from "./Sections/Select";
import TypeTextField from "./Sections/TextField";
import Prefix from "./Sections/TextFieldComponents/Prefix";


export const FormArray = ({ index, form, coordinates, ratio }) => {

    const selected = form.getValues(`ArrayField.${index}.inputType`);
    const textSelected = form.getValues(`ArrayField.${index}.details.textFieldType`);

    useEffect(() => {
        form.unregister(`ArrayField.${index}.details`);
    }, [selected])

    useEffect(() => {
        form.unregister(`ArrayField.${index}.details.details.default`);
    }, [form.getValues(`ArrayField.${index}.details.details.format`)])

    let fillingTypes = null;

    if (selected === "Text") {
        fillingTypes =
            <><TypeTextField index={index} form={form} /></>
    }
    else if (selected === "Select") {
        fillingTypes =
            <><TypeSelect index={index} form={form} /></>
    }
    // else if (selected === "Radio") {
    //     fillingTypes =
    //         <div>
    //             <TypeRadio index={index} control={control} setValue={setValue} getValues={getValues} />
    //         </div>
    // }
    // else if (selected === "Check") {
    //     fillingTypes =
    //         <>
    //             <TypeCheck index={index} form={form} />
    //         </>
    // }

    return (

        <Grid container spacing={1}>

            <span style={{ fontSize: "14.5px" }}>
                <b>{index + 1}: </b>
                x: {parseInt(coordinates[index].x * ratio)}&thinsp;
                y: {parseInt(coordinates[index].y * ratio)}&thinsp;
                H: {parseInt(coordinates[index].height)}&thinsp;
                W: {parseInt(coordinates[index].width)}
            </span>
            <Grid item xs={12}>
                <SelectInputFieldwithErrorNotice
                    form={form}
                    label="Select Field Type"
                    name={`ArrayField.${index}.inputType`}
                    data={inputTypes}
                    required={true}
                />
            </Grid>

            {selected === "" || selected === null || selected === "Footer" || selected === "Closing" ? (
                null
            ) : (
                <>
                    <Grid item xs={12}>
                        <TextInputField
                            form={form}
                            label="Field Name"
                            name={`ArrayField.${index}.fieldName`}
                            required={true}
                        />
                        {form.formState.errors.ArrayField?.[index]?.fieldName && form.formState.errors.ArrayField[index].fieldName.type === "uniqueness" &&
                            (<div style={{ color: "red", fontSize: "12px" }}>
                                {form.formState.errors.ArrayField[index].fieldName.message}
                            </div>)
                        }
                        {form.formState.errors.ArrayField?.[index]?.fieldName && form.formState.errors.ArrayField[index].fieldName.type === "required" &&
                            (<div style={{ color: "red", fontSize: "12px" }}>
                                *This field is Required
                            </div>)
                        }
                    </Grid>

                    {fillingTypes}

                    <Grid item xs={12}>
                        <CheckController
                            control={form.control}
                            name={`ArrayField.${index}.required`}
                        /> Required?<br />

                        {selected === "Text" && textSelected === "Input" ?
                            <>
                                <Prefix index={index} form={form} /><br />
                            </> : null}

                        {selected === "Text" && textSelected === "Date" ?
                            // <>
                            //     <CheckWithValueController
                            //         control={form.control}
                            //         name={`ArrayField.${index}.details.details.default`}
                            //         value={dayjs().format(`${form.getValues(`ArrayField.${index}.details.details.format`)}`)}
                            //     /> Pre-set current?<br />
                            // </> : null}
                            <>
                                <CheckController
                                    control={form.control}
                                    name={`ArrayField.${index}.details.details.default`}
                                /> Pre-set current?<br />
                            </> : null}

                        {selected === "Select" ?
                            <>
                                <CheckController
                                    control={form.control}
                                    name={`ArrayField.${index}.details.multipleSelect`}
                                /> Multiple selects?<br />
                            </> : null}



                        {selected === "Text" &&
                            textSelected === "Input" ||
                            textSelected === "Number" ||
                            textSelected === "Date" ||
                            textSelected === "e-mail" ||
                            selected === "Select" ? (
                            <>
                                <CheckController
                                    control={form.control}
                                    name={`ArrayField.${index}.showAttribute`}
                                /> Show attribute?<br />

                                <CheckController
                                    control={form.control}
                                    name={`ArrayField.${index}.bold`}
                                /> Bold?<br />

                                <CheckController
                                    control={form.control}
                                    name={`ArrayField.${index}.underline`}
                                /> Underline?<br />
                            </>
                        ) : (
                            null
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    );
}