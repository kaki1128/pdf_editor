import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import {Controller, useController} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {formatBytes} from "../../../utils/storage";
import {useDispatch} from "react-redux";
import Dropzone from 'react-dropzone';
import {Alert} from "@material-ui/lab";

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const DropZoneContainer = styled.div`
  flex: 1;
  height: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const DropzoneField = (props) => {
    const warning = 'At least one file should be provided.';
    const {
        form,
        label,
        multiple = false,
        accept = null,
        maxSize = 20000000,
        required = false,
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

    const [dropError, setDropError] = useState(null);

    const handleOnChange = (files) => {
        setDropError(null)
        onChange(files)
    }

    const handleDropReject = (files) => {
        console.log(files);
        setDropError(`File > ${formatBytes(maxSize)} or Invalid file type`);
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone(
        {
            multiple: multiple,
            accept: accept,
            maxSize: maxSize,
            onDrop: handleOnChange,
            onDropRejected: handleDropReject
        }
    );


    return (
        <div>
            <b className="text-uppercase text-primary font-size-md">{label}</b>
            <DropZoneContainer {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                <input {...getInputProps()} />
                <div>Drag & drop a file here, or click to select files.</div>
                <div>(Max. Size {formatBytes(maxSize)}/file)</div>
            </DropZoneContainer>
            {value && value.length !== 0 ?
                value.map((e, i) => (
                    <Alert onClick={() => window.open(URL.createObjectURL(e), '_blank')}
                           key={i} severity="info" className="mt-3" style={{cursor: "pointer"}}>
                        {`${e.name}  (${formatBytes(e.size)})`}
                    </Alert>
                ))
                : null}

            {form.formState.errors[name] &&
                <Alert severity="error" className="mt-2 text-danger font-weight-bold">
                    {warning}
                </Alert>
            }

            {dropError &&
                <Alert severity="error" className="mt-2 text-danger font-weight-bold">
                    {dropError}
                </Alert>
            }
        </div>
    )
}

export default DropzoneField;