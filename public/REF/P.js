// import { Box, Button, Grid, Group, Stack } from "@mantine/core";
import { useRef, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import ReactMultiCrops from "react-multi-crops";

export const PrefixArray = ({ index, form }) => {
  const { register, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `ArrayField.${index}.prefix`,
    keyName: "key"
  });

  const appendPrefix = () => {
    append({ value: "" });
  };

  return (
    <>
      {fields.map((field, prefixIndex) => (
        <div key={field.key}>
          <label>Prefix {prefixIndex + 1}</label>
          <div>
            <input
              {...register(`ArrayField.${index}.prefix.${prefixIndex}.value`)}
            />
            <button color="red.8" onClick={() => remove(prefixIndex)}>
              x
            </button>
          </div>
        </div>
      ))}

      <button onClick={appendPrefix}>Append Prefix</button>
    </>
  );
};

const ArrayField = ({ fields, form, remove, handleRemoveInput }) => {
  const { register } = form;

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.key} sx={{ marginBottom: 24 }}>
          <label>Select Type</label>
          <input {...register(`ArrayField.${index}.selectType`)} />

          <PrefixArray index={index} form={form} />

          <button
            color="red.8"
            onClick={() => {
              remove(index);
              handleRemoveInput(index);
            }}
          >
            Remove Input
          </button>
        </div>
      ))}
    </div>
  );
};

export default function Form() {
  const form = useForm({ defaultValues: {}, shouldUnregister: true });
  const { control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ArrayField",
    keyName: "key"
  });

  const [file, setFile] = useState();
  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const [actualWidth, setActualWidth] = useState();
  const [coordinates, setCoordinates] = useState([]);

  console.log(coordinates);

  const imgRef = useRef();

  const watch = useWatch({ control });
  console.log(watch);

  // useLogger("", [actualWidth]);
  const handleOnDraw = (coordinate, index, coordinates) => {
    const { id, ...rest } = coordinate;
    if (index + 1 > fields.length) {
      append({ prefix: [], bounding: rest }, { shouldFocus: false });
    } else {
      setValue(`ArrayField.${index}.bounding`, rest);
    }
    setCoordinates(coordinates);
  };

  const handleOnChange = (coordinate, index, coordinates) => {
    setCoordinates(coordinates);
  };

  const handleOnDelete = (coordinate, index, coordinates) => {
    setCoordinates(coordinates);
    remove(index);
  };

  const handleRemoveInput = (index) => {
    setCoordinates((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  };

  return (
    <form>
      <div>
        <div span={12}>
          <input type="file" onChange={handleFileUpload} />
        </div>
        <div span={8}>
          <div ref={imgRef}>
            <ReactMultiCrops
              src={file}
              coordinates={coordinates}
              onLoad={(event) => setActualWidth(event.target.naturalWidth)}
              onDraw={handleOnDraw}
              onChange={handleOnChange}
              onDelete={handleOnDelete}
              width="50%"
            />
          </div>
        </div>
        <div span={4}>
          <ArrayField
            fields={fields}
            remove={remove}
            form={form}
            handleRemoveInput={handleRemoveInput}
          />
        </div>
      </div>
    </form>
  );
}
