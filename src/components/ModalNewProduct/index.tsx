import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Heading,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import CreateProduct from "../../pages/products/create";

interface ModalNewProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalNewProduct({ isOpen, onClose }: ModalNewProductProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {" "}
          <Heading as="h4" size="md" p={4} fontWeight="normal">
            Adicionar produto
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateProduct onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
