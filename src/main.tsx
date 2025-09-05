import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "@/styles/globals.css"
import App from "./App.tsx"
import { BrokerLoginStatusProvider } from "./context/Broker_Login_status_Fetch.tsx"
import DateAccountContextProvider from "./context/DateAccountContextProvider.tsx"
import { SidebarProvider } from "./context/SidebarContext.tsx"
import { ThemeProvider } from "./context/ThemeContext.tsx"
import { MembershipProvider } from "./hooks/useMembership.tsx"
import { Provider } from "./provider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DateAccountContextProvider>
        <BrokerLoginStatusProvider>
          <SidebarProvider>
            <ThemeProvider>
              <MembershipProvider>
                <Provider>
                  <div className="w-full h-auto dark:bg-background bg-backgroundLight relative">
                    <App />
                  </div>
                </Provider>
              </MembershipProvider>
            </ThemeProvider>
          </SidebarProvider>
        </BrokerLoginStatusProvider>
      </DateAccountContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
