import React, { useEffect, useState } from "react";
import { MultipleSelectionController } from "../Elements/Controllers";


export const CheckPart = ({ control, field }) => {

    const label = field.fieldName;
    const dataList = field.details.check
    const defaultValue = field.details.default;
    const required = field.required;

    return (
        <MultipleSelectionController
            data={dataList}
            name={label}
            control={control}
            required={required}
            defaultValue={defaultValue}
        />
    )

    // const label = field.fieldName;
    // // const defaultValue = field.details.default;
    // // const required = field.required;

    // //Check list
    // const checkMenuItem = field.details.check;

    // const [selectList, setSelectList] = useState([]);
    // const copy = [...selectList];
    // const filteredArray = _.join(selectList.filter((item) => item !== null), "/");

    // // useEffect(() => {
    // //     setValue("label", "1")
    // // }, [selectList])

    // return (
    //     <div>
    //         {console.log(selectList, "test")}
    //         {console.log(filteredArray, "testfi")}
    //         {label}
    //         {checkMenuItem.map((t, i) => (
    //             <>
    //                 <Checkbox
    //                     checked={selectList.find(element => element === t)}
    //                     onClick={(event) => {
    //                         if (event.target.value === selectList[i]) {
    //                             copy[i] = null
    //                         } else {
    //                             copy[i] = event.target.value
    //                         }
    //                         setSelectList(copy)
    //                     }}
    //                     value={t}
    //                 />
    //                 {t}
    //             </>
    //         ))}
    //     </div>
    // )

}