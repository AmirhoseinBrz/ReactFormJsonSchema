import { FormProvider, useForm } from "react-hook-form";
import { DynamicFieldData } from "./DynamicControlTypes";
import { DynamicControl } from "./DynamicControl";
import { ErrorMessage } from "@hookform/error-message";

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
        {fields.map((d, index) => (
          <div key={index}>
            <label htmlFor={d.fieldName}>{d.label}</label>
            <DynamicControl {...d} />
            <ErrorMessage errors={errors} name={d.fieldName} />
          </div>
        ))}
      </FormProvider>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};
