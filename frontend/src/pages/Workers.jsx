import { useEffect, useState } from "react"
import api from "../api/api"

export default function Workers(){

  const [workers,setWorkers] = useState([])

  useEffect(()=>{

    fetchWorkers()

  },[])

  const fetchWorkers = async ()=>{

    const res = await api.get("/workers")
    setWorkers(res.data)

  }

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Workers
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th>Name</th>
            <th>Phone</th>
            <th>Hourly Rate</th>

          </tr>

        </thead>

        <tbody>

          {workers.map((worker)=>(
            <tr key={worker.id} className="border-b">

              <td>{worker.name}</td>
              <td>{worker.phone}</td>
              <td>{worker.hourly_rate}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )
}