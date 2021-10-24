import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";

import { theme } from "../styles/theme";
import { AppProps } from "next/app";
import { makeServer } from "../services/mirage";
import { queryClient } from '../services/queryClient'

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
