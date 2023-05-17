import React from "react";
import {Controller} from "react-hook-form";
import _ from 'lodash';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import clsx from "clsx";

const AutoCompleteInputField = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        disableChoice = false,
        data, selectFirst = false,
        dataLabel = 'label',
        dataInput = 'value',
        getDisplayLabel = null,
        disabled = false,
        labelOnTop,
        ...rest
    } = props;
    return (
        <>
            {labelOnTop &&
                <div className="font-weight-bold text-uppercase font-size-md text-primary">
                    <div className={clsx({"text-danger": Boolean(form.formState.errors[name])})}>
                        {label}{required && '*'}
                    </div>
                </div>
            }
            <Controller defaultValue={selectFirst && data.length > 0 ? data[0][dataInput] : undefined}
                        render={({field}) => (
                            <Autocomplete
                                disabled={disabled}
                                className="bg-white"
                                size="small"
                                value={field.value && data ? data.find(e => e[dataInput] === field.value) : null}
                                options={data}
                                getOptionLabel={getDisplayLabel ? getDisplayLabel : (option) => option[dataLabel] || 'UnLabelled'}
                                getOptionDisabled={(option) => disableChoice ? !option.selectable : false}
                                getOptionSelected={(option, value) => _.isEqual(option, value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={Boolean(form.formState.errors[name])}
                                        label={labelOnTop ? null : label}
                                        variant="outlined"
                                    />
                                )}
                                onChange={(event, data) => field.onChange(data ? data[dataInput] : null)}
                            />
                        )} name={name} control={form.control} rules={{required: required}}/>
        </>
    )
}

export default AutoCompleteInputField;