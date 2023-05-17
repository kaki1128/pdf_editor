import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'


const DatePickerMantine = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        ...rest
    } = props;

    return (
        <Controller render={({ field }) => (
            <DatePicker
                size="md"
                inputFormat="DD/MM/YYYY"
                error={Boolean(form.formState.errors[name])}
                value={field.value ? dayjs(field.value, "DD/MM/YYYY").isValid() ? dayjs(field.value, "DD/MM/YYYY").startOf('date').format() : dayjs(field.value).startOf('date').format() : null}
                onChange={value => {
                    field.onChange(dayjs(value).startOf('date').format())
                }}
                // value={field.value ? field.value : null}
                // onChange={(value) => field.onChange(value)}
            />

        )} name={name} control={form.control} rules={{ required: required }} />

    )
}

export default DatePickerMantine;

