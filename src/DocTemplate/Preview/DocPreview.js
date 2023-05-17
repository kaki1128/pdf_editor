import _ from "lodash";
import React from "react";

const DocFilling = ({ field, fontSize, getValues }) => {

    const label = field.fieldName;
    const contents = getValues(field.bounding.id);
    const attribute = field.showAttribute;
    const bold = field.bold;
    const underline = field.underline;

    let filling = null;

    if (field.inputType === "Footer") {
        filling =
            <div style={{ fontSize: fontSize - 5, lineHeight: 1.5 }}>
                <b style={{ fontWeight: 900, textShadow: "0.1px 0 #888888" }}>Build King Civil Engineering Limited</b> <br />
                <b style={{ fontWeight: 900, textShadow: "0.1px 0 #888888" }}>利基土木工程有限公司</b> <br />
                Units 601 – 605A, 6/F., Tower B, Manulife Financial Centre, 223 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong <br />
                香港九龍觀塘偉業街223號宏利金融中心B座六樓601至605A室 <br />
                &emsp;T +852 2272 3680 &emsp;&emsp;&emsp;&emsp; F +852 2375 3655 &emsp;&emsp;&emsp;&emsp; E info@buildking.hk
            </div>
    }
    else if (field.inputType === "Closing") {
        filling =
            <div style={{ fontSize: fontSize }}>
                Yours faithfully<br />
                For and on behalf of<br />
                <b>Build King Civil Engineering Limited</b>
            </div>
    }
    else if (field.inputType === "Text" && field.details.textFieldType === "Textarea") {
        filling =
            <div style={{ fontSize: fontSize }}>
                <div dangerouslySetInnerHTML={{ __html: contents }} />
            </div>
    }
    else if (field.inputType === "Text" && field.details.textFieldType === "Input") {
        filling =
            <div style={{
                fontSize: fontSize,
                textDecoration: underline ? "underline" : null,
                fontWeight: bold ? "bold" : null,
                overflow: "hidden"
            }}>
                {attribute &&
                    <span style={{
                        fontSize: fontSize,
                        textDecoration: underline ? "underline" : null,
                        fontWeight: bold ? "bold" : null
                    }}>
                        {label}:&nbsp;
                    </span>
                }

                {field.details.details.prefixPosition ? field.details.details.prefixPosition.start ?
                    <span style={{
                        fontSize: fontSize,
                        textDecoration: underline ? "underline" : null,
                        fontWeight: bold ? "bold" : null
                    }}>
                        {field.details.details.prefixPosition.start}</span>
                    : null : null}

                {contents}

                {field.details.details.prefixPosition ? field.details.details.prefixPosition.end ?
                    <span style={{
                        fontSize: fontSize,
                        textDecoration: underline ? "underline" : null,
                        fontWeight: bold ? "bold" : null
                    }}>
                        {field.details.details.prefixPosition.end}</span>
                    : null : null}

            </div>
    }
    else if (field.inputType === "Select" && field.details.multipleSelect === true) {
        filling =
            <div style={{
                fontSize: fontSize,
                textDecoration: underline ? "underline" : null,
                fontWeight: bold ? "bold" : null,
                overflow: "hidden"
            }}>
                {attribute &&
                    <span style={{
                        fontSize: fontSize,
                        textDecoration: underline ? "underline" : null,
                        fontWeight: bold ? "bold" : null
                    }}>
                        {label}:&nbsp;
                    </span>
                }

                {_.join(contents, "/")}

            </div>
    }
    else {
        filling =
            <div style={{
                fontSize: fontSize,
                textDecoration: underline ? "underline" : null,
                fontWeight: bold ? "bold" : null,
                overflow: "hidden"
            }}>
                {attribute &&
                    <span style={{
                        fontSize: fontSize,
                        textDecoration: underline ? "underline" : null,
                        fontWeight: bold ? "bold" : null
                    }}>
                        {label}:&nbsp;
                    </span>
                }
                {contents}
            </div>
    }

    return (
        <div>
            {filling}
        </div>
    )
}

export const DocPreview = ({ fontSize, getValues, fields, ratio }) => {


    return (
        <>
            {fields.map((field) => (
                <div style={{
                    fontFamily: "Times New Roman",
                    color: "black",
                    lineHeight: "normal"
                }}>
                    <div style={{
                        position: "absolute",
                        left: field.bounding.x / ratio,
                        top: field.bounding.y / ratio - 18,
                    }}>
                    </div>
                    <div style={{
                        position: "absolute",
                        left: field.bounding.x / ratio,
                        top: field.bounding.y / ratio,
                        height: field.bounding.height / ratio,
                        width: field.bounding.width / ratio,
                        overflow: "hidden"
                    }}>
                        {fontSize > 0 &&
                            <DocFilling
                                field={field}
                                getValues={getValues}
                                fontSize={fontSize}
                            />
                        }
                    </div>
                </div>
            ))}
        </>
    )
}