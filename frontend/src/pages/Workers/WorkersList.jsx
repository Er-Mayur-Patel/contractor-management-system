import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"
import toast from "react-hot-toast"
import { Pencil, Trash2 } from "lucide-react"

export default function WorkersList(){

  const navigate = useNavigate()

  const [workers,setWorkers] = useState([])
  const [editWorker,setEditWorker] = useState(null)
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(false)

  const [currentPage,setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(()=>{
    fetchWorkers()
  },[])

  const fetchWorkers = async ()=>{
    setLoading(true)
    try{
      const res = await api.get("/workers")
      setWorkers(res.data)
    }catch{
      toast.error("Failed to fetch workers")
    }
    setLoading(false)
  }

  const deleteWorker = async(id)=>{
    if(!window.confirm("Delete this worker?")) return

    try{
      await api.delete(`/workers/${id}`)
      toast.success("Worker deleted")
      fetchWorkers()
    }catch{
      toast.error("Delete failed")
    }
  }

  const updateWorker = async()=>{
    try{
      await api.put(`/workers/${editWorker.id}`,editWorker)
      toast.success("Worker updated")
      setEditWorker(null)
      fetchWorkers()
    }catch{
      toast.error("Update failed")
    }
  }

  // 🔍 Filter
  const filteredWorkers = workers.filter((w)=>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.phone.includes(search)
  )

  // 📄 Pagination
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentWorkers = filteredWorkers.slice(indexOfFirst,indexOfLast)

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage)

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">Workers</h2>

        <button
          onClick={()=>navigate("/workers/create")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Create Worker
        </button>

      </div>

      {/* Search */}
      <input
        placeholder="Search workers..."
        className="border p-2 rounded w-64 mb-4 focus:ring-2 focus:ring-indigo-400"
        onChange={(e)=>setSearch(e.target.value)}
      />

      {/* Loading */}
      {loading && (
        <div className="text-center py-6 text-gray-500">
          Loading...
        </div>
      )}

      {/* Empty State */}
      {!loading && currentWorkers.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No workers found 😕
        </div>
      )}

      {/* Table */}
      {!loading && currentWorkers.length > 0 && (

        <table className="w-full">

          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Rate</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {currentWorkers.map((worker)=>(

              <tr key={worker.id} className="hover:bg-gray-50">

                <td className="p-3 font-medium">{worker.name}</td>
                <td className="p-3">{worker.phone}</td>
                <td className="p-3 text-indigo-600">₹ {worker.hourly_rate}</td>

                <td className="p-3 flex gap-3">

                  <button
                    onClick={()=>setEditWorker(worker)}
                    className="text-blue-600 hover:scale-110 transition"
                  >
                    <Pencil size={18}/>
                  </button>

                  <button
                    onClick={()=>deleteWorker(worker.id)}
                    className="text-red-600 hover:scale-110 transition"
                  >
                    <Trash2 size={18}/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">

        {[...Array(totalPages)].map((_,i)=>(
          <button
            key={i}
            onClick={()=>setCurrentPage(i+1)}
            className={`px-3 py-1 rounded ${
              currentPage === i+1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i+1}
          </button>
        ))}

      </div>

      {/* Edit Modal */}
      {editWorker && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96 space-y-4">

            <h3 className="font-bold text-lg">Edit Worker</h3>

            <input
              className="border p-2 w-full rounded"
              value={editWorker.name}
              onChange={(e)=>setEditWorker({...editWorker,name:e.target.value})}
            />

            <input
              className="border p-2 w-full rounded"
              value={editWorker.phone}
              onChange={(e)=>setEditWorker({...editWorker,phone:e.target.value})}
            />

            <input
              className="border p-2 w-full rounded"
              value={editWorker.hourly_rate}
              onChange={(e)=>setEditWorker({...editWorker,hourly_rate:e.target.value})}
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={()=>setEditWorker(null)}
                className="border px-4 py-2 rounded"
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