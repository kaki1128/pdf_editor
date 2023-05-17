import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import SelectInputField, { SelectInputFieldwithErrorNotice } from "../../rhf/SelectInputField";
import TextInputField from "../../rhf/TextInputField";
import { InputController, SelectionController } from "../Elements/Controllers";
import { textFieldTypes } from "../Elements/DataLists";
import Date from "./TextFieldComponents/Date";
import Prefix from "./TextFieldComponents/Prefix";
import _ from "lodash";

export default ({ index, form }) => {

    const selected = form.getValues(`ArrayField.${index}.details.textFieldType`);

    useEffect(() => {
        form.unregister(`ArrayField.${index}.details.details`);
        if (selected === "Input" || selected === "Number" || selected === "e-mail") {
            form.setValue(`ArrayField.${index}.details.details.default`, "")
        }
        if (selected === "Date") {
            form.setValue(`ArrayField.${index}.details.details`, {
                "timeType": "date",
                "format": "D MMMM, YYYY"
            })
        }
    }, [selected])

    let fillingTypes = null;

    if (selected === "Input") {
        fillingTypes =
            <>
                <Grid item xs={12}>
                    <TextInputField
                        form={form}
                        label="Default Value (Optional)"
                        name={`ArrayField.${index}.details.details.default`}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <Prefix index={index} form={form} />
                </Grid> */}
            </>

    }
    else if (selected === "Number") {
        fillingTypes =
            <Grid item xs={12}>
                <TextInputField
                    form={form}
                    label="Default Value (Optional)"
                    name={`ArrayField.${index}.details.details.default`}
                    type="number"
                />
            </Grid>
    }
    else if (selected === "Date") {
        fillingTypes =
            <>
                <Date
                    index={index}
                    form={form}
                />
            </>
    }
    else if (selected === "e-mail") {
        fillingTypes =
            <Grid item xs={12}>
                <TextInputField
                    form={form}
                    label="Default Value (Optional)"
                    name={`ArrayField.${index}.details.details.default`}
                    // type="email"
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                />
                {_.get(form.formState.errors, `ArrayField.${index}.details.details.default`) &&
                    _.get(form.formState.errors, `ArrayField.${index}.details.details.default`).type === "pattern" &&
                    (<div style={{ color: "red", fontSize: "12px" }}>
                        Please enter a valid email address !
                    </div>)
                }
            </Grid>
    }

    return (
        <>
            <Grid item xs={12}>
                <SelectInputFieldwithErrorNotice
                    form={form}
                    label="Select Text Field Type"
                    name={`ArrayField.${index}.details.textFieldType`}
                    data={textFieldTypes}
                    required={true}
                />
            </Grid>
            {fillingTypes}
        </>
    )
}
