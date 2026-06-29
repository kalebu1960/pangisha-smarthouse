import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getFavorites,
  removeFavorite,
} from "../api/favoriteApi";

const PLACEHOLDER =
  "https://placehold.co/600x400?text=No+Image";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load your favorites.",
      });
    }
  };

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Remove Favorite?",
      text: "This property will be removed from your favorites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Remove",
    });

    if (!result.isConfirmed) return;

    await removeFavorite(id);

    setFavorites((prev) =>
      prev.filter((fav) => fav.id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Removed Successfully",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <h1 className="text-4xl font-bold text-gray-800">
            My Favorites
          </h1>

          <p className="text-gray-500 mt-2">
            All the homes you've saved in one place.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Saved Homes</p>
            <h2 className="text-4xl font-bold mt-2">
              {favorites.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Available</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {
                favorites.filter(
                  (f) => f.property.is_available
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Unavailable</p>
            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {
                favorites.filter(
                  (f) => !f.property.is_available
                ).length
              }
            </h2>
          </div>

        </div>

        {/* EMPTY STATE */}

        {favorites.length === 0 ? (

          <div className="bg-white rounded-3xl shadow text-center py-24">

            <div className="text-7xl">
              ❤️
            </div>

            <h2 className="text-3xl font-bold mt-6">
              No Favorites Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Save properties you like and they'll appear here.
            </p>

            <Link
              to="/properties"
              className="inline-block mt-8 bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl"
            >
              Browse Properties
            </Link>

          </div>

        ) : (

          <div className="space-y-8">

            {favorites.map((fav) => {

              const property = fav.property;

              const image =
                property.images?.[0]?.image_url ||
                PLACEHOLDER;

              return (

                <div
                  key={fav.id}
                  className="bg-white rounded-3xl shadow hover:shadow-lg transition overflow-hidden"
                >

                  <div className="grid lg:grid-cols-3">

                    {/* IMAGE */}

                    <img
                      src={image}
                      alt={property.title}
                      className="h-full w-full object-cover lg:h-72"
                    />

                    {/* DETAILS */}

                    <div className="lg:col-span-2 p-8 flex flex-col justify-between">

                      <div>

                        <div className="flex justify-between items-start">

                          <div>

                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {property.property_type}
                            </span>

                            <h2 className="text-3xl font-bold mt-4">
                              {property.title}
                            </h2>

                            <p className="text-gray-500 mt-2">
                              📍 {property.location_name}
                            </p>

                          </div>

                          <div>

                            {property.is_available ? (

                              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                                Available
                              </span>

                            ) : (

                              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium">
                                Unavailable
                              </span>

                            )}

                          </div>

                        </div>

                        <div className="flex gap-8 mt-8 text-gray-700">

                          <span>
                            🛏 {property.bedrooms} Bedrooms
                          </span>

                          <span>
                            🚿 {property.bathrooms} Bathrooms
                          </span>

                        </div>

                      </div>

                      <div className="flex justify-between items-end mt-10">

                        <div>

                          <p className="text-gray-500">
                            Monthly Rent
                          </p>

                          <h2 className="text-4xl font-bold text-gray-900">
                            KES {property.price.toLocaleString()}
                          </h2>

                        </div>

                        <div className="flex gap-4">

                          <Link
                            to={`/property/${property.id}`}
                            className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white"
                          >
                            View Property
                          </Link>

                          <button
                            onClick={() => handleRemove(fav.id)}
                            className="px-6 py-3 rounded-xl border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}