import React from "react";
import { MultipleSelectionController, SelectionController } from "../Elements/Controllers";

export const SelectPart = ({ form, field }) => {

    const label = field.fieldName;
    const name = field.bounding.id
    const dataList = field.details.selections
    const defaultValue = field.details.default;
    const required = field.required;
    const multiple = field.details.multipleSelect;

    return (
        <>
            {multiple ?
                <>
                    <MultipleSelectionController
                        label={label}
                        data={dataList}
                        name={name}
                        form={form}
                        required={required}
                        // defaultValue={defaultValue}
                    />
                </>
                :
                <>
                    <SelectionController
                        label={label}
                        data={dataList}
                        name={name}
                        form={form}
                        required={required}
                        // defaultValue={defaultValue}
                    />
                </>
            }
        </>
    )
}