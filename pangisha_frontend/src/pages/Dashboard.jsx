import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  fetchMyProperties,
  deleteProperty,
} from "../api/propertiesApi";

const PLACEHOLDER =
  "https://placehold.co/600x400?text=No+Image";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);

      const data = await fetchMyProperties();

      setProperties(data);

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Property?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProperty(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1200,
        showConfirmButton: false,
      });

      loadProperties();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            My Properties
          </h1>

          <p className="text-gray-500">
            Manage your listings
          </p>

        </div>

        <Link
          to="/add-property"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          + Add Property
        </Link>

      </div>

      {properties.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          You haven't listed any properties yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {properties.map((property) => {

            const image =
              property.images?.find(
                (img) => img.is_cover
              )?.image_url ||
              property.images?.[0]?.image_url ||
              PLACEHOLDER;

            return (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                <img
                  src={image}
                  className="h-56 w-full object-cover"
                  alt={property.title}
                />

                <div className="p-4">

                  <h2 className="font-bold text-xl">
                    {property.title}
                  </h2>

                  <p className="text-gray-500">
                    {property.location_name}
                  </p>

                  <p className="font-bold text-blue-700 mt-3">
                    KES {property.price}
                  </p>

                  <p className="mt-2">
                    👁 {property.views} Views
                  </p>

                  <div className="flex gap-2 mt-5">

                    <Link
                      to={`/edit-property/${property.id}`}
                      className="flex-1 bg-yellow-500 text-white text-center py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(property.id)
                      }
                      className="flex-1 bg-red-600 text-white py-2 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            );

          })}

        </div>
      )}

    </div>
  );
}