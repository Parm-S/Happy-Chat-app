import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { VStack, StackDivider, Button } from "@chakra-ui/react";
import InputRHF from "../common/InputRHF";

import { loginSchema } from "./schema";
import { userLoginObject } from "./constant";

import data from "../../data.json";

const Login = () => {
  const DEFAULT_VALUES = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  function onSubmit(values) {
    setIsLoading(true);
    console.log(values);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
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
        {userLoginObject.map((item) => (
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
        <Button
          mt={4}
          width={"100%"}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit">
          {data.login.title}
        </Button>
      </form>
      <Button
        width={"100%"}
        colorScheme="red"
        isLoading={isLoading}
        onClick={() =>
          onSubmit({ email: "guest@example.com", password: "123456" })
        }>
        {data.login.guestLoginbutton}
      </Button>
    </VStack>
  );
};

export default Login;
