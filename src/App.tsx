import { Navigate, Route, Routes } from "react-router-dom"

//@ts-ignore
import DashBoard from "./pages/neuraJournal/Dasboard.jsx"

import AppLayout from "./layouts/AppLayout"
import { navigationStrings } from "./navigationStrings/NavigationStrings"
import NotFound from "./pages/NotFound.js"
import Orders from "./pages/orders/Orders.js"
import Products from "./pages/products/Products.js"
import Subscriptions from "./pages/subscriptions/Subscriptions.js"
import ActiveCourses from "./pages/trainingAcademy/ActiveCourses.js"
import AllCourses from "./pages/trainingAcademy/AllCourses.js"
import Certificates from "./pages/trainingAcademy/Certificates.js"
import CompletedCourses from "./pages/trainingAcademy/CompletedCourses.js"
import Users from "./pages/users/Users.js"

function App() {
  return (
    <Routes>
      <Route />
      <Route element={<AppLayout />}>
        <Route element={<Navigate to={navigationStrings.askSolon} />} path="/" />
        <Route element={<DashBoard />} path={navigationStrings.main} />
        <Route element={<Users />} path={navigationStrings.adminUsers} />
        <Route element={<Subscriptions />} path={navigationStrings.adminSubscriptions} />
        <Route element={<Orders />} path={navigationStrings.adminOrders} />
        <Route element={<Products />} path={navigationStrings.adminProducts} />
        <Route element={<AllCourses />} path={navigationStrings.allCourses} />
        <Route element={<ActiveCourses />} path={navigationStrings.activeCourses} />
        <Route element={<CompletedCourses />} path={navigationStrings.completedCoursed} />
        <Route element={<Certificates />} path={navigationStrings.certificate} />
        <Route element={<NotFound />} path={"*"} />
      </Route>
    </Routes>
  )
}
export default App
