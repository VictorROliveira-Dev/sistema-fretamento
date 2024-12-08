import React from "react";
import { Input } from "./ui/input";
import { FormField } from "@/lib/types";

const FormInput: React.FC<FormField> = ({
  label,
  name,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <Input
      name={name}
      className="border-2 font-medium w-[250px]"
      placeholder={placeholder}
      type={type}
    />
  </div>
);

export default FormInput;
