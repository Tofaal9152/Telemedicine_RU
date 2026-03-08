import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type ChildProps<T> = {
  isInvalid: boolean;
  inputProps: {
    name: string;
    value: T;
    onBlur: () => void;
    onChangeText: (value: string) => void;
  };
  onChangeValue: (value: T) => void;
};

type FormFieldWrapperProps<T> = {
  field: AnyFieldApi;
  label: string;
  children: (props: ChildProps<T>) => React.ReactNode;
};

export function FormFieldWrapper<T>({
  field,
  label,
  children,
}: FormFieldWrapperProps<T>) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputProps = {
    name: field.name,
    value: field.state.value as T,
    onBlur: field.handleBlur,
    onChangeText: (value: string) => field.handleChange(value as T),
  };

  return (
    <Field
      orientation="vertical"
      style={{
        flexDirection: "column",
        rowGap: 4,
      }}
    >
      <FieldLabel>{label}</FieldLabel>

      {children({
        isInvalid,
        inputProps,
        onChangeValue: field.handleChange as (value: T) => void,
      })}

      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
    </Field>
  );
}