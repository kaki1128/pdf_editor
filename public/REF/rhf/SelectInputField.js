import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Controller} from "react-hook-form";


const SelectInputField = (props) => {
    const {form, name, label, required = false, className = null, data, selectFirst = false, ...rest} = props;
    return (
        <Controller defaultValue={selectFirst ? data[0].value : ''}
                    render={({field}) => (
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
        )} name={name} control={form.control} rules={{required: required}}/>
    )
}

export default SelectInputField;