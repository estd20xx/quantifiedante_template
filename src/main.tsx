import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import { PersistGate } from "redux-persist/integration/react"

import App from "./App"
import { AppWrapper } from "./components/common/PageMeta"
import { ThemeProvider } from "./context/ThemeContext"
import "./index.css"
import store, { persistor } from "./store/store"
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/predictive-application">
      <AppWrapper>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <div className="w-full h-auto dark:bg-background bg-backgroundLight relative">
                  <App />
                </div>
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </AppWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
