import React, { useEffect, useState } from "react";
import { Button, Checkbox, Grid, Switch } from "@mui/material";
import { InputController } from "../../Elements/Controllers";
import TextInputField from "../../../rhf/TextInputField";

export default ({ index, form }) => {

    const [checked, setChecked] = useState(false);

    const selected = form.getValues(`ArrayField.${index}.details.textFieldType`);
    useEffect(() => {
        setChecked(false)
    }, [selected])

    return (
        <>
            <Checkbox
                size="small"
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked)
                    form.unregister(`ArrayField.${index}.details.details.prefixPosition`)
                }}
            /> Prefix?

            {checked &&
                <> Position:
                    <Grid container spacing={0.5}>
                        <Grid item xs={12}>
                            <TextInputField
                                form={form}
                                label="Start"
                                name={`ArrayField.${index}.details.details.prefixPosition.start`}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInputField
                                form={form}
                                label="End"
                                name={`ArrayField.${index}.details.details.prefixPosition.end`}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}
