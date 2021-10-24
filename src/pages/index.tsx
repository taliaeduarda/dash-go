import { Flex, Button, Box, Stack, Image, FormLabel } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
      <Flex maxWidth={400} p="4">
        <Image
          src="images/james-logo.png"
          alt="JamesTip logo"
          objectFit="cover"
        />
      </Flex>
      <Flex
        as="form"
        width="100%"
        maxWidth={400}
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
        bgColor="white.100"
      >
        <Stack spacing="4">
          <FormLabel>E-mail</FormLabel>
          <Input
            name="email"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <FormLabel>Senha</FormLabel>

          <Input
            name="password"
            type="password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bgColor="teal.200"
          size="lg"
          color="white"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
