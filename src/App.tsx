import { HeroUIProvider, ToastProvider } from "@heroui/react"
import { Route, Routes } from "react-router"
import "./style.css"

import ApthProvider from "./auth/Auth"
import { MembershipProvider } from "./hooks/membership"
import AppLayout from "./layout/AppLayout"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <MembershipProvider>
        <Routes>
          <Route element={<ApthProvider />} path="/auth" />
          <Route element={<AppLayout />}>
            <Route element={<NotFound />} path="*" />
          </Route>
        </Routes>
      </MembershipProvider>
    </HeroUIProvider>
  )
}
