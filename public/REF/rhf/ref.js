import React, { useState } from "react";
import { Controller } from "react-hook-form";
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import { Calendar, DatePicker } from '@mantine/dates'
import clsx from "clsx";
import { TextField } from "@material-ui/core";
import _ from "lodash";
import { Popover } from "@mantine/core";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";

const DateInputFieldv2 = (props) => {
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
    const [displayValue, setDisplayValue] = useState('');
    const [opened, { close, open }] = useDisclosure(false);

    const handleOnDateChange = (v, field) => {
        setValue(v);
        const stringValue = dayjs(v);
        setDisplayValue(stringValue.format("DD/MM/YYYY"));
        field.onChange(stringValue.format("HH:mm"));
        console.log(stringValue);
        close();
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
                    <Popover position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <TextField
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
                            <Calendar value={value} onChange={(value) => handleOnDateChange(value, field)} />
                        </Popover.Dropdown>
                    </Popover>
                </>

            )} name={name} control={form.control} rules={{ required: required }} />

            <TimeInput
                value={dayjs().hour(field?.value?.split(':')[0] || 0).minute(field?.value?.split(':')[1] || 0).date()}
                onChange={(value) => handleOnTimeChange(value, field)} />
        </>
    )
}

export default DateInputFieldv2;