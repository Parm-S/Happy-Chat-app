import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { VStack, StackDivider, Button } from "@chakra-ui/react";
import InputRHF from "../common/InputRHF";
import FileInputRHF from "../common/FileInputRHF";

import { registerSchema } from "./schema";
import { userRegisterObject } from "./constant";

import data from "../../data.json";

const Register = () => {
  const DEFAULT_VALUES = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function onSubmit(values) {
    console.log(values);
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch">
      <form onSubmit={handleSubmit(onSubmit)}>
        {userRegisterObject.map((item) => (
          <InputRHF
            id={item.id}
            name={item.name}
            inputType={item.inputType}
            errors={errors}
            placeholder={item.placeholder}
            label={item.label}
            isRequired={item.isRequired}
            control={control}
            key={item.name}
          />
        ))}
        <FileInputRHF
          name={"pic"}
          control={control}
          errors={errors}
          label={"Upload your picture"}
        />
        <Button
          mt={4}
          width={"100%"}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit">
          {data.register.title}
        </Button>
      </form>
    </VStack>
  );
};

export default Register;
