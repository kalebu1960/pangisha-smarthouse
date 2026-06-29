import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { addFavorite } from "../api/favoriteApi";

const PLACEHOLDER =
  "https://placehold.co/600x400?text=No+Image";

export default function PropertyCard({ property }) {

  const coverImage =
    property.images?.find((img) => img.is_cover)?.image_url ||
    property.images?.[0]?.image_url ||
    PLACEHOLDER;

  const handleFavorite = async () => {

    try {

      await addFavorite(property.id);

      Swal.fire({
        icon: "success",
        title: "Added to Favorites",
        text: "Property saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Unable to add favorite.",
      });

    }

  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
    >

      <img
        src={coverImage}
        alt={property.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">

        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {property.property_type}
        </span>

        <h2 className="text-xl font-bold mt-3">
          {property.title}
        </h2>

        <p className="text-gray-500">
          📍 {property.location_name}
        </p>

        <p className="text-gray-500 mt-2">
          🛏 {property.bedrooms} Beds • 🚿 {property.bathrooms} Baths
        </p>

        <div className="flex justify-between items-center mt-4">

          <h3 className="text-blue-700 text-xl font-bold">
            KES {property.price}
          </h3>

          <div className="flex gap-2">

            <Link
              to={`/property/${property.id}`}
              className="bg-gray-900 text-white px-3 py-1 rounded"
            >
              View
            </Link>

            <button
              onClick={handleFavorite}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              ♥
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}