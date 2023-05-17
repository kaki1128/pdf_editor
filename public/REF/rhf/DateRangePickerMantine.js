import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { RangeCalendar } from '@mantine/dates'
import dayjs from 'dayjs'

const DateRangePickerMantine = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        ...rest
    } = props;

    // const [value, setValue] = useState < [Date | null, Date | null] > ([
    //     new Date(2021, 11, 1),
    //     new Date(2021, 11, 5),
    // ])
    const [value, setValue] = useState(["","" ])
    const handleOnDateRangeChange = ([v1, v2], field) => {
        setValue([v1, v2])
        field.onChange([dayjs(v1).format("DD/MM/YYYY"), dayjs(v1).format("DD/MM/YYYY")])
    }

    return (
        <Controller render={({ field }) => (
            <RangeCalendar
                value={value}
                onChange={(value) => {
                    handleOnDateRangeChange(value, field)
                }}
            />
        )} name={name} control={form.control} rules={{ required: required }} />

    )
}

export default DateRangePickerMantine;