import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

const FileInputRHF = ({
  control,
  label,
  name,
  type = "file",
  accept = "image/*",
  placeholder,
  errors,
  isRequired = false,
}) => {
  return (
    <FormControl isInvalid={errors[name]} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <Input
            id={name}
            name={name}
            p={1.5}
            type={type}
            accept={accept}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.files[0])}
          />
        )}
      />
      <FormErrorMessage>
        {Object.keys(errors).length > 0 && errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FileInputRHF;
