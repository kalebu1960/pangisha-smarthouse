// AddProperty.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/uploadImage";
import { createProperty } from "../api/propertiesApi";

export default function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "Apartment",
    location_name: "",
    contact_phone: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      setUploading(true);
      for (const file of files) {
        const url = await uploadImage(file);
        setImages((prev) => [
          ...prev,
          { image_url: url, is_cover: prev.length === 0 },
        ]);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Upload Failed", text: err.message });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length && !updated.some((i) => i.is_cover)) updated[0].is_cover = true;
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) {
      return Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please upload at least one image.",
      });
    }

    try {
      setLoading(true);
      await createProperty({
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        images,
      });

      Swal.fire({
        icon: "success",
        title: "Property Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.error || "Could not create property.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Add New Property</h1>
          <p className="text-gray-500 mt-2">
            Fill in the details below to list a new property.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-5">Basic Information</h2>
              <div className="space-y-4">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Property Title" className="w-full border rounded-lg p-3"/>
                <textarea name="description" value={form.description} onChange={handleChange} rows="6" placeholder="Property Description..." className="w-full border rounded-lg p-3"/>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-5">Property Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price (KES)" className="border rounded-lg p-3"/>
                <input name="location_name" value={form.location_name} onChange={handleChange} placeholder="Location" className="border rounded-lg p-3"/>
                <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="border rounded-lg p-3"/>
                <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="border rounded-lg p-3"/>
                <select name="property_type" value={form.property_type} onChange={handleChange} className="border rounded-lg p-3">
                  <option>Apartment</option><option>House</option><option>Studio</option><option>Villa</option>
                </select>
                <input name="contact_phone" value={form.contact_phone} onChange={handleChange} placeholder="Contact Number" className="border rounded-lg p-3"/>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-5">Property Images</h2>
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-gray-50">
                <span className="text-5xl mb-2">📷</span>
                <p className="font-medium">Click to Upload Images</p>
                <p className="text-sm text-gray-500">JPG, PNG supported</p>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden"/>
              </label>
              {uploading && <div className="mt-4 text-blue-600">Uploading images...</div>}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {images.map((img,index)=>(
                  <div key={index} className="relative rounded-xl overflow-hidden border">
                    <img src={img.image_url} alt="" className="h-32 w-full object-cover"/>
                    {img.is_cover && <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Cover</span>}
                    <button type="button" onClick={()=>removeImage(index)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <button disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition">
              {loading ? "Saving Property..." : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
