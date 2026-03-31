import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSite, updateSite } from "../../api/sites";

export default function EditSite() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [site, setSite] = useState(null);

  useEffect(() => {
    loadSite();
  }, []);

  const loadSite = async () => {
    const res = await getSite(id);
    setSite(res.data);
  };

  const handleFileChange = (field, file) => {
    setSite({ ...site, [field]: file });
  };

  const update = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", site.name);
    fd.append("location", site.location || "");
    fd.append("total_sqft", site.total_sqft || "");

    if (site.site_image instanceof File)
      fd.append("site_image", site.site_image);

    if (site.elevation_image instanceof File)
      fd.append("elevation_image", site.elevation_image);

    if (site.centerline_plan instanceof File)
      fd.append("centerline_plan", site.centerline_plan);

    if (site.other_plan instanceof File)
      fd.append("other_plan", site.other_plan);

    await updateSite(id, fd);
    navigate("/sites");
  };

  if (!site) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 shadow rounded-xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Site</h2>

      <form onSubmit={update} className="space-y-5">

        {/* NAME */}
        <div>
          <label className="font-semibold">Site Name</label>
          <input
            className="border p-2 w-full"
            value={site.name}
            onChange={(e) => setSite({ ...site, name: e.target.value })}
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="font-semibold">Location</label>
          <input
            className="border p-2 w-full"
            value={site.location}
            onChange={(e) => setSite({ ...site, location: e.target.value })}
          />
        </div>

        {/* SQFT */}
        <div>
          <label className="font-semibold">Total Sqft</label>
          <input
            className="border p-2 w-full"
            type="number"
            value={site.total_sqft}
            onChange={(e) =>
              setSite({ ...site, total_sqft: e.target.value })
            }
          />
        </div>

        {/* SITE IMAGE */}
        <div>
          <label className="font-semibold">Site Image</label>
          <input
            type="file"
            onChange={(e) => handleFileChange("site_image", e.target.files[0])}
            className="border p-2 w-full"
          />
          {site.site_image && !(site.site_image instanceof File) && (
            <img
              src={`http://localhost:8000/${site.site_image}`}
              className="h-32 mt-2 rounded"
              alt="Site"
            />
          )}
        </div>

        {/* ELEVATION IMAGE */}
        <div>
          <label className="font-semibold">Elevation Image</label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange("elevation_image", e.target.files[0])
            }
            className="border p-2 w-full"
          />
          {site.elevation_image && !(site.elevation_image instanceof File) && (
            <img
              src={`http://localhost:8000/${site.elevation_image}`}
              className="h-32 mt-2 rounded"
              alt="Elevation"
            />
          )}
        </div>

        {/* CENTERLINE PLAN */}
        <div>
          <label className="font-semibold">Centerline Plan</label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange("centerline_plan", e.target.files[0])
            }
            className="border p-2 w-full"
          />
          {site.centerline_plan &&
            !(site.centerline_plan instanceof File) && (
              <img
                src={`http://localhost:8000/${site.centerline_plan}`}
                className="h-32 mt-2 rounded"
                alt="Centerline Plan"
              />
            )}
        </div>

        {/* OTHER PLAN */}
        <div>
          <label className="font-semibold">Other Plan</label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange("other_plan", e.target.files[0])
            }
            className="border p-2 w-full"
          />
          {site.other_plan && !(site.other_plan instanceof File) && (
            <img
              src={`http://localhost:8000/${site.other_plan}`}
              className="h-32 mt-2 rounded"
              alt="Other Plan"
            />
          )}
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update Site
        </button>
      </form>
    </div>
  );
}