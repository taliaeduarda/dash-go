import {
  Box,
  Flex,
  Button,
  Table,
  Spacer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

import { Header } from "../../components/Header";
import { ModalNewProduct } from "../../components/ModalNewProduct";
import { Pagination } from "../../components/Pagination";
import { useProducts } from "../../services/hooks/useProducts";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, error } = useProducts(page);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto">
        <Flex borderRadius={8} px="8" fontSize="md" w="95%" mx="auto">
          <Button colorScheme="blackAlpha">Button</Button>
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
            <Table colorScheme="whiteAlpha" variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="md" w="15%">
                    Nome
                  </Th>
                  <Th fontSize="md" w="15%">
                    Categoria
                  </Th>
                  <Th fontSize="md" w="15%">
                    Fornecedor
                  </Th>
                  <Th fontSize="md" w="15%">
                    Qty. em estoque
                  </Th>
                  <Th fontSize="md" w="15%">
                    Código
                  </Th>
                  <Th fontSize="md" w="15%">
                    uniti price
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.products.map((product) => {
                  return (
                    <Tr key={product.code}>
                      <Td>{product.name}</Td>
                      <Td>{product.category}</Td>
                      <Td>{product.provider}</Td>
                      <Td>{product.amount}</Td>
                      <Td>{product.code}</Td>
                      <Td>{product.price}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
