import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "@/styles/globals.css"
import App from "./App.tsx"
import { SidebarProvider } from "./context/SidebarContext.tsx"
import { ThemeProvider } from "./context/ThemeContext.tsx"
import { MembershipProvider } from "./hooks/useMembership.tsx"
import { Provider } from "./provider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>,
)
