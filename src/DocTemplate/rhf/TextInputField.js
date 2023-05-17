import React from "react";
import { TextField } from "@mui/material";
import _ from 'lodash';
import clsx from 'clsx';

const TextInputField = (props) => {
    const { form, name, label, type, required = false, pattern = null, validate = null, labelOnTop, ...rest } = props;
    return (
        <>
            {labelOnTop &&
                <div className="font-weight-bold text-uppercase font-size-md text-primary">
                    <div className={clsx({ "text-danger": Boolean(_.get(form.formState.errors, name), undefined) })}>
                        {label}{required && '*'}
                    </div>
                </div>
            }
            <TextField
                size="small"
                variant="outlined"
                className="bg-white"
                error={Boolean(_.get(form.formState.errors, name), undefined)}
                label={labelOnTop ? null : label}
                type={type}
                fullWidth
                {...form.register(name, {
                    required: required && `${label} required`,
                    pattern: pattern,
                    validate: validate
                })}
                {...rest}
            />
        </>
    )
}

export default TextInputField;

export const TextInputFieldwithErrorNotice = (props) => {
    const { form, name, label, type, required = false, pattern = null, validate = null, labelOnTop, ...rest } = props;
    return (
        <>
            {labelOnTop &&
                <div className="font-weight-bold text-uppercase font-size-md text-primary">
                    <div className={clsx({ "text-danger": Boolean(_.get(form.formState.errors, name), undefined) })}>
                        {label}{required && '*'}
                    </div>
                </div>
            }
            <TextField
                size="small"
                variant="outlined"
                className="bg-white"
                error={Boolean(_.get(form.formState.errors, name), undefined)}
                label={labelOnTop ? null : label}
                type={type}
                fullWidth
                {...form.register(name, {
                    required: required && `${label} required`,
                    pattern: pattern,
                    validate: validate
                })}
                {...rest}
            />
            {Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}