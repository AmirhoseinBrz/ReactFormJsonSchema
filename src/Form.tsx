import { FormProvider, useForm } from "react-hook-form";
import { DynamicFieldData } from "./DynamicControlTypes";
import { DynamicControl } from "./DynamicControl";
import { ErrorMessage } from "@hookform/error-message";
import { fields } from "./Data";

const renderFields = (fields, errors) => {
  return fields.map((field, index) => (
    <div key={index}>
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

interface FormProps {
  fields: DynamicFieldData[];
}

export const Form = ({ fields }: FormProps) => {
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  function onSubmit(data, error) {
    // your logic on what to do with data
    console.log(data);
  }

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
