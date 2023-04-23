import "@/assets/styles/globals.css";
import AuthProvider from "@/providers/auth/AuthProvider";
import { ComponentAuthFieldsType } from "@/providers/auth/auth-page.types";
import { store } from "@/store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({
  Component,
  pageProps,
}: AppProps & ComponentAuthFieldsType) {
  return (
    <Provider store={store}>
      <AuthProvider
        Component={{ isAdmin: Component.isAdmin, isUser: Component.isUser }}
      >
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
