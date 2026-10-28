"use client";
import * as React from "react";

/** Set by <Field>; <Input>, <Select> and <Textarea> read it, so a Field works with plain children (needed in Next.js server components). */
export type FieldProps = { id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean };
export const FieldContext = React.createContext<FieldProps>({});
export const useFieldProps = () => React.useContext(FieldContext);
