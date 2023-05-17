import React, { useRef } from "react";
import { useFormContext, useController } from "react-hook-form";
// import HookFormError from "./HookFormError";
import { Editor } from "@tinymce/tinymce-react";

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

const stripTags = (str) => {
    if (!str) return str;

    if (str === null || str === "") return false;
    else str = str.toString();

    if (str.includes("<img")) return str;

    return str.replace(/(<([^>]+)>)/gi, "");
};

export const HtmlEditor = ({ defaultValue, name, control }) => {
    const { field } = useController({
        name: name,
        control,
        defaultValue: defaultValue,
        rules: {
            validate: (value) => {
                const content = stripTags(value);

                if (!content && textFieldRef && textFieldRef.current) {
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
            <Editor
                init={{
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "wordcount",
                        "quickbars",
                        "autoresize"
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | link quickimage",
                    formats: {
                        // Changes the default format for h1 to have a class of heading
                        Paragraph: { block: 'Paragraph', classes: 'Paragraph' },
                        underline: { inline: 'u', styles: { 'text-decoration': 'underline' }},
                        bold: { inline: 'span', styles: { 'font-weight': 'bold' }},
                    },
                    file_picker_types: "image",
                    automatic_uploads: true,
                    contextmenu: "image",
                    quickbars_selection_toolbar: "bold italic underline | h2 h3 blockquote link",
                    quickbars_insert_toolbar: false,
                    relative_urls: false,
                    remove_script_host: false,
                    toolbar_mode: "sliding",
                    skin: false,
                    content_css: false,
                    content_style: 'body { font-family:"Montserrat", "Open Sans", sans-serif; font-size:14px;}',
                }}
                {...newField}
                onEditorChange={(newValue) => {
                    // console.log({ newValue });
                    onChange(newValue);
                }}
            />

            {/* <HookFormError name={fieldName} /> */}
        </div>
    );
};