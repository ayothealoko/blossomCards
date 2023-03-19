import type { AppProps } from "next/app";

import "../App.scss";
import Layout from "../components/layout";

import { store } from "../store/store";
import { Provider } from "react-redux";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
