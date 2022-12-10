import { type AppType } from "next/dist/shared/lib/utils";
import NextHead from "../components/NextHead";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import "../styles/globals.css";
import Layout from "../components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThirdwebProvider desiredChainId={ChainId.OptimismGoerli}>
        <NextHead />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </>
  );
};

export default MyApp;
