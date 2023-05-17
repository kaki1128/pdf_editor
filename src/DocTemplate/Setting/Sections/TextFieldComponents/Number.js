// import React, { useEffect, useState } from "react";
// import { FormControlLabel, Grid, Switch } from "@mui/material";
// import { InputController, SwitchController } from "../../Elements/Controllers";

// export default ({ index, control, getValues, unregister, setError, clearErrors, errors }) => {

//     const [checked, setChecked] = useState(false);

//     const inputProps = { min: 0, pattern: /^[1-9]+[0-9]*$/ }

//     const minLength = getValues(`ArrayField.${index}.details.details.textLength.minLength`)
//     const maxLength = getValues(`ArrayField.${index}.details.details.textLength.maxLength`)
//     useEffect(() => {
//         if (maxLength < minLength) {
//             setError(`ArrayField.${index}.details.details.textLength`)
//         } else {
//             clearErrors(`ArrayField.${index}.details.details.textLength`)
//         }
//     }, [minLength, maxLength])

//     return (
//         <div>
//             <br />
//             <FormControlLabel control={
//                 <Switch
//                     size="small"
//                     checked={checked}
//                     onChange={(event) => {
//                         setChecked(event.target.checked)
//                         unregister(`ArrayField.${index}.details.details.textLength`)
//                     }} />}
//                 label="Limited length?"
//             />
//             <br />

//             {checked &&
//                 <Grid container>
//                     <Grid item xs={4}>
//                         min. length:
//                     </Grid>
//                     <Grid item xs={8}>
//                         <InputController fullWidth={false}
//                             type={"number"}
//                             inputProps={inputProps}
//                             name={`ArrayField.${index}.details.details.textLength.minLength`}
//                             control={control}
//                         />
//                     </Grid>
//                     <Grid item xs={4}>
//                         max. length:
//                     </Grid>
//                     <Grid item xs={8}>
//                         <InputController fullWidth={false}
//                             type={"number"}
//                             inputProps={inputProps}
//                             name={`ArrayField.${index}.details.details.textLength.maxLength`}
//                             control={control}
//                         />
//                     </Grid>
//                     {errors.ArrayField?.[index]?.details?.details?.textLength &&
//                         (<p style={{ color: "red" }}>
//                             Maximum length should be larger than Minimum length!
//                         </p>)
//                     }
//                 </Grid>
//             }
//             <br />

//             <SwitchController
//                 control={control}
//                 name={`ArrayField.${index}.details.details.integerOnly`}
//             /> integer only?
//             <br />

//             <SwitchController
//                 control={control}
//                 name={`ArrayField.${index}.details.details.positiveOnly`}
//             /> positive number only?

//         </div>
//     )
// } 