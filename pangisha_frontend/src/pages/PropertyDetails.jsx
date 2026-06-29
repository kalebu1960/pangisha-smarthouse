import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { fetchProperty } from "../api/propertiesApi";

const PLACEHOLDER =
  "https://placehold.co/1000x700?text=No+Image";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);

      const data = await fetchProperty(id);
      setProperty(data);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading property...
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-600">
          Property not found.
        </h2>
      </div>
    );
  }

  const images =
    property.images?.length > 0
      ? property.images
      : [{ image_url: PLACEHOLDER }];

  return (
    <div className="bg-gray-50 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="mb-8">

          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            {property.property_type}
          </span>

          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            {property.title}
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            📍 {property.location_name}
          </p>

        </div>

        {/* Hero Image */}

        <img
          src={images[0].image_url}
          alt={property.title}
          className="w-full h-[520px] object-cover rounded-2xl shadow-lg"
        />

        {/* Gallery */}

        {images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

            {images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img.image_url}
                alt=""
                className="h-40 w-full rounded-xl object-cover shadow hover:scale-105 transition"
              />
            ))}

          </div>
        )}

        {/* Main Section */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* LEFT */}

          <div className="lg:col-span-2">

            {/* Property Info */}

            <div className="bg-white rounded-2xl shadow p-8">

              <h2 className="text-3xl font-bold text-blue-700">
                KES {Number(property.price).toLocaleString()}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

                <div className="bg-gray-100 rounded-xl p-5 text-center">
                  <p className="text-3xl">🛏</p>

                  <h3 className="font-bold mt-2">
                    {property.bedrooms}
                  </h3>

                  <p className="text-gray-500">
                    Bedrooms
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-5 text-center">
                  <p className="text-3xl">🚿</p>

                  <h3 className="font-bold mt-2">
                    {property.bathrooms}
                  </h3>

                  <p className="text-gray-500">
                    Bathrooms
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-5 text-center">
                  <p className="text-3xl">🏠</p>

                  <h3 className="font-bold mt-2">
                    {property.property_type}
                  </h3>

                  <p className="text-gray-500">
                    Property Type
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-5 text-center">
                  <p className="text-3xl">📍</p>

                  <h3 className="font-bold mt-2">
                    {property.location_name}
                  </h3>

                  <p className="text-gray-500">
                    Location
                  </p>
                </div>

              </div>

            </div>

            {/* Description */}

            <div className="bg-white rounded-2xl shadow p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5">
                Property Description
              </h2>

              <p className="text-gray-700 leading-8">
                {property.description}
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Contact Landlord
              </h2>

              <div className="space-y-4">

                <div className="border rounded-xl p-4">

                  <p className="text-gray-500">
                    Phone Number
                  </p>

                  <h3 className="font-bold text-lg mt-1">
                    {property.contact_phone}
                  </h3>

                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Call Landlord
                </button>

                <button
                  className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition"
                >
                  Send Inquiry
                </button>

              </div>

              <hr className="my-6" />

              <div className="space-y-3 text-gray-600">

                <p>✅ Verified Listing</p>

                <p>⚡ Quick Response</p>

                <p>🏠 Direct from Landlord</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}