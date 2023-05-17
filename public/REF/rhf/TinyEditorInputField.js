import React, {Fragment, useRef} from "react";
import {Controller, useController} from "react-hook-form";
import {Editor} from "@tinymce/tinymce-react";
import {Alert} from "@material-ui/lab";

const TinyEditorInputField = (props) => {
    const warning = 'Required.';
    const {
        form, // name,
        label, required = false, className = null, ...rest
    } = props;
    const editorRef = useRef(null);
    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {invalid, isTouched, isDirty},
        formState: {touchedFields, dirtyFields}
    } = useController({
        name: props.name, control: form.control, rules: {required: required},
    });

    return (
        <Fragment>
            <div className="card-header rounded-0 border-bottom-0 bg-transparent px-1 py-0">
                <div className="card-header--title d-flex">
                    <div className="text-primary text-uppercase mr-2 font-weight-bold my-auto">
                        {label}
                    </div>
                </div>
            </div>
            <Editor
                value={value}
                onInit={(evt, editor) => editorRef.current = editor}
                onEditorChange={(newText, editor) => {
                    onChange(newText)
                }}
                init={{
                    height: 350,
                    menubar: 'edit table',
                    plugins: 'table',
                    // plugins:
                    //     'advlist autolink lists link image charmap print preview anchor ' +
                    //     'searchreplace visualblocks code fullscreen ' +
                    //     'insertdatetime media table paste code help wordcount '
                    // ,
                    toolbar: 'undo redo | fontsizeselect formatselect | ' +
                        'bold italic forecolor backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent',
                    fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                    content_style: 'body { font-family:"Montserrat", "Open Sans", sans-serif; font-size:14px }',
                }}
            />
            {form.formState.errors[name] &&
                <Alert severity="error" className="mt-2">
                    {warning}
                </Alert>
            }
        </Fragment>
    )
}

export default TinyEditorInputField;