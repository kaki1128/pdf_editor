import React, { useState } from "react";
import { Radio } from "@mui/material";

export const RadioPart = ({ control, field }) => {

    const label = field.fieldName;
    const dataList = field.details.selections
    const defaultValue = field.details.default;
    const required = field.required;
    //Radio
    const radioMenuItem = field.details.radio;

    const [selectValue, setSelectValue] = useState(defaultValue);
    const [selectList, setSelectList] = useState(defaultValue);

    return (
        <div>
            {label}
            {radioMenuItem.map((t, i) => (
                <div>
                    <Radio
                        checked={selectValue === t}
                        onChange={(event) => {
                            setSelectValue(event.target.value)
                        }}
                        value={t}
                    />
                    {t}
                </div>
            ))}
        </div>
    )
}