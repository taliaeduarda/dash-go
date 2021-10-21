import { ChakraProvider } from "@chakra-ui/react";

import { theme } from '../styles/theme'
import { AppProps } from "next/app";
import { makeServer } from "../services/mirage";

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
