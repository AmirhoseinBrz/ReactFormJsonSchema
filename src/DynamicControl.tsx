import { useFormContext } from "react-hook-form";
import { DynamicFieldData } from "./DynamicControlTypes";

export const DynamicControl = ({
  inputType,
  fieldName,
  defaultValue,
  options = [],
  config = {},
}: DynamicFieldData) => {
  const { register } = useFormContext();

  switch (inputType) {
    case "text":
      return (
        <input
          type="text"
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    case "select": {
      return (
        <select
          {...register(fieldName, config)}
          defaultValue={defaultValue}
          name={fieldName}
          id={fieldName}
        >
          {options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    case "number":
      return (
        <input
          type="number"
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    case "radio":
      return (
        <input
          type="radio"
          value={defaultValue}
          {...register(fieldName, config)}
        />
      );
    default:
      return <input type="text" />;
  }
};
