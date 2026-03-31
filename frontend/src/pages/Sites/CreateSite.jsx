import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateSite() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    total_sqft: "",
  });

  const [files, setFiles] = useState({
    site_image: null,
    elevation_image: null,
    centerline_plan: null,
    other_plan: null,
  });

  const [preview, setPreview] = useState({
    site_image: null,
    elevation_image: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    setFiles({ ...files, [name]: file });

    // Show preview only for images
    if (file && (name === "site_image" || name === "elevation_image")) {
      setPreview({
        ...preview,
        [name]: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("location", form.location);
    fd.append("total_sqft", form.total_sqft);

    Object.keys(files).forEach((key) => {
      if (files[key]) fd.append(key, files[key]);
    });

    try {
      await axios.post("http://127.0.0.1:8000/sites/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Site created successfully!");
      navigate("/sites");

    } catch (error) {
      console.error(error);
      alert("Error creating site");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-5">Create New Site</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block font-medium">Site Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 mt-1 border rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="w-full p-2 mt-1 border rounded"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* Total Sqft */}
        <div>
          <label className="block font-medium">Total Sqft</label>
          <input
            type="number"
            name="total_sqft"
            className="w-full p-2 mt-1 border rounded"
            value={form.total_sqft}
            onChange={handleChange}
          />
        </div>

        {/* Site Image Upload */}
        <div>
          <label className="block font-medium">Site Image</label>
          <input type="file" name="site_image" onChange={handleFileChange} />

          {preview.site_image && (
            <img
              src={preview.site_image}
              className="h-40 mt-2 rounded shadow"
              alt="Site Preview"
            />
          )}
        </div>

        {/* Elevation Image Upload */}
        <div>
          <label className="block font-medium">Elevation Image</label>
          <input type="file" name="elevation_image" onChange={handleFileChange} />

          {preview.elevation_image && (
            <img
              src={preview.elevation_image}
              className="h-40 mt-2 rounded shadow"
              alt="Elevation Preview"
            />
          )}
        </div>

        {/* Centerline Plan */}
        <div>
          <label className="block font-medium">Centerline Plan (PDF/Image)</label>
          <input type="file" name="centerline_plan" onChange={handleFileChange} />
        </div>

        {/* Other Plan */}
        <div>
          <label className="block font-medium">Other Plan File</label>
          <input type="file" name="other_plan" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Create Site
        </button>
      </form>
    </div>
  );
}