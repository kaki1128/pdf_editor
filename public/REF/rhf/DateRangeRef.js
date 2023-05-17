import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { RangeCalendar } from '@mantine/dates'
import clsx from "clsx";
import { TextField } from "@material-ui/core";
import _ from "lodash";
import { Popover } from "@mantine/core";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";

const DateRangeInputFieldv2 = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        labelOnTop,
        ...rest
    } = props;

    const [value, setValue] = useState([null, null]);
    const [displayValue, setDisplayValue] = useState('');
    const [opened, { close, open }] = useDisclosure(false);

    const handleOnDateChange = (v, field) => {
        setValue(v);
        const dateValues = v.map((e, i) => (dayjs(e)))
        setDisplayValue(dateValues.map(e => e.format("DD/MM/YYYY")).join(' - '));
        field.onChange(dateValues.map(e => e.format()));
        if (v[0] && v[1]) close();
    }

    return (
        <>
            {labelOnTop &&
                <div className="font-weight-bold text-uppercase font-size-md text-primary">
                    <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                        {label}{required && '*'}
                    </div>
                </div>
            }
            <Controller render={({ field }) => (
                <>
                    <Popover position="bottom" withArrow shadow="md" opened={opened} onChange={(opened) => {
                        if (!value[0] || !value[1]) {
                            setValue([null, null])
                            setDisplayValue('')
                            field.onChange(undefined)
                        }
                        close();
                    }}>
                        <Popover.Target>
                            <TextField
                                // onBlurCapture={close}'
                                value={displayValue}
                                onChange={null}
                                size="small"
                                variant="outlined"
                                className="bg-white"
                                error={Boolean(_.get(form.formState.errors, name), undefined)}
                                label={labelOnTop ? null : label}
                                fullWidth
                                onClick={open}
                            />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <RangeCalendar value={value} onChange={(value) => handleOnDateChange(value, field)} />
                        </Popover.Dropdown>
                    </Popover>
                </>
            )} name={name} control={form.control} rules={{ required: required }} />
        </>
    )
}

export default DateRangeInputFieldv2;