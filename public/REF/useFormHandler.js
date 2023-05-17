import { useCallback, useState } from "react";

// create a custom useFormHandler hook that returns initial values
// and a handleChange function to update the values.
// the handleChange function will first deconstruct e.target.name and
// e.target.value, then in the setValues callback function, it'll
// spread out any previous state before updating the changed [name]
// property (ex. name="username") with an updated "value"
const useFormHandler = () => {
  const [values, setValues] = useState("");

  const handleChange = useCallback(
    ({ target: { name, value } }) =>
      setValues(prevState => ({ ...prevState, [name]: value })),
    []
  );

  return {
    handleChange,
    values
  };
};

export default useFormHandler;