import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"

export default function WorkersList(){

  const navigate = useNavigate()

  const [workers,setWorkers] = useState([])
  const [editWorker,setEditWorker] = useState(null)

  useEffect(()=>{
    fetchWorkers()
  },[])

  const fetchWorkers = async ()=>{
    const res = await api.get("/workers")
    setWorkers(res.data)
  }

  const deleteWorker = async(id)=>{
    if(!window.confirm("Delete this worker?")) return

    await api.delete(`/workers/${id}`)
    fetchWorkers()
  }

  const updateWorker = async()=>{

    await api.put(`/workers/${editWorker.id}`,{
      name:editWorker.name,
      phone:editWorker.phone,
      hourly_rate:editWorker.hourly_rate
    })

    setEditWorker(null)
    fetchWorkers()

  }

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between mb-6">

        <h2 className="text-xl font-bold">
          Workers
        </h2>

        <div className="flex gap-3">

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={()=>navigate("/workers/list")}
          >
            List
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={()=>navigate("/workers/create")}
          >
            Create
          </button>

        </div>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b text-left">

            <th>Name</th>
            <th>Phone</th>
            <th>Rate</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {workers.map((worker)=>(

            <tr key={worker.id} className="border-b">

              <td>{worker.name}</td>
              <td>{worker.phone}</td>
              <td>{worker.hourly_rate}</td>

              <td className="space-x-3">

                <button
                  onClick={()=>setEditWorker(worker)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteWorker(worker.id)}
                  className="text-red-600"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {editWorker && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96 space-y-4">

            <h3 className="text-lg font-bold">Edit Worker</h3>

            <input
              className="border p-2 w-full"
              value={editWorker.name}
              onChange={(e)=>setEditWorker({...editWorker,name:e.target.value})}
            />

            <input
              className="border p-2 w-full"
              value={editWorker.phone}
              onChange={(e)=>setEditWorker({...editWorker,phone:e.target.value})}
            />

            <input
              className="border p-2 w-full"
              value={editWorker.hourly_rate}
              onChange={(e)=>setEditWorker({...editWorker,hourly_rate:e.target.value})}
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={()=>setEditWorker(null)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>

              <button
                onClick={updateWorker}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}