import React, {Fragment, useLayoutEffect, useState} from "react";
import {Controller} from "react-hook-form";
import _ from 'lodash';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

const NestedControllerInputField = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        data,
        selectFirst = false,
        dataLabel,
        dataInput,
        config,
        layer,
        ...rest
    } = props;

    const [selected, setSelected] = useState(null);

    useLayoutEffect(() => {
        if (selected) console.log(selected);
    }, [selected])

    return (
        <Fragment>
            <Controller defaultValue={selectFirst ? dataInput ? data[0][dataInput] : data[0].value : null}
                        render={({field}) => (
                            <Autocomplete
                                size="small"
                                value={field.value ? data && dataInput ? data.find(e => e[dataInput] === field.value) : data.find(e => e.value === field.value) : null}
                                options={data}
                                getOptionLabel={(option) => dataLabel ? option[dataLabel] : option.label}
                                getOptionSelected={(option, value) => _.isEqual(option, value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={Boolean(form.formState.errors[name])}
                                        label={label}
                                        variant="outlined"
                                    />
                                )}
                                onChange={(event, data) => {
                                    setSelected(data);
                                    field.onChange(dataInput && data ? data[dataInput] : data?.value);
                                }}
                            />
                        )} name={name} control={form.control} rules={{required: required}}/>
            {selected && config[layer+1] ? <NestedControllerInputField layer={layer+1} config={config} {...config[layer+1]} form={form} data={selected[config[layer+1]['key']]}/> : null}
        </Fragment>
    )
}

const AutoCompleteNestedInputField = (props) => {
    const {
        form,
        config,
        data
    } = props;

    const {dataLabel, dataInput, name, key, label, required, ...rest} = config[0];
    return (
        <NestedControllerInputField
            layer={0}
            form={form}
            config={config}
            dataLabel={dataLabel}
            dataInput={dataInput}
            nestedStruct={key}
            label={label}
            name={name}
            required={required}
            data={data}
            {...rest}
        />
    )
}

export default AutoCompleteNestedInputField;