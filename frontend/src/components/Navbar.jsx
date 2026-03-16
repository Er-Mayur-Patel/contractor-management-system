export default function Navbar(){

  return (

    <div className="h-16 bg-white shadow flex items-center justify-between px-6">

      <h2 className="text-lg font-semibold">
        Contractor Management
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">
          Admin
        </span>

        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>

      </div>

    </div>

  )

}