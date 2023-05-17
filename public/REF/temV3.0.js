//FieldArray:
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FormArray } from "../DocTemplate/Form";

const FieldArray = () => {

    const { control, register, handleSubmit, watch } = useForm({})

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ArrayField"
    })

    return (
        <form onSubmit={handleSubmit(console.log)}>
            <FormArray fields={fields} control={control} register={register} remove={remove} />

            <button onClick={()=>{append({selectType:"", })}}>Append</button>


            <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </form >
    )
}

export default FieldArray;


//FormArray:
import React from "react";
import { SelectionController } from "../DocTemplate/Components/Controllers";
import { types } from "../DocTemplate/Components/DataLists";
import Format from "../DocTemplate/Components/Format";
import Prefix from "../DocTemplate/Components/Prefix";


export const FormArray = ({ control, register, index }) => {

    return (
        <div>
            {index + 1}:

            <SelectionController data={types} label="Select type"
                name={`ArrayField.${index}.selectType`}
                control={control}
            /><br /><br />

            <Format index={index} control={control} /><br />

            <Prefix index={index} control={control} register={register} />

        </div>
    );
}