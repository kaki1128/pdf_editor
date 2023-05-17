import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import DateTime from "./TextFieldComponents/DateTime";
import { InputController, TinyEditorController } from "../Elements/Controllers";
import { HtmlEditor } from "../Elements/HtmlEditor";
import TinyEditorInputField from "../../rhf/TinyEditorInputField";
import _ from "lodash";

export const TextPart = ({ field, form }) => {

    const textFieldType = field.details.textFieldType;
    const label = field.fieldName;
    const name = field.bounding.id
    const required = field.required;
    const defaultValue = field.details.default;


    let filling = null;
    if (textFieldType === "Input") {
        filling =
            <InputController
                name={name}
                label={label}
                form={form}
                required={required}
                defaultValue={defaultValue}
                InputProps={field.details.details.prefixPosition ? {
                    startAdornment: <InputAdornment position="start">{field.details.details.prefixPosition.start}</InputAdornment>,
                    endAdornment: <InputAdornment position="end">{field.details.details.prefixPosition.end}</InputAdornment>
                } : null}
            />
    }
    else if (textFieldType === "Textarea") {
        filling =
            <HtmlEditor
                form={form}
                name={name}
                label={label}
                required={required}
            />
            // <TinyEditorInputField form={form} name={name} label={label} required={required} />
    }
    else if (textFieldType === "Number") {
        filling =
            <InputController
                name={name}
                label={label}
                type={"number"}
                form={form}
                required={required}
            // defaultValue={defaultValue}
            />
    }
    else if (textFieldType === "Date") {
        filling =
            <DateTime
                field={field}
                label={label}
                name={name}
                required={required}
                form={form}
            />
    }
    else if (textFieldType === "e-mail") {
        filling =
            <>
                <InputController
                    name={name}
                    label={label}
                    // type={"email"}
                    // defaultValue={defaultValue}
                    form={form}
                    required={required}
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                    showErrorMsg={false}
                />
                {_.get(form.formState.errors, name) && _.get(form.formState.errors, name).type === "pattern" &&
                    (<div style={{ color: "red", fontSize: "12px" }}>
                        Please enter a valid email address !
                    </div>)
                }
                {_.get(form.formState.errors, name) && _.get(form.formState.errors, name).type === "required" &&
                    (<div style={{ color: "red", fontSize: "12px" }}>
                        *This field is Required
                    </div>)
                }

            </>
    }

    return (
        <>
            {filling}
        </>
    )
}