import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import {Controller, useController} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {formatBytes} from "../../../utils/storage";
import {useDispatch} from "react-redux";
import Dropzone from 'react-dropzone';
import {Alert} from "@material-ui/lab";
import {getPreUploadURL, preUploadFile, removePreUpload} from "../../../actions/file";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@material-ui/core";
import _ from 'lodash';
import clsx from "clsx";
import {Grid} from "@mantine/core";

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
    const {
        form, label, multiple = false, accept = null, maxSize = 2000000000, required = false, labelOnTop,
    } = props;

    const warning = multiple ? 'At least one file should be provided.' : 'File required.';


    const validate = (value) => {
        if (multiple) {
            const check = _.find(value, {'uploaded': false});
            return !check || 'Upload not complete'
        } else {
            return value?.uploaded ? undefined : 'Upload not complete'
        }
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

    const handleSingleOnChange = async (files) => {
        if (value) handleDelete(value.file);

        if (files && files.length > 0) {
            setDropError(null);
            setFileData(null);
            const fileList = files.map(e => ({file_name: e.name, size: e.size, file_type: e.type}));
            const file = fileList[0];
            const res = await dispatch(getPreUploadURL(file));
            let t = {file: res.file, uploaded: false};
            let tempFileData = {...file, file: res.file, path: res.path}
            setFileData(tempFileData);
            onChange(t);
            dispatch(preUploadFile(files[0], res.signed_url, file.file_type)).then(res2 => {
                let v = {file: res.file, uploaded: true}
                onChange(v);
            })
        }
    }

    const handleOnChange = async (files) => {
        if (value) value.forEach(file => handleDelete(file.file))

        if (files && files.length > 0) {
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
    }

    const handleDropReject = (files) => setDropError(`File > ${formatBytes(maxSize)} or Invalid file type`);

    const {
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        multiple: multiple,
        accept: accept,
        maxSize: maxSize,
        onDrop: multiple ? handleOnChange : handleSingleOnChange,
        onDropRejected: handleDropReject
    });

    const handleDelete = (fileId) => {
        dispatch(removePreUpload(fileId)).then(res => {
            if (multiple) {
                setFileData(_.partition(fileData, {'file': fileId})[1])
                onChange(_.partition(value, {'file': fileId})[1])
            } else {
                setFileData(null);
                onChange(null);
            }

        })
    }

    return (
        <div>
            {labelOnTop &&
                <div className="font-weight-bold text-uppercase font-size-md text-primary">
                    <div className={clsx({"text-danger": Boolean(_.get(form.formState.errors, name), undefined)})}>
                        {label}{required && '*'}
                    </div>
                </div>
            }
            <DropZoneContainer {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                <input {...getInputProps()} />
                <div className="text-uppercase my-2">{labelOnTop ? null : label}</div>
                <div>Drag & drop a file here, or click to select files.</div>
                <div>(Max. Size {formatBytes(maxSize)}/file)</div>
            </DropZoneContainer>

            {multiple && value && value.length !== 0 && fileData && fileData.length !== 0 ? value.map((e, i) => (
                <Alert icon={false}
                       style={{cursor: "pointer"}}
                       onClick={e.uploaded ? (ev) => {
                           window.open(_.find(fileData, {'file': e.file})?.path, '_blank')
                       } : null}
                       key={i} severity="info" className="mt-3">

                    <Grid>
                        {e.uploaded &&
                            <Grid.Col span="content" className="d-flex">
                                <Tooltip title="Delete">
                                    <IconButton color="primary"
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    handleDelete(e.file);
                                                }}
                                                className="btn-transition-none btn-link px-2 my-auto"
                                                size="small">
                                        <FontAwesomeIcon icon={['fas', 'trash-can']}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid.Col>}


                        <Grid.Col span="content" className="d-flex">
                            {e.uploaded ?
                                <FontAwesomeIcon
                                    className="text-success my-auto"
                                    icon={['fas', 'circle-check']}
                                    fixedWidth/> :
                                <FontAwesomeIcon
                                    className="text-black-50 my-auto"
                                    icon={['fas', 'circle-check']}
                                    fixedWidth/>
                            }
                        </Grid.Col>

                        <Grid.Col span="auto" className="d-flex">
                            <div className="my-auto">
                                {`${_.find(fileData, {'file': e.file})?.file_name}  (${formatBytes(_.find(fileData, {'file': e.file})?.size)})`}
                            </div>
                        </Grid.Col>
                    </Grid>
                </Alert>)) : null}

            {!multiple && value && fileData ?
                <Alert icon={false}
                       style={{cursor: "pointer"}}
                       onClick={value.uploaded ? (ev) => {
                           window.open(fileData.path, '_blank')
                       } : null}
                       severity="info" className="mt-3">
                    <Grid>
                        {value.uploaded &&
                            <Grid.Col span="content" className="d-flex">
                                <Tooltip title="Delete">
                                    <IconButton color="primary"
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    handleDelete(value.file);
                                                }}
                                                className="btn-transition-none btn-link px-2 my-auto"
                                                size="small">
                                        <FontAwesomeIcon icon={['fas', 'trash-can']}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid.Col>}


                        <Grid.Col span="content" className="d-flex">
                            {value.uploaded ?
                                <FontAwesomeIcon
                                    className="text-success my-auto"
                                    icon={['fas', 'circle-check']}
                                    fixedWidth/> :
                                <FontAwesomeIcon
                                    className="text-black-50 my-auto"
                                    icon={['fas', 'circle-check']}
                                    fixedWidth/>
                            }
                        </Grid.Col>

                        <Grid.Col span="auto" className="d-flex">
                            <div className="my-auto">
                                {`${fileData.file_name}  (${formatBytes(fileData.size)})`}
                            </div>
                        </Grid.Col>
                    </Grid>
                </Alert> : null
            }

            {form.formState.errors[name] && <Alert severity="error" className="mt-2 text-danger font-weight-bold">
                {form.formState.errors[name]?.message || warning}
            </Alert>}

            {dropError && <Alert severity="error" className="mt-2 text-danger font-weight-bold">
                {dropError}
            </Alert>}
        </div>)
}

export default DropzonePreUploadField;