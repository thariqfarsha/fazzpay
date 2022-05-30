import "../styles/globals.css";
import "../scss/customBootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
