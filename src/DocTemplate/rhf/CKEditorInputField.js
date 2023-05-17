import React, {Fragment} from "react";
import {Controller, useController} from "react-hook-form";

const CKEditorInputField = (props) => {
    const {
        form,
        // name,
        label,
        required = false,
        className = null,
        ...rest
    } = props;

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {invalid, isTouched, isDirty},
        formState: {touchedFields, dirtyFields}
    } = useController({
        name: props.name,
        control: form.control,
        rules: {required: required},
    });

    return (
        <Fragment>
            <div className="card-header rounded-0 border-bottom-0 bg-transparent px-1 pt-0">
                <div className="card-header--title d-flex">
                    <div className="text-uppercase mr-2 font-weight-bold my-auto">{label}
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CKEditorInputField;