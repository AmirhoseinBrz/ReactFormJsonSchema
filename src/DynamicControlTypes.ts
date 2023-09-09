import { RegisterOptions } from "react-hook-form";

export type ControlType = "text" | "select" | "number" | "checkbox" | "radio";

export interface SelectOption {
  label: string;
  value: string;
}

export interface DynamicFieldData {
  label: string;
  inputType: ControlType;
  fieldName: string;
  defaultValue?: string | number;
  options?: SelectOption[];
  config?: RegisterOptions;
  children?: DynamicFieldData[];
}
