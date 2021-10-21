import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Spacer,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { GrFormEdit } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { ModalNewProduct } from '../../components/ModalNewProduct'

export default function UserList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                <Th fontSize="md">Qty. em estoque</Th>
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
                <Td></Td>
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
                <Td></Td>
                <Td>R$34</Td>
              </Tr>
            </Tbody>
          </Table>

          {/* <Pagination /> */}
        </Box>
      </Flex>
    </Box>
  );
}
