import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { ModalLoading } from "@components/shared/modal-overlay/ModalLoading";
import AppRoutes from "./routes";
import i18n from "./services/i18n";
import ChakraUiProvider from "./theme/ChakraUiProvider";
import AuthProvider from "./providers/AuthProvider";

// Redux imports for state management
import { Provider } from "react-redux"; // Provides Redux store to the app
import { store, persistor } from "./store/index"; // Redux store and persistor
import { PersistGate } from "redux-persist/integration/react"; // PersistGate for persisting Redux state
import ToastModal from "@components/shared/ToastModal";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ChakraUiProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <ModalLoading />
                <ToastModal />
                <Suspense fallback={<h2>Loading...</h2>}>
                  <RouterProvider router={AppRoutes} />
                </Suspense>
              </AuthProvider>
            </QueryClientProvider>
          </ChakraUiProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
