import React from "react";
import {Controller} from "react-hook-form";
import MomentUtils from "@date-io/moment";
import {DatePicker, DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from 'moment';

const DateInputField = (props) => {
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
            <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
                <DatePicker
                    className="bg-white"
                    fullWidth
                    error={Boolean(form.formState.errors[name])}
                    autoOk
                    disableToolbar
                    format="DD/MM/YYYY"
                    label={label}
                    value={field.value ? moment(field.value, "DD/MM/YYYY").isValid() ? moment(field.value, "DD/MM/YYYY").startOf('date').format() : moment(field.value).startOf('date').format() : null}
                    onChange={value => {
                        field.onChange(moment(value).startOf('date').format())
                    }}
                    variant="inline"
                    inputVariant="outlined"
                    size="small"
                />
            </MuiPickersUtilsProvider>
        )} name={name} control={form.control} rules={{required: required}}/>

    )
}

export default DateInputField;