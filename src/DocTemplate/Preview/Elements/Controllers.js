import React, { Fragment, useRef, useState } from "react";
import { Checkbox, FormControl, FormControlLabel, ListItemText, MenuItem, OutlinedInput, Select, Switch, TextField } from "@mui/material";
import { Controller, useController } from "react-hook-form";
import { Calendar, TimeInput } from '@mantine/dates'
import { Popover } from "@mantine/core";
import dayjs from 'dayjs'
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";
import _ from "lodash";
import TimeField from 'react-simple-timefield';

export const SelectionController = (props) => {

    const { form, name, label, type, data, required,
        fullWidth = "true",
        showErrorMsg = "true",
        defaultValue } = props;

    return (
        <>
            <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}
                    {required && '*'}
                </div>
            </div>
            <Controller
                render={({ field }) => (
                    <Select fullWidth={fullWidth}
                        type={type}
                        size="small"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        // required={required}
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
                rules={{ required: required }}
            />
            {showErrorMsg && Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}

export const MultipleSelectionController = (props) => {

    const { form, name, label, type, data, required,
        fullWidth = "true",
        showErrorMsg = "true",
        defaultValue } = props;

    const [value, setValue] = useState([]);

    const handleChange = (v, field) => {
        const { target: { value }, } = v;
        setValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        field.onChange(value)
    };

    return (
        <>
            <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}{required && '*'}
                </div>
            </div>
            <Controller
                render={({ field }) => (
                    <Select fullWidth={fullWidth}
                        type={type}
                        size="small"
                        multiple
                        // {...field}
                        // value={field.value}
                        // onChange={field.onChange}
                        value={value}
                        onChange={(value) => {
                            handleChange(value, field)
                        }}
                        input={<OutlinedInput />}
                        // required={required}
                        defaultValue={defaultValue}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {data.map((option) => (
                            <MenuItem key={option} value={option}>
                                <Checkbox checked={value.indexOf(option) > -1} />
                                <ListItemText primary={option} />
                            </MenuItem>
                        ))}
                    </Select>
                )}
                name={name}
                control={form.control}
                rules={{ required: required }}
            />
            {showErrorMsg && Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}

export const InputController = (props) => {

    const { form, name, label, type, inputProps, InputProps, defaultValue, required, pattern,
        fullWidth = "true",
        showErrorMsg = "true"
    } = props;

    return (
        <>
            <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}{required && '*'}
                </div>
            </div>
            <Controller
                render={({ field }) => (
                    <TextField fullWidth={fullWidth}
                        type={type}
                        size="small"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        // required={required}
                        inputProps={inputProps}
                        InputProps={InputProps}
                    />
                )}
                name={name}
                control={form.control}
                defaultValue={defaultValue}
                rules={{
                    required: required,
                    pattern: pattern
                }}
            />
            {showErrorMsg && Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}

export const DatePickerController = (props) => {

    const { form, name, label, required, format, presetCurrent, defaultValue,
        fullWidth = "true",
        showErrorMsg = "true"
    } = props;

    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState(presetCurrent ? dayjs().format(format) : null);
    const [displayValue, setDisplayValue] = useState(presetCurrent ? dayjs().format(format) : null);
    const handleOnDateChange = (v, field) => {
        setValue(v);
        const dateValue = dayjs(v);
        setDisplayValue(dateValue.format(format));
        field.onChange(dayjs(v).format(format));
    }

    return (
        <>
            <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}{required && '*'}
                </div>
            </div>
            <Controller render={({ field }) => (
                <Popover opened={popoverOpened} position="bottom" transition="pop">
                    <Popover.Target>
                        <div
                            onFocusCapture={() => setPopoverOpened(true)}
                            onBlurCapture={() => setPopoverOpened(false)}
                        >
                            <TextField
                                fullWidth={fullWidth}
                                value={displayValue}
                                size="small"
                            // required={required}
                            />
                        </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Calendar value={value} onChange={(value) => handleOnDateChange(value, field)} />
                    </Popover.Dropdown>
                </Popover>
            )}
                name={name}
                control={form.control}
                rules={{ required: required }}
            />
            {showErrorMsg && Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}

export const TimeInputController = (props) => {
    const { form, name, label, format, presetCurrent, required,
        withSeconds = false, ampmFormat = "24",
        showErrorMsg = "true" } = props;

    const [value, setValue] = useState(presetCurrent ? new Date() : "");
    const handleOnTimeChange = (v, field) => {
        setValue(v);
        field.onChange(dayjs(v).format(format))
    }

    return (
        <>
            <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}{required && '*'}
                </div>
            </div>
            <Controller render={({ field }) => (
                <TimeInput
                    value={value}
                    onChange={(value) => {
                        handleOnTimeChange(value, field)
                    }}
                    withSeconds={withSeconds}
                    format={ampmFormat}
                />
                // <TimeField
                //     input={<TextField fullWidth size="small" />}
                //     value={value}
                //     onChange={field.onChange}
                //     showSeconds={withSeconds}

                // />
            )}
                name={name}
                control={form.control}
                rules={{ required: required }}
            />
            {console.log(value, "testvalue")}
            {showErrorMsg && Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}