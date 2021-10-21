import { useEffect } from "react";
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
} from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { ModalNewProduct } from "../../components/ModalNewProduct";

export default function UserList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
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
        <Box flex="1" borderRadius={8} bg="white.100" p="8" fontSize="md">
          <Table colorScheme="whiteAlpha" variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="md">Nome</Th>
                <Th fontSize="md">Data de cadastro</Th>
                <Th fontSize="md">Fornecedor</Th>
                <Th fontSize="md">Qty. em estoque</Th>
                <Th fontSize="md">Código</Th>
                <Th fontSize="md">uniti price</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Box>
                    <Text>Talia Eduarda</Text>
                  </Box>
                </Td>
                <Td>04 de Abril, 2021</Td>
                <Td>Americanas</Td>
                <Td>12</Td>
                <Td>TF545</Td>
                <Td>R$34</Td>

                {/* <Td>
                  <Button
                    rightIcon={<FiEdit2 />}
                    colorScheme="teal"
                    variant="outline"
                  ></Button>
                </Td> */}
              </Tr>
              <Tr>
                <Td>
                  <Box>
                    <Text>Talia Eduarda</Text>
                  </Box>
                </Td>
                <Td>04 de Abril, 2021</Td>
                <Td>Americanas</Td>
                <Td>12</Td>
                <Td>TF545</Td>
                <Td>R$34</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
