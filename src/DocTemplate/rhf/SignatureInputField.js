import React, {Fragment, useRef} from "react";
import {Controller} from "react-hook-form";
import _ from 'lodash';
import SignatureCanvas from "react-signature-canvas";
import {Alert} from "@material-ui/lab";

const SignatureInputField = (props) => {
    const {
        form,
        name,
        required = false,
        className = null,
        ...rest
    } = props;

    const componentRef = useRef();
    const warning = 'A Signature should be provided.';

    return (
        <Controller render={({field}) => (
            <Fragment>
                <SignatureCanvas
                    ref={componentRef}
                    penColor='black'
                    onEnd={() => {
                        const dataURL = componentRef.current.getTrimmedCanvas().toDataURL().split(';base64,')[1];
                        field.onChange(dataURL);
                    }}
                    canvasProps={{className: 'sigCanvas w-100 border rounded bg-white', height: 350}}
                />
                {form.formState.errors[name] &&
                    <Alert severity="error" className="mt-2 text-danger font-weight-bold">
                        {warning}
                    </Alert>
                }
            </Fragment>
        )} name={name} control={form.control} rules={{required: required}}/>
    )
}

export default SignatureInputField;