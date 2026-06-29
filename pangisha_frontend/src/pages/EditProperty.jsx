import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { uploadImage } from "../utils/uploadImage";
import api from "../api/axios";// assuming you have axios instance

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "",
    location_name: "",
    contact_phone: "",
    latitude: "",
    longitude: "",
  });

  const [images, setImages] = useState([]);

  // LOAD PROPERTY
  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/properties/${id}`);
      const data = res.data;

      setForm({
        title: data.title || "",
        description: data.description || "",
        price: data.price || "",
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        property_type: data.property_type || "",
        location_name: data.location_name || "",
        contact_phone: data.contact_phone || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
      });

      setImages(data.images || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load property",
      });
    } finally {
      setLoading(false);
    }
  };

  // FORM CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // UPLOAD NEW IMAGE
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    try {
      setUploading(true);

      for (let file of files) {
        const url = await uploadImage(file);

        setImages((prev) => [
          ...prev,
          {
            image_url: url,
            is_cover: prev.length === 0,
          },
        ]);
      }
    } finally {
      setUploading(false);
    }
  };

  // REMOVE IMAGE
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);

    if (updated.length > 0 && !updated.some((i) => i.is_cover)) {
      updated[0].is_cover = true;
    }

    setImages(updated);
  };

  // SET COVER IMAGE
  const setCover = (index) => {
    setImages(
      images.map((img, i) => ({
        ...img,
        is_cover: i === index,
      }))
    );
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.patch(`/properties/${id}`, {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        images,
      });

      Swal.fire({
        icon: "success",
        title: "Property Updated!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.error,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.title) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-6">
        Edit Property
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          placeholder="Title"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          rows="4"
        />

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded"
            placeholder="Price"
          />

          <input
            name="location_name"
            value={form.location_name}
            onChange={handleChange}
            className="border p-3 rounded"
            placeholder="Location"
          />

          <input
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            className="border p-3 rounded"
          />

        </div>

        {/* TYPE */}
        <select
          name="property_type"
          value={form.property_type}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option>Apartment</option>
          <option>House</option>
          <option>Studio</option>
          <option>Villa</option>
        </select>

        {/* PHONE */}
        <input
          name="contact_phone"
          value={form.contact_phone}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        {/* IMAGES */}
        <div className="border p-4 rounded">

          <h2 className="font-semibold mb-3">
            Images
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />

          {uploading && (
            <p className="text-blue-600 mt-2">
              Uploading...
            </p>
          )}

          <div className="grid grid-cols-3 gap-3 mt-4">

            {images.map((img, index) => (
              <div key={index} className="relative">

                <img
                  src={img.image_url}
                  className="h-28 w-full object-cover rounded"
                />

                {img.is_cover && (
                  <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Cover
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>

                <button
                  type="button"
                  onClick={() => setCover(index)}
                  className="absolute bottom-1 left-1 bg-black text-white text-xs px-2 py-1 rounded"
                >
                  Set Cover
                </button>

              </div>
            ))}

          </div>

        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Updating..." : "Update Property"}
        </button>

      </form>

    </div>
  );
}