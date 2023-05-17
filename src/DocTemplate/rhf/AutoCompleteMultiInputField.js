import React, {Fragment} from "react";
import {Controller} from "react-hook-form";
import _ from 'lodash';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import clsx from "clsx";

const AutoCompleteMultiInputField = (props) => {
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
            <Controller defaultValue={selectFirst ? data[0][dataInput] : []}
                        render={({field}) => (<Fragment>
                                <Autocomplete
                                    multiple
                                    className="bg-white"
                                    size="small"
                                    value={field.value && data ? _.filter(data, (o) => (_.includes(field.value, o[dataInput]))) : []}
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
                                    onChange={(event, data) => {
                                        field.onChange(data ? data?.map((e) => (e[dataInput])) : [])
                                    }}
                                />
                            </Fragment>
                        )} name={name} control={form.control} rules={{required: required}}/>
        </>
    )
}

export default AutoCompleteMultiInputField;