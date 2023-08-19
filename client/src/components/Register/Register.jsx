import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { VStack, StackDivider, Button, useToast } from "@chakra-ui/react";

import InputRHF from "../common/InputRHF";
import FileInputRHF from "../common/FileInputRHF";

import { registerSchema } from "./schema";
import { userRegisterObject } from "./constant";

import data from "../../data.json";
import { registerUser } from "../../api";

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

  const toast = useToast();

  const saveUser = React.useCallback(
    (payload) => {
      registerUser(data)
        .then((res) => {
          console.log(res);
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Unable to save the detail of user.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        });
    },
    [toast]
  );

  function onSubmit(values) {
    console.log(values);
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth.toISOString(),
    };
    console.log(values.pic.type);
    if (values.pic) {
      if (
        values.pic.type === "image/jpeg" ||
        values.pic.type === "image/png" ||
        values.pic.type === "image/jpg"
      ) {
        const data = new FormData();
        data.append("file", values.pic);
        data.append("upload_preset", "happy-chat-app");
        data.append("cloud_name", "dsv1jmss1");
        fetch("https://api.cloudinary.com/v1_1/dsv1jmss1/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((item) => (payload["pic"] = item.url.toString()))
          .catch((err) => console.log(err));
      } else {
        toast({
          title: "Select an Image",
          description: "Image must be .jpeg,.jpg or .png",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
    }
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
