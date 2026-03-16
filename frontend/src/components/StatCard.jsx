export default function StatCard({title,value,icon}){

  return(

    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300 flex justify-between items-center">

      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>

      <div className="opacity-80">
        {icon}
      </div>

    </div>

  )
}