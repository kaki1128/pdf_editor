import React, { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { InputController } from "../../Elements/Controllers";

export default ({ index, control, unregister }) => {

    const [checked, setChecked] = useState(false);

    return (
        <div>
            <FormControlLabel control={
                <Switch
                    size="small"
                    checked={checked}
                    onChange={(event) => {
                        setChecked(event.target.checked)
                        unregister(`ArrayField.${index}.details.details.format`)
                    }} />}
                label="Special format?"
            />

            {checked && <InputController
                name={`ArrayField.${index}.details.details.format`}
                control={control}
            />}
        </div>
    )
} 