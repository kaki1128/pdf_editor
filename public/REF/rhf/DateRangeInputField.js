import React from "react";
import {Controller} from "react-hook-form";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
// import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import {DatePicker, DateTimePicker, LocalizationProvider} from "@material-ui/pickers";
import moment from 'moment';
import 'moment/locale/en-gb'

const DateRangeInputField = (props) => {
    const {
        form,
        name,
        label,
        required = false,
        className = null,
        ...rest
    } = props;

    return (
        <Controller render={({field}) => (
                <DatePicker
                    fullWidth
                    error={Boolean(form.formState.errors[name])}
                    autoOk
                    disableToolbar
                    format="dd/MM/yyyy"
                    label={label}
                    value={field.value ? moment(field.value, "DD/MM/YYYY").format() : null}
                    onChange={value => field.onChange(moment(value).format('L'))}
                    variant="inline"
                    inputVariant="outlined"
                    size="small"
                />
        )} name={name} control={form.control} rules={{required: required}}/>

    )
}

export default DateRangeInputField;