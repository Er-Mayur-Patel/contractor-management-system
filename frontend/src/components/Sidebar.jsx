import { LayoutDashboard, Users, Building2, Calendar, Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Sidebar() {

  const navigate = useNavigate()
  const [workersOpen,setWorkersOpen] = useState(false)

  return (

    <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">ContractorPro</h1>

      <nav className="space-y-4">

        {/* Dashboard */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer hover:text-indigo-300"
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </div>

        {/* Workers */}
        <div>

          <div
            onClick={() => setWorkersOpen(!workersOpen)}
            className="flex items-center gap-3 cursor-pointer hover:text-indigo-300"
          >
            <Users size={20}/>
            Workers
          </div>

          {workersOpen && (

            <div className="ml-8 mt-2 space-y-2 text-sm">

              <div
                onClick={() => navigate("/workers/list")}
                className="cursor-pointer hover:text-indigo-300"
              >
                Workers List
              </div>

              <div
                onClick={() => navigate("/workers/create")}
                className="cursor-pointer hover:text-indigo-300"
              >
                Create Worker
              </div>

            </div>

          )}

        </div>

        {/* Sites */}
        <div
          onClick={() => navigate("/sites")}
          className="flex items-center gap-3 cursor-pointer hover:text-indigo-300"
        >
          <Building2 size={20}/>
          Sites
        </div>

        {/* Attendance */}
        <div
          onClick={() => navigate("/attendance")}
          className="flex items-center gap-3 cursor-pointer hover:text-indigo-300"
        >
          <Calendar size={20}/>
          Attendance
        </div>

        {/* Expenses */}
        <div
          onClick={() => navigate("/expenses")}
          className="flex items-center gap-3 cursor-pointer hover:text-indigo-300"
        >
          <Wallet size={20}/>
          Expenses
        </div>

      </nav>

    </div>
  )
}