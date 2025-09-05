import { Route, Routes } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"
import NotFound from "./pages/NotFound.js"
function App() {
  return (
    <Routes>
      <Route />
      <Route element={<AppLayout />}>
        <Route element={<NotFound />} path={"*"} />
      </Route>
    </Routes>
  )
}
export default App
