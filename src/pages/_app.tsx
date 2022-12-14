import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { type AppType } from "next/dist/shared/lib/utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Layout from "../components/Layout";
import NextHead from "../components/NextHead";
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
