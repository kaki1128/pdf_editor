import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Controller} from "react-hook-form";
import clsx from "clsx";


const CheckBoxInputField = (props) => {
    const {form, name, label, labelPlacement = "start", required = false, className = null, ...rest} = props;
    return (
        <Controller render={({field}) => (
            <FormControlLabel
                control={
                    <Checkbox
                        {...field}
                        className={className} size="small"
                        checked={field.value || false}
                    />}
                label={
                    <div className={clsx("font-size-xs font-weight-bold text-uppercase", className)}>
                        {label}
                    </div>}
                labelPlacement={labelPlacement}
            />
        )} name={name} control={form.control}/>
    )
}

export default CheckBoxInputField;