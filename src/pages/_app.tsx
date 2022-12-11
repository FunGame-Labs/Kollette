import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { type AppType } from "next/dist/shared/lib/utils";
import NextHead from "../components/NextHead";

import Layout from "../components/Layout";
import "../styles/globals.css";

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
