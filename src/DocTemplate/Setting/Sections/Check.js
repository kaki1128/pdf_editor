import React, { useEffect, useState } from "react";
import { InputController } from "../Elements/Controllers";
import { useFieldArray } from "react-hook-form";
import { Button, Checkbox, Grid } from "@mui/material";
import TextInputField from "../../rhf/TextInputField";

export default ({ index, form, control = form.control }) => {

    const { fields, remove, append } = useFieldArray({
        control,
        name: `ArrayField.${index}.details.check`
    });

    // const [selectedValue, setSelectedValue] = useState([]);
    // const copy = [...selectedValue];
    // const filteredArray = selectedValue.filter((item) => item !== null);
    // const results = [];

    // useEffect(() => {
    //     filteredArray.forEach((item, i) => {
    //         results.push(form.getValues(`ArrayField.${index}.details.check.${parseInt(item)}`))
    //     })
    //     form.setValue(`ArrayField.${index}.details.default`, results)
    // }, [selectedValue])

    return (
        <Grid item xs={12}>
            Add Checks:
            {fields.map((nestedItem, nestedIndex) => {
                return (
                    <Grid container key={nestedItem.id}>
                        <Grid item xs={8}>
                            <TextInputField
                                form={form}
                                name={`ArrayField.${index}.details.check.${nestedIndex}`}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* <Checkbox
                            value={nestedIndex}
                            checked={selectedValue[nestedIndex] === `${nestedIndex}`}
                            onClick={(event) => {
                                if (event.target.value === selectedValue[nestedIndex]) {
                                    copy[nestedIndex] = null
                                } else {
                                    copy[nestedIndex] = event.target.value
                                }
                                setSelectedValue(copy)
                            }}
                        /> */}

                            <Button
                                type="button"
                                onClick={() => {
                                    remove(nestedIndex)
                                    // setSelectedValue(current =>
                                    //     current.filter((item, index) => {
                                    //         return index !== nestedIndex;
                                    //     }))
                                }}
                            >
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                )
            })}

            <Button type="button" onClick={() => { append() }}>Append Check</Button>
        </Grid>
    )
} 