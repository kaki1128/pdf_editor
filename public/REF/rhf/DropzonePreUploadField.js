import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import {Controller, useController} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {formatBytes} from "../../../utils/storage";
import {useDispatch} from "react-redux";
import Dropzone from 'react-dropzone';
import {Alert} from "@material-ui/lab";
import {getPreUploadURL, preUploadFile, removePreUpload} from "../../../actions/edms/document";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@material-ui/core";
import _ from 'lodash';

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

const DropzonePreUploadField = (props) => {
    const dispatch = useDispatch();
    const warning = 'At least one file should be provided.';
    const {
        form, label, multiple = false, accept = null, maxSize = 2000000000, required = false
    } = props;

    const validate = (value) => {
        const check = _.find(value, {'uploaded': false});
        return !check || 'Upload not complete'
    }

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {invalid, isTouched, isDirty},
        formState: {touchedFields, dirtyFields}
    } = useController({
        name: props.name, control: form.control, rules: {required: required, validate: validate},
    });

    const [dropError, setDropError] = useState(null);

    const [fileData, setFileData] = useState([]);

    // useEffect(() => {
    //     return () => {
    //         console.log(fileData)
    //         if (fileData) {
    //             fileData.forEach(file => {
    //                 handleDelete(file.file);
    //             })
    //         }
    //     }
    // }, [])

    const handleOnChange = async (files) => {
        if (value) {
            value.forEach(file => {
                handleDelete(file.file);
            })
        }
        let v = [];
        setDropError(null)
        setFileData([])
        let tempFileData = []
        const fileList = files.map(e => ({file_name: e.name, size: e.size, file_type: e.type}));
        for (const file of fileList) {
            const i = fileList.indexOf(file);
            const res = await dispatch(getPreUploadURL(file));
            let t = [...v, {file: res.file, uploaded: false}];
            tempFileData = [...tempFileData, {...file, file: res.file, path: res.path}];
            setFileData(tempFileData);
            onChange(t);
            dispatch(preUploadFile(files[i], res.signed_url, file.file_type)).then(res2 => {
                v = [...v, {file: res.file, uploaded: true}]
                onChange(v);
            })
        }
    }

    const handleDropReject = (files) => {
        setDropError(`File > ${formatBytes(maxSize)} or Invalid file type`);
    }

    const {
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        multiple: multiple, accept: accept, maxSize: maxSize, onDrop: handleOnChange, onDropRejected: handleDropReject
    });

    const handleDelete = (fileId) => {
        dispatch(removePreUpload(fileId)).then(res => {
            setFileData(_.partition(fileData, {'file': fileId})[1])
            onChange(_.partition(value, {'file': fileId})[1])
        })
    }

    return (<div>
        <b className="text-uppercase text-primary font-size-md">{label}</b>
        <DropZoneContainer {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
            <input {...getInputProps()} />
            <div>Drag & drop a file here, or click to select files.</div>
            <div>(Max. Size {formatBytes(maxSize)}/file)</div>
        </DropZoneContainer>
        {value && value.length !== 0 && fileData && fileData.length !== 0 ? value.map((e, i) => (
            <Alert icon={false}
                   style={{cursor: "pointer"}}
                   onClick={e.uploaded ? (ev) => {
                       window.open(_.find(fileData, {'file': e.file})?.path, '_blank')
                   } : null}
                   key={i} severity="info" className="mt-3">
                {e.uploaded &&
                    <span className="mr-2">
                        <Tooltip title="Delete">
                            <IconButton color="primary"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            handleDelete(e.file);
                                        }}
                                        className="btn-transition-none btn-link px-2"
                                        size="small">
                                <FontAwesomeIcon icon={['fas', 'trash-can']}/>
                            </IconButton>
                        </Tooltip>
                    </span>}
                {e.uploaded ? <span className="text-success font-weight-bold">[Uploaded]</span> :
                    <span className="text-black-50 font-weight-bold">[Uploading]</span>}
                <span className="ml-2">
                            {`${_.find(fileData, {'file': e.file})?.file_name}  (${formatBytes(_.find(fileData, {'file': e.file})?.size)})`}
                        </span>
            </Alert>)) : null}

        {form.formState.errors[name] && <Alert severity="error" className="mt-2 text-danger font-weight-bold">
            {form.formState.errors[name]?.message || warning}
        </Alert>}

        {dropError && <Alert severity="error" className="mt-2 text-danger font-weight-bold">
            {dropError}
        </Alert>}
    </div>)
}

export default DropzonePreUploadField;