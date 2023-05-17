import React, { useRef } from "react";
import { useFormContext, useController } from "react-hook-form";
// import HookFormError from "./HookFormError";
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";

// eslint-disable-next-line
/* eslint import/no-webpack-loader-syntax: off */
import tinymce from "tinymce/tinymce";
import "tinymce/models/dom/model";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
import _ from "lodash";

const stripTags = (str) => {
    if (!str) return str;

    if (str === null || str === "") return false;
    else str = str.toString();

    if (str.includes("<img")) return str;

    return str.replace(/(<([^>]+)>)/gi, "");
};

export const HtmlEditor = (props) => {

    const { defaultValue, name, label, required, form, control = form.control, showErrorMsg = "true" } = props;

    const { field } = useController({
        name: name,
        control,
        defaultValue: defaultValue,
        rules: {
            validate: (value) => {
                const content = stripTags(value);

                if (!content && textFieldRef && textFieldRef.current && required) {
                    return "Text in this field is required.";
                }

                return true;
            }
        }
    });
    const textFieldRef = useRef(null);

    const content_style =
        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } a{color: #0000f1 !important;}";

    const { onChange, ...newField } = field;

    return (
        <div key={field.id} ref={textFieldRef}>
            <div className="font-weight-bold text-uppercase font-size-md text-primary">
                <div className={clsx({ "text-danger": Boolean(form.formState.errors[name]) })}>
                    {label}{required && '*'}
                </div>
            </div>
            <Editor
                init={{
                    menubar: false,
                    selector: 'textarea#format-custom',
                    height: 250,
                    plugins: 'table wordcount',
                    content_style: '.left { text-align: left; } ' +
                        'img.left { float: left; } ' +
                        'table.left { float: left; } ' +
                        '.right { text-align: right; } ' +
                        'img.right { float: right; } ' +
                        'table.right { float: right; } ' +
                        '.center { text-align: center; } ' +
                        'img.center { display: block; margin: 0 auto; } ' +
                        'table.center { display: block; margin: 0 auto; } ' +
                        '.full { text-align: justify; } ' +
                        'img.full { display: block; margin: 0 auto; } ' +
                        'table.full { display: block; margin: 0 auto; } ' +
                        '.bold { font-weight: bold; } ' +
                        '.italic { font-style: italic; } ' +
                        '.underline { text-decoration: underline; } ' +
                        '.example1 {} ' +
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' +
                        '.tablerow1 { background-color: #D3D3D3; }',
                    toolbar:
                        "undo redo | styles | italic |" +
                        "forecolor |alignleft aligncenter alignright alignjustify|" +
                        "bullist numlist outdent indent |removeformat ",
                    formats: {
                        alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'left' },
                        aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'center' },
                        alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'right' },
                        alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'full' },
                        bold: { inline: 'span', styles: { fontWeight: 'bold' }, classes: 'bold' },
                        italic: { inline: 'span', styles: { fontStyle: 'italic' }, classes: 'italic' },
                        underline: { inline: 'span', styles: { textDecoration: 'underline' }, classes: 'underline', exact: true },
                        strikethrough: { inline: 'del' },
                        boldunderline: { inline: 'span', styles: { fontWeight: 'bold', textDecoration: 'underline' } },
                        customformatUnderline: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format' }, classes: 'example1' }
                    },
                    style_formats: [
                        { title: 'Underline', format: 'underline' },
                        { title: 'Bold', format: 'bold' },
                        { title: 'Bold & Underline', format: 'boldunderline' },
                    ]
                }}
                {...newField}
                onEditorChange={(newValue) => {
                    onChange(newValue);
                }}
            />
            {showErrorMsg && Boolean(_.get(form.formState.errors, name), undefined) &&
                <div style={{ color: "red", fontSize: "12px" }}>
                    *This field is Required
                </div>}
        </div>
    );
};