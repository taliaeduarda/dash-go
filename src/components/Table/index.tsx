import {
  Table,
  Spacer,
  Thead,
  Tr,
  Th,
  Tbody,
  Link,
  Td,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from 'react'
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { ModalInfo } from "../ModalInfo";
import Products from '../../types/index'
interface ProductsTableProps {
  products: Products[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [productSelected, setProductSelected] = useState<Products[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function handlePrefetchUser(productId: string) {

    await queryClient.prefetchQuery(["product", productId], async () => {
      const response = await api.get(`products/${productId}`);
      setProductSelected(response.data)
      onOpen()
    });
  }

  return (
    <>
      <ModalInfo isOpen={isOpen} onClose={onClose} product={productSelected} />
      <Table colorScheme="whiteAlpha" variant="simple">
        <Thead>
          <Tr>
            <Th fontSize="md" w="10%">
              Nome
            </Th>
            <Th fontSize="md" w="10%">
              Categoria
            </Th>
            <Th fontSize="md" w="10%">
              Fornecedor
            </Th>
            <Th fontSize="md" w="10%">
              Qty. em estoque
            </Th>
            <Th fontSize="md" w="10%">
              Código
            </Th>
            <Th fontSize="md" w="10%">
              uniti price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => {
            return (
              <Link
                key={product.code}
                as="tr"
                // onMouseEnter={() => handlePrefetchUser(product.code)}
                onClick={() => handlePrefetchUser(product.id)}
                textDecoration="none"
                _hover={{
                  bgColor: "gray.50",
                }}
              >
                <Td>{product.name}</Td>
                <Td>{product.category}</Td>
                <Td>{product.provider}</Td>
                <Td>{product.amount}</Td>
                <Td>{product.code}</Td>
                <Td>{product.price}</Td>
              </Link>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
