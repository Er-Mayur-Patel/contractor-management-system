import { useState } from "react"
import api from "../api/api"

export default function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async () => {

    const res = await api.post("/login",{
      email,
      password
    })

    localStorage.setItem("token",res.data.access_token)

    window.location.href="/dashboard"
  }

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Contractor Login
        </h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-indigo-600 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  )
}