import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  SimpleGrid,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import Products from '../../types/index'

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  product: Products[];
}

export function ModalInfo({ isOpen, onClose, product }: ModalInfoProps) {

  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={5} display="flex">
          {" "}
          <Heading
            as="h2"
            size="lg"
            isTruncated
            color="gray.400"
            fontWeight="normal"
          >

          </Heading>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody bgColor="gray.10" p={8}>
          <SimpleGrid
            columns={[2, null, 3]}
            w="70%"
            border="1px"
            borderColor="gray.50"
          >
            <Box
              bg="white"
              height="80px"
              p={4}
              borderRight="1px"
              color="gray.50"
            >
              <Text fontSize="md" color="gray.400">
                Handler

              </Text>
              <Text fontSize="md" color="blue">
                talia eduarda
              </Text>
            </Box>
            <Box bg="white" color="gray.400" height="80px" p={4}>
              Produto ativo
            </Box>
            <Box bg="white" color="gray.400" height="80px" p={4}>
              Código
            </Box>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
