import {
  Box,
  Flex,
  Button,
  Spacer,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

import { Header } from "../../components/Header";
import { ModalNewProduct } from "../../components/ModalNewProduct";
import { ProductsTable } from "../../components/Table";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { Pagination } from "../../components/Pagination";
import { useProducts } from "../../services/hooks/useProducts";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, error } = useProducts(page);

  async function handlePrefetchUser(productCode: number) {
    await queryClient.prefetchQuery(["product", productCode], async () => {
      const response = await api.get(`products/${productCode}`);

      return response.data;
    });
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto">
        <Flex borderRadius={8} px="8" fontSize="md" w="95%" mx="auto">
          <Button isDisabled>Todos os produtos</Button>
          <Spacer />
          <Button colorScheme="blackAlpha" onClick={onOpen}>
            <ModalNewProduct isOpen={isOpen} onClose={onClose} />
            Adicionar
          </Button>
        </Flex>
      </Flex>

      <Flex w="95%" my="6" mx="auto" px="6">
        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex justify="center">
            <Text>Falha ao obter dados dos usuários.</Text>
          </Flex>
        ) : (
          <Box flex="1" borderRadius={8} bg="white.100" p="8" fontSize="md">
            <ProductsTable products={data.products} />

            {/* <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            /> */}
          </Box>
        )}
      </Flex>
    </Box>
  );
}
