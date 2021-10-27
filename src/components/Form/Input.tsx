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
            fontSize="md"
            color="gray.600"
            fontWeight="normal"
            w='20%'
           
          >
            {label}
          </FormLabel>
        )}

        <ChakraInput
          name={name}
          id={name}
          size="lg"
          focusBorderColor="pink.500"
          borderColor="gray.150"
          bgColor="whiteAlpha.100"
          variant="filled"
          _hover={{
            bgColor: "whiteAlpha.100",
          }}
          w="80%"
          ref={ref}
          {...rest}
        />
      </HStack>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
