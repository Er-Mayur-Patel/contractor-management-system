import StatCard from "../components/StatCard"
import { Users, Building2, Wallet, Calendar } from "lucide-react"

export default function Dashboard(){

  return(

    <div className="p-6 space-y-8">

      <div className="grid grid-cols-4 gap-6">

        <StatCard 
          title="Total Workers" 
          value="120"
          icon={<Users size={40}/>}
        />

        <StatCard 
          title="Active Sites" 
          value="8"
          icon={<Building2 size={40}/>}
        />

        <StatCard 
          title="Today's Attendance" 
          value="94"
          icon={<Calendar size={40}/>}
        />

        <StatCard 
          title="Monthly Expenses" 
          value="$12,400"
          icon={<Wallet size={40}/>}
        />

      </div>
      <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-lg font-semibold mb-4">
                Recent Activities
            </h3>

            <ul className="space-y-3 text-gray-600">

                <li>✔ Worker Rahul checked in at Site A</li>
                <li>✔ Expense added for cement purchase</li>
                <li>✔ Worker payroll processed</li>
                <li>✔ New site created: Riverfront Project</li>

            </ul>

        </div>

    </div>


  )
}