import { Route, Routes } from "react-router"
import "./style.css"

import ApthProvider from "./auth/Auth"
import AppLayout from "./layout/AppLayout"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route element={<ApthProvider />} path="/auth" />
      <Route element={<AppLayout />}>
        <Route element={<NotFound />} path="*" />
      </Route>
    </Routes>
  )
}
