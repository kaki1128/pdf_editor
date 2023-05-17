import React from "react";
import { DatePickerController, TimeInputController } from "../../Elements/Controllers";

export default ({ field, label, name, required, form }) => {

    const type = field.details.details.timeType;
    const format = field.details.details.format;
    const presetCurrent = field.details.details.default;

    let filling = null;
    if (type === "date") {
        filling =
            <DatePickerController
                name={name}
                label={label}
                format={format}
                required={required}
                form={form}
                presetCurrent={presetCurrent}
            />
    }
    else if (type === "time") {
        filling =
            <TimeInputController
                name={name}
                label={label}
                format={format}
                required={required}
                form={form}
                presetCurrent={presetCurrent}
                withSeconds={format.includes("ss") ? true : false}
                ampmFormat={format.includes("A") ? "12" : "24"}
            />
    }

    return (
        <>
            {filling}
        </>
    )
}