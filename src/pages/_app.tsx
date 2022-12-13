import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { type AppType } from "next/dist/shared/lib/utils";
import NextHead from "../components/NextHead";

import Layout from "../components/Layout";
import "../styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
          <NextHead />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThirdwebProvider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
