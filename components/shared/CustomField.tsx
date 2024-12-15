import React from "react";
import { Control, FieldValues, FieldPath, ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

import { formSchema } from "./TransformationForm";

type CustomFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  render: (props: { field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>> }) => React.ReactNode;
  name: FieldPath<TFieldValues>;
  formLabel?: string;
  className?: string;
};

export const CustomField = <TFieldValues extends FieldValues>({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }: { 
        field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>; 
        fieldState: ControllerFieldState 
      }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};