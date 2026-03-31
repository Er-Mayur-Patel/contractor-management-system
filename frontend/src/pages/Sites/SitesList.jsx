import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSites, deleteSite } from "../../api/sites";

export default function SitesList() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    const res = await getSites();
    setSites(res.data);
  };

  const removeSite = async (id) => {
    if (!window.confirm("Delete this site?")) return;
    await deleteSite(id);
    fetchSites();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">All Sites</h1>

        <button
          onClick={() => navigate("/sites/create")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:8000/${site.site_image}`}
              alt=""
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">{site.name}</h2>
            <p className="text-gray-600">{site.location}</p>
            <p className="mt-2 font-medium">Total Sqft: {site.total_sqft}</p>

            <div className="flex justify-between mt-4">
              <button
                className="text-blue-600"
                onClick={() => navigate(`/sites/edit/${site.id}`)}
              >
                Edit
              </button>

              <button
                className="text-red-600"
                onClick={() => removeSite(site.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}