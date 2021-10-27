import { useState } from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from "../styles/theme";
import { AppProps } from "next/app";
import { makeServer } from "../services/mirage";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
