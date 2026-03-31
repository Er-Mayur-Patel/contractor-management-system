import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./layouts/DashboardLayout"

import WorkersList from "./pages/Workers/WorkersList"
import CreateWorker from "./pages/Workers/CreateWorker"
import SitesList from "./pages/Sites/SitesList";
import CreateSite from "./pages/sites/CreateSite";
import EditSite from "./pages/sites/EditSite";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Workers Routes */}
        <Route path="/workers/list" element={<WorkersList />} />
        <Route path="/workers/create" element={<CreateWorker />} />

         {/* Sites */}
        <Route path="/sites" element={<SitesList />} />
        <Route path="/sites/create" element={<CreateSite />} />
        <Route path="/sites/edit/:id" element={<EditSite />} />

        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App