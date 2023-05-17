import { Checkbox, Grid, Radio } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import SelectInputField from "../../../rhf/SelectInputField";
import { CheckController, CheckWithValueController, SelectionController, SwitchController } from "../../Elements/Controllers";
import { dateFieldTypes, timeFieldTypes } from "../../Elements/DataLists";

export default ({ index, form }) => {

    const [selectedValue, setSelectedValue] = useState("date");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === "time") {
            form.setValue(`ArrayField.${index}.details.details`, {
                "timeType": event.target.value,
                "format": "HH:mm"
            })
        } else {
            form.setValue(`ArrayField.${index}.details.details`, {
                "timeType": event.target.value,
                "format": "D MMMM, YYYY"
            })
        }
    };

    return (
        <>
            <Grid item xs={12}>
                <Radio
                    checked={selectedValue === "time"}
                    onChange={handleChange}
                    value="time"
                    name="radio-buttons"
                /> Time &emsp;
                <Radio
                    checked={selectedValue === "date"}
                    onChange={handleChange}
                    value={"date"}
                    name="radio-buttons"
                /> Date

                {selectedValue === "time" &&
                    <SelectInputField
                        form={form}
                        label="Select Format"
                        name={`ArrayField.${index}.details.details.format`}
                        data={timeFieldTypes}
                        required={true}
                        selectFirst={true}
                    />
                }
                {selectedValue === "date" &&
                    <SelectInputField
                        form={form}
                        label="Select Format"
                        name={`ArrayField.${index}.details.details.format`}
                        data={dateFieldTypes}
                        required={true}
                        selectFirst={true}
                    />
                }
            </Grid>
        </>
    )
} 