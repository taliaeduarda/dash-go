import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <HStack>
        {!!label && (
          <FormLabel
            id={name}
            htmlFor={name}
            w="200px"
            fontSize="md"
            color="gray.600"
            fontWeight="normal"
            textAlign="end"
            mr={6}
          >
            {label}
          </FormLabel>
        )}

        <ChakraInput
          name={name}
          id={name}
          focusBorderColor="pink.500"
          borderColor="gray.150"
          bgColor="whiteAlpha.100"
          variant="filled"
          _hover={{
            bgColor: "whiteAlpha.100",
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
      </HStack>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
