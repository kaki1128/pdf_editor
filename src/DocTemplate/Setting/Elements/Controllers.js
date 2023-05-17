import React, { useState } from "react";
import { Checkbox, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import clsx from "clsx";

export const SelectionController = (props) => {
    const { form, name, label, type, data, required, fullWidth = "true", defaultValue } = props;

    return (
        <>
            {/* <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}
                    {required && '*'}
                </div>
            </div> */}
            <Controller
                render={({ field }) => (
                    <Select fullWidth={fullWidth}
                        type={type}
                        size="small"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        required={required}
                        defaultValue={defaultValue}
                    >
                        {data.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                name={name}
                control={form.control}
            />
        </>
    )
}

export const InputController = ({ form, name, label, type, inputProps, defaultValue, rules, required, fullWidth = "true" }) => {

    return (
        <Controller
            render={({ field }) => (
                <TextField fullWidth={fullWidth}
                    type={type}
                    label={label}
                    size="small"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    required={required}
                    inputProps={inputProps}
                />
            )}
            name={name}
            control={form.control}
            defaultValue={defaultValue}
            rules={rules} />
    )
}

export const SwitchController = ({ control, name, unregister, unregisterName, defaultValue }) => {

    return (
        <Controller
            render={({ field }) => (
                <Switch
                    size="small"
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                        field.onChange(e.target.checked)
                        unregister(unregisterName)
                    }}
                />
            )}
            name={name}
            control={control}
            defaultValue={defaultValue} />
    )
}

export const CheckController = ({ control, name, unregister, unregisterName, defaultValue }) => {

    return (
        <Controller
            render={({ field }) => (
                <Checkbox
                    size="small"
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                        field.onChange(e.target.checked)
                        unregister(unregisterName)
                    }}
                />
            )}
            name={name}
            control={control}
            defaultValue={defaultValue} />
    )
}

export const CheckWithValueController = ({ control, name, value, defaultValue }) => {

    const [selectedValue, setSelectedValue] = useState("");
    const handleOnChange = (event, field) => {
        if (event.target.value === selectedValue) {
            setSelectedValue("");
            field.onChange("")
        } else {
            setSelectedValue(value)
            field.onChange(event.target.value)
        }
    }

    return (
        <Controller
            render={({ field }) => (
                <Checkbox
                    size="small"
                    {...field}
                    checked={selectedValue === value}
                    value={value}
                    onChange={(event) => {
                        handleOnChange(event, field)
                    }}
                />
            )}
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
    )
}