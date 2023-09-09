import { FormProvider, useForm } from "react-hook-form";
import { DynamicFieldData } from "./DynamicControlTypes";
import { DynamicControl } from "./DynamicControl";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

interface FormProps {
  fields: DynamicFieldData[];
}

export const Form = ({ fields }: FormProps) => {
  const [selectedField, setSelectedField] = useState(null);

  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  function onSubmit(data, error) {
    // your logic on what to do with data
    console.log(data);
  }

  const renderFields = (fields, errors) => {
    return fields.map((field, index) => (
      <div
        key={index}
        onClick={() => setSelectedField(field.fieldName)} // Set selectedField when clicked
        style={{
          cursor: "pointer",
          border: field.fieldName === selectedField ? "2px solid blue" : "none", // Add styling for selected field
        }}
      >
        <label htmlFor={field.fieldName}>{field.label}</label>
        <DynamicControl {...field} />
        <ErrorMessage errors={errors} name={field.fieldName} />

        {/* Check if the field has children */}
        {field.children && field.children.length > 0 && (
          <div>
            {renderFields(field.children, errors)} {/* Recursive call */}
          </div>
        )}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        {renderFields(fields, errors)}
      </FormProvider>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};
