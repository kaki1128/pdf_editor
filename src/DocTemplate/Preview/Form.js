import React from "react";
import { TextPart } from "./Components/TextPart";
import { SelectPart } from "./Components/SelectPart";
import { RadioPart } from "./Components/RadioPart";
import { CheckPart } from "./Components/CheckPart";

export const Form = ({ field, form }) => {

    const fieldType = field.inputType;

    let filling = null;

    if (fieldType === "Text") {
        filling =
            <TextPart field={field} form={form} />
    }
    else if (fieldType === "Select") {
        filling =
            <SelectPart field={field} form={form} />
    }
    // else if (fieldType === "Radio") {
    //     filling =
    //         <RadioPart field={field} control={control} />
    // }
    // else if (fieldType === "Check") {
    //     filling =
    //         <CheckPart field={field} control={control} />
    // }
    // else if (fieldType === "Closing") {
    //     filling =
    //         <> Closing </>
    // }
    // else if (fieldType === "Footer") {
    //     filling =
    //         <> Footer </>
    // }

    return (
        <>
            {filling}
        </>
    );
}
