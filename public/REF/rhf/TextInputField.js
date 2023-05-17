import React from "react";
import {TextField} from "@material-ui/core";
import _ from 'lodash';

const TextInputField = (props) => {
    const {form, name, label, required = false, pattern = null, validate = null, ...rest} = props;
    return (
        <TextField
            size="small"
            variant="outlined"
            className="bg-white"
            error={Boolean(_.get(form.formState.errors, name), undefined)}
            label={label}
            fullWidth
            {...form.register(name, {
                required: required && `${label} required`,
                pattern: pattern,
                validate: validate
            })}
            {...rest}
        />
    )
}

export default TextInputField;