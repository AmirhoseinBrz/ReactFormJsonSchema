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
    console.log(selectedField);
  }

  const renderFields = (fields, errors) => {
    return fields.map((field, index) => (
      <>
        <div
          key={index}
          onClick={() => setSelectedField(field.fieldName)} // Set selectedField when clicked
          style={{
            cursor: "pointer",
            border:
              field.fieldName === selectedField ? "2px solid blue" : "none", // Add styling for selected field
          }}
        >
          <label htmlFor={field.fieldName}>{field.label}</label>
          <DynamicControl {...field} />
          <ErrorMessage errors={errors} name={field.fieldName} />
        </div>
        {/* Check if the field has children */}
        {field.children && field.children.length > 0 && (
          <>
            {renderFields(field.children, errors)} {/* Recursive call */}
          </>
        )}
      </>
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

// const renderChildren = (children, errors) => {
//   return children.map((child, index) => (
//     <div key={index}>
//       <label htmlFor={child.fieldName}>{child.label}</label>
//       <DynamicControl {...child} />
//       <ErrorMessage errors={errors} name={child.fieldName} />
//     </div>
//   ));
// };

// export const Form = ({ fields }) => {
//   const formMethods = useFormContext();

//   const {
//     handleSubmit,
//     formState: { isSubmitting, errors },
//   } = formMethods;

//   const [selectedField, setSelectedField] = useState(null);

//   function onSubmit(data) {
//     // your logic on what to do with data
//     console.log(data);
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         {fields.map((field, index) => (
//           <div
//             key={index}
//             onClick={() => setSelectedField(field.fieldName)}
//             style={{
//               cursor: "pointer",
//               border: field.fieldName === selectedField ? "2px solid blue" : "none",
//             }}
//           >
//             <label htmlFor={field.fieldName}>{field.label}</label>
//             <DynamicControl {...field} />
//             <ErrorMessage errors={errors} name={field.fieldName} />

//             {field.children && field.fieldName === selectedField && (
//               <div>{renderChildren(field.children, errors)}</div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Submitting" : "Submit"}
//       </button>
//     </form>
//   );
// };
