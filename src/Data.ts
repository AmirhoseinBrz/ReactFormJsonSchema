import { DynamicFieldData } from "./DynamicControlTypes";

export const fields: DynamicFieldData[] = [
  {
    fieldName: "name",
    inputType: "text",
    label: "Name",
    defaultValue: "",
    config: {
      required: "Required",
    },
    children: [
      {
        fieldName: "radio-1",
        inputType: "radio",
        label: "Radio",
        defaultValue: "radio-1",
        config: {
          required: "Required",
        },
      },
      {
        fieldName: "radio-2",
        inputType: "radio",
        label: "Radio",
        defaultValue: "radio-2",
        config: {
          required: "Required",
        },
      },
    ],
  },
  {
    fieldName: "age",
    inputType: "number",
    label: "Age",
    defaultValue: 18,
    config: {
      required: "Required",
      validate: (value) => value >= 18 || "Still a minor",
    },
  },
  {
    fieldName: "language",
    inputType: "select",
    label: "Language",
    options: [
      { value: "english", label: "English" },
      { value: "french", label: "French" },
    ],
    defaultValue: "english",
  },
  {
    fieldName: "address",
    inputType: "text",
    label: "Address",
    defaultValue: "",
  },
];
