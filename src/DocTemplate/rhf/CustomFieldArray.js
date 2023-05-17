import React, {cloneElement, isValidElement} from "react";
import {TextField} from "@material-ui/core";
import _ from 'lodash';
import {useFieldArray} from "react-hook-form";
import {Button, Grid} from "@mui/material";
import TextInputField from "./TextInputField";

const CustomFieldArray = (props) => {
    const {form, name, label, children} = props;

    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control: form.control,
        name: name
    });

    return (
        <>
            <Grid item xs={12}>
                <div>{label}</div>
                <Button onClick={() => append({})}> + </Button>
            </Grid>
            {props.render(fields, name)}
        </>
    )

}

export default CustomFieldArray;


// EXAMPLE
//
// <CustomFieldArray
//     label="Test" name="test" form={form}
//     render={(fields, name) => (
//         fields.map((item, index) => (
//                 <Fragment key={item.id}>
//                     <Grid item xs={6}>
//                         <TextInputField label="Staff No1." form={form}
//                                         name={`${name}.${index}.test1`}/>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <TextInputField label="Staff No2." form={form}
//                                         name={`${name}.${index}.test2`}/>
//                     </Grid>
//                 </Fragment>
//             )
//         ))}
// />