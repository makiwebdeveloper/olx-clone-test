import "@/assets/styles/globals.css";
import AuthProvider from "@/providers/auth/AuthProvider";
import { ComponentAuthFieldsType } from "@/providers/auth/auth-page.types";
import { store } from "@/store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({
  Component,
  pageProps,
}: AppProps & ComponentAuthFieldsType) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider
          Component={{ isAdmin: Component.isAdmin, isUser: Component.isUser }}
        >
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
