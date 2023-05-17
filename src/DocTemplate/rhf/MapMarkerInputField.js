import React, {Fragment, useEffect, useState} from "react";
import {Controller, useController} from "react-hook-form";
import {Alert} from "@material-ui/lab";
import ReactDOMServer from "react-dom/server";
import Leaflet from "leaflet";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const customMarkerIcon = (icon) => {
    const iconHTML = ReactDOMServer.renderToString(icon)

    return new Leaflet.DivIcon({
        html: iconHTML,
        popupAnchor: [10, -35],
        iconAnchor: [15, 30],
        className: 'bg-transparent'
    });
}

const LocationMarker = (props) => {
    const {value, handleOnChange} = props;
    const [position, setPosition] = useState(value)
    const map = useMapEvents({
        click(e) {
            map.flyTo(e.latlng.wrap(), map.getZoom());
            setPosition(Object.values(e.latlng.wrap()));
            handleOnChange(Object.values(e.latlng.wrap()));
        },
    })

    return (
        position ?
            <Marker position={position}
                    icon={customMarkerIcon(
                        <FontAwesomeIcon
                            className="text-primary"
                            icon={['fas', 'location-pin']} size="3x" fixedWidth/>)}>
            </Marker> : <div>Please add Location</div>
    )
}

const MapMarkerInputField = (props) => {
    const {
        form, label, required = false
    } = props;
    const warning = 'At least one Location should be provided.';
    const validate = (value) => {

    }

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {invalid, isTouched, isDirty},
        formState: {touchedFields, dirtyFields}
    } = useController({
        name: props.name, control: form.control, rules: {required: required, validate: validate},
    });

    const handleOnChange = (latlng) => {
        onChange(latlng);
    }

    return (
        <Fragment>
            <div className={clsx("h-100 rounded", {"border border-danger": form.formState.errors[name]})}>
                <MapContainer
                    className="h-100 rounded"
                    style={{minHeight: '350px'}}
                    doubleClickZoom={false}
                    center={value || [22.3726745, 114.0871759]}
                    scrollWheelZoom={true}
                    dragging={true}
                    zoom={12}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <LocationMarker value={value} handleOnChange={handleOnChange}/>
                </MapContainer>
            </div>

            {/*{form.formState.errors[name] && <Alert severity="error" className="mt-2 text-danger font-weight-bold">*/}
            {/*    {form.formState.errors[name]?.message || warning}*/}
            {/*</Alert>}*/}
        </Fragment>
    )
}

export default MapMarkerInputField;