import React from "react";
import { Control, FieldValues, FieldPath, ControllerRenderProps } from "react-hook-form"; // Removed ControllerFieldState import

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

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
      render={({ field }: { field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>> }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
