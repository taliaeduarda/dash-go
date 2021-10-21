import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { Input } from "../../components/Form/Input";

type CreateProductFormData = {
  name: string;
  price: number;
  stock: number;
  provider: string;
  category: string;
};

const createProductFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  price: yup.number().required("Informe um valor").positive(),
  stock: yup.number().required().positive().integer(),
  provider: yup.string().required("Campo obrigatório"),
  category: yup.string().required("Selecione uma categoria"),
});

interface CreateProductProps {
  onClose: () => void;
}

export default function CreateProduct({ onClose }: CreateProductProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createProductFormSchema),
  });

  const handleCreateProduct: SubmitHandler<CreateProductFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };
  return (
    <Flex w="100%" mx="auto" justify="flex-start">
      <Box
        as="form"
        flex="1"
        p={["6"]}
        onSubmit={handleSubmit(handleCreateProduct)}
      
      >
       
          <SimpleGrid   w="70%" mb='8'>
            <Input
              name="name"
              type="name"
              label="Nome do produto"
              error={errors.name}
              {...register("name")}
            />
           
            </SimpleGrid>
        
            <SimpleGrid  spacing={["8", "10"]} w="50%" >
            <Input
              name="price"
              type="number"
              label="Price"
              error={errors.price}
              {...register("price")}
            />
         
            <Input
              name="stock"
              type="number"
              label="Stock"
              error={errors.stock}
              {...register("stock")}
            />

            <Input
              name="provider"
              type="text"
              label="Fornecedor"
              error={errors.provider}
              {...register("provider")}
            />
         
            <Input
              name="category"
              type="text"
              label="Categoria"
              error={errors.category}
              {...register("category")}
            />
          </SimpleGrid>
      
        <Flex></Flex>
        <Flex mt="8" justify="flex-end">
          <Box>
            <Button variant="outline" mr="4" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              Salvar
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
