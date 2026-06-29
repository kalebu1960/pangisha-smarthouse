import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import PropertyCard from "../components/PropertyCard";
import { fetchProperties } from "../api/propertiesApi";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const loadProperties = async () => {
    try {
      setLoading(true);

      const data = await fetchProperties({
        page,
        location,
        bedrooms,
        max_price: maxPrice,
      });

      setProperties(data.results || []);
      setPages(data.pages || 1);

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

  useEffect(() => {
    loadProperties();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    loadProperties();
  };

  const clearFilters = () => {
    setLocation("");
    setBedrooms("");
    setMaxPrice("");
    setPage(1);

    setTimeout(() => {
      loadProperties();
    }, 0);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">

        <div className="h-12 w-72 bg-gray-200 rounded animate-pulse mb-8"></div>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>

      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Browse Properties
          </h1>

          <p className="text-gray-600 mt-2">
            Find apartments, studios and homes that match your lifestyle.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        {/* FILTER CARD */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

          <h2 className="text-xl font-semibold mb-6">
            Search Filters
          </h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Nairobi"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bedrooms
              </label>

              <select
                value={bedrooms}
                onChange={(e) =>
                  setBedrooms(e.target.value)
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Maximum Price (KES)
              </label>

              <input
                type="number"
                placeholder="e.g. 50000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex items-end gap-3">

              <button
                onClick={handleSearch}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
              >
                Search
              </button>

              <button
                onClick={clearFilters}
                className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-xl py-3 transition"
              >
                Clear
              </button>

            </div>

          </div>

        </div>

        {/* RESULTS */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Available Homes
          </h2>

          <span className="text-gray-500">
            {properties.length} Properties Found
          </span>

        </div>

        {properties.length === 0 ? (

          <div className="bg-white rounded-xl shadow text-center py-20">

            <h2 className="text-2xl font-semibold">
              No Properties Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your search filters.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}

          </div>

        )}

        {/* PAGINATION */}

        <div className="flex justify-center items-center gap-5 mt-12">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="px-5 py-3 bg-white rounded-xl shadow">
            Page <strong>{page}</strong> of{" "}
            <strong>{pages}</strong>
          </div>

          <button
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Next →
          </button>

        </div>

      </div>

    </div>
  );
}