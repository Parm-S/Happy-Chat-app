import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

const InputRHF = ({
  control,
  label,
  id,
  name,
  inputType = "text",
  placeholder,
  errors,
  isRequired,
}) => {
  const [show, setShow] = React.useState(false);

  const userInputType = React.useMemo(() => {
    if (!show && inputType === "password") {
      return "password";
    } else if (show && inputType === "password") {
      return "text";
    } else {
      return inputType;
    }
  }, [show, inputType]);

  return (
    <FormControl isInvalid={errors[name]} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <InputGroup size="md">
            <Input
              id={id}
              name={name}
              p={1.5}
              type={userInputType}
              placeholder={placeholder}
              onChange={(e) => field.onChange(e.target.value)}
              max={
                inputType === "date"
                  ? new Date().toISOString().split("T")[0]
                  : ""
              }
            />
            {inputType === "password" && (
              <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
        )}
      />
      <FormErrorMessage>
        {Object.keys(errors).length > 0 && errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputRHF;
