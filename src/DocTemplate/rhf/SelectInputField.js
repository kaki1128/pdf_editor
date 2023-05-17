import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import _ from 'lodash';
import clsx from 'clsx';

const SelectInputField = (props) => {
    const { form, name, label, required = false, className = null, data, selectFirst = false, ...rest } = props;
    return (
        <Controller defaultValue={selectFirst ? data[0].value : ''}
            render={({ field }) => (
                <FormControl fullWidth size="small"
                    variant="outlined"
                    error={Boolean(form.formState.errors[name])}
                >
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        {...field}
                        value={field.value}
                        label={label}
                        onChange={field.onChange}
                    >
                        {data.map((e, i) => (
                            <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )} name={name} control={form.control} rules={{ required: required }} />
    )
}

export default SelectInputField;

export const SelectInputFieldwithErrorNotice = (props) => {
    const { form, name, label, required = false, className = null, data, selectFirst = false, ...rest } = props;
    return (
        <>
            <Controller defaultValue={selectFirst ? data[0].value : ''}
                render={({ field }) => (
                    <FormControl fullWidth size="small"
                        variant="outlined"
                        // error={Boolean(form.formState.errors[name])}
                        error={Boolean(_.get(form.formState.errors, name), undefined)}
                    >
                        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
                        <Select
                            labelId="demo-simple-select-error-label"
                            id="demo-simple-select-error"
                            {...field}
                            value={field.value}
                            label={label}
                            onChange={field.onChange}
                        >
                            {data.map((e, i) => (
                                <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )} name={name} control={form.control} rules={{ required: required }}
            />

            {Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </>
    )
}