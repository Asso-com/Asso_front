import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import AppRoutes from "./routes";
import i18n from "./services/i18n";
import ChakraUiProvider from "./theme/ChakraUiProvider";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraUiProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Suspense fallback={<h2>Loading...</h2>}>
              <RouterProvider router={AppRoutes} />
            </Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </ChakraUiProvider>
    </I18nextProvider>
  );
};

export default App;
