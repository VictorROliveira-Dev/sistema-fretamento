import React from "react";
import { Input } from "./ui/input";
import { FormField } from "@/lib/types";

interface FormInputProps extends FormField {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <Input
      name={name}
      className="border-2 font-medium w-[280px]"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FormInput;
