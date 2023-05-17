import React, {useState} from "react";
import {Controller} from "react-hook-form";
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import {Calendar, DatePicker, TimeInput} from '@mantine/dates'
import clsx from "clsx";
import {TextField} from "@material-ui/core";
import _ from "lodash";
import {Popover} from "@mantine/core";
import dayjs from "dayjs";
import {useDisclosure} from "@mantine/hooks";

const TimeInputField = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        labelOnTop,
        ...rest
    } = props;

    const [value, setValue] = useState(null);
    // const [displayValue, setDisplayValue] = useState('');
    // const [opened, {close, open}] = useDisclosure(false);

    const handleOnTimeChange = (v, field) => {
        setValue(v);
        field.onChange(dayjs(v).format("HH:mm"));
    }

    return (
        <>
            {labelOnTop &&
                <div className="font-weight-bold text-uppercase font-size-md text-primary">
                    <div className={clsx({"text-danger": Boolean(form.formState.errors[name])})}>
                        {label}{required && '*'}
                    </div>
                </div>
            }
            <Controller render={({field}) => (
                <>
                    <TimeInput
                        value={value}
                        onChange={(value) => handleOnTimeChange(value, field)}/>
                </>

            )} name={name} control={form.control} rules={{required: required}}/>
        </>
    )
}

export default TimeInputField;