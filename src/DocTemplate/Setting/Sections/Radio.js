import React, { useState } from "react";
import { InputController } from "../Elements/Controllers";
import { useFieldArray } from "react-hook-form";
import { Button, Radio } from "@mui/material";

export default ({ index, control, setValue, getValues }) => {

    const { fields, remove, append } = useFieldArray({
        control,
        name: `ArrayField.${index}.details.radio`
    });

    const [selectedValue, setSelectedValue] = useState();
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setValue(`ArrayField.${index}.details.default`,
            getValues(`ArrayField.${index}.details.radio.${parseInt(event.target.value)}`))
    };
    const handleClick = (event) => {
        if (event.target.value === selectedValue) {
            setSelectedValue("");
            setValue(`ArrayField.${index}.details.default`, "")
        }
    };

    return (
        <div>
            {fields.map((nestedItem, nestedIndex) => {
                return (
                    <div key={nestedItem.id}>

                        <InputController fullWidth={false}
                            name={`ArrayField.${index}.details.radio.${nestedIndex}`}
                            control={control}
                        /> &nbsp;&nbsp;

                        <Radio
                            checked={selectedValue === `${nestedIndex}`}
                            onChange={handleChange}
                            onClick={handleClick}
                            value={nestedIndex}
                            name="radio-buttons"
                        />

                        <Button
                            type="button"
                            onClick={() => {
                                remove(nestedIndex)
                                if (nestedIndex == selectedValue) {
                                    setValue(`ArrayField.${index}.details.default`, "")
                                    setSelectedValue("")
                                }
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                )
            })}

            <Button type="button" onClick={() => { append() }}>Append Radio</Button>
        </div>
    )
} 