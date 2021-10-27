import { Box, Button, Flex, Select, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";

import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";

enum CategoryEnum {
  eletronic = "eletronic",
  other = "other"
}

type CreateProductFormData = {
  name: string;
  provider: string;
  code: number;
  category: CategoryEnum;
  price: string;
  amount: number;
};

const createProductFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  code: yup.number().required().positive().integer(),
  price: yup.string().required("Informe um valor"),
  amount: yup.number().required().positive().integer(),
  provider: yup.string().required("Campo obrigatório"),
  category: yup.string().required("Selecione uma categoria"),
});

interface CreateProductProps {
  onClose: () => void;
}

export default function CreateProduct({ onClose }: CreateProductProps) {

  const createProduct = useMutation(
    async (product: CreateProductFormData) => {
      const response = await api.post("products", {
        product: {
          ...product,
          created_at: new Date(),
        },
      });

      return response.data.product;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

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
    console.log(values)
    await createProduct.mutateAsync(values);

    onClose();
  };

  return (
    <Flex w="100%" mx="auto">
      <Box
        borderTopColor="gray.150"
        borderTopWidth='1px'
        as="form"
        flex="1"
        p={4}
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <VStack spacing="5">
          <SimpleGrid minChildWidth="240px" spacing={12} w="100%" mt={6}>
            <Input
              name="name"
              type="string"
              label="Nome do produto"
              error={errors.name}
              {...register("name")}
            />
            <Box>
              Proprietário da conta
            </Box>

          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={12} w="100%">


            <Input
              name="code"
              type="number"
              label="Código"
              error={errors.code}
              {...register("code")}


            />

            <Input
              name="price"
              type="string"
              label="Price"
              error={errors.price}
              {...register("price")}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={12} w="100%">
            <Input
              name="provider"
              type="text"
              label="Fornecedor"
              error={errors.provider}
              {...register("provider")}
            />
            <Input
              name="amount"
              type="number"
              label="Quantidade"
              error={errors.amount}
              {...register("amount")}
            />
          </SimpleGrid>


          <SimpleGrid minChildWidth="240px" spacing={12} w="100%">
            <Select placeholder="Select option" {...register("category")}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>

          </SimpleGrid>
        </VStack>
        <Flex></Flex>
        <Flex mt="8" justify="flex-end">
          <Box>
            <Button variant="outline" mr="4" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blackAlpha" isLoading={isSubmitting}>
              Salvar
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
