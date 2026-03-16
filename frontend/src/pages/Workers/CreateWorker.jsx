import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"

export default function CreateWorker(){

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [rate,setRate] = useState("")

  const createWorker = async(e)=>{

    e.preventDefault()

    await api.post("/workers",{
      name:name,
      phone:phone,
      hourly_rate:parseFloat(rate)
    })

    navigate("/workers/list")

  }

  return(

    <div className="bg-white p-6 rounded-xl shadow max-w-lg">

      <div className="flex justify-between mb-6">

        <h2 className="text-xl font-bold">
          Create Worker
        </h2>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={()=>navigate("/workers/list")}
        >
          Back
        </button>

      </div>

      <form
        onSubmit={createWorker}
        className="space-y-4"
      >

        <input
          placeholder="Worker Name"
          className="border p-2 w-full"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full"
          onChange={(e)=>setPhone(e.target.value)}
        />

        <input
          placeholder="Hourly Rate"
          className="border p-2 w-full"
          onChange={(e)=>setRate(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create Worker
        </button>

      </form>

    </div>

  )

}