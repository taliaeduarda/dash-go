import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { getProducts, useProducts } from "../../services/hooks/useProducts";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { Header } from "../../components/Header";
import { ModalNewProduct } from "../../components/ModalNewProduct";
import { ProductsTable } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { MdOutlineAdd } from 'react-icons/md'

export default function ProductList() {

  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, error } = useProducts(page)
  return (
    <Box>
      <Header />

      <Flex w="95%" my="4" mx="auto" px="6">

        <Box flex="1" borderRadius={8} bg="white.100" p="8" fontSize="md">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="md" fontWeight="normal">
              produtos

            </Heading>


            <Button leftIcon={<MdOutlineAdd />} colorScheme="blackAlpha" onClick={onOpen}>
              <ModalNewProduct isOpen={isOpen} onClose={onClose} />
              Adicionar
            </Button>

          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>

              <ProductsTable products={data.products} />

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

