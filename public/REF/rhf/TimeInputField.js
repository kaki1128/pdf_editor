import React, { useState } from "react";
import { TimeInput } from '@mantine/dates';
import _ from 'lodash';
import { Controller } from "react-hook-form";
import dayjs from 'dayjs'


const TimeInputField = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        ...rest
    } = props;

    const [value, setValue] = useState(null);
    const handleOnTimeChange = (v, field) => {
        setValue(v);
        field.onChange(dayjs(v).format('HH:mm'))
    }

    return (
        <Controller render={({ field }) => (
            <TimeInput
                error={Boolean(_.get(form.formState.errors, name), undefined)}
                label={label}
                format="24"
                value={value}
                onChange={(value) => {
                    handleOnTimeChange(value, field)
                }}

                // onChange={(value) => onChange(dayjs(value).format("HH:mm"))}
                // value={dayjs()
                //     .hour(dayjs(value).format("HH:mm").split(":")[0])
                //     .minute(dayjs(value).format("HH:mm").split(":")[1])}

                // value={field.value ? field.value : null}
                // onChange={(value) => field.onChange(value)}

                // value={field.value ? dayjs(field.value, "HH:mm", true).isValid() ? dayjs(field.value).format("HH:mm") : dayjs(field.value).format() : null}
                // onChange={(value) => {
                //     field.onChange(dayjs(value).format("HH:mm"))
                // }}
            />
        )}
            name={name}
            control={form.control}
            rules={{ required: required }}
        />
    )
}

export default TimeInputField;