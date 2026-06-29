import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:flex lg:items-center lg:justify-between">

          <div className="max-w-2xl">

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Welcome to Pangisha Smart House
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Find Your Next
              <span className="text-blue-600"> Dream Home</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Search thousands of verified apartments, bedsitters,
              studios, and family homes across Kenya. Compare prices,
              explore locations, and connect directly with landlords.
            </p>

            <div className="flex gap-4 mt-10">

              <Link
                to="/properties"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                Browse Properties
              </Link>

              <Link
                to="/favorites"
                className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition"
              >
                Saved Homes
              </Link>

            </div>

          </div>

          <div className="mt-14 lg:mt-0">

            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900"
              alt="Modern House"
              className="rounded-2xl shadow-2xl w-full max-w-xl"
            />

          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="max-w-6xl mx-auto px-6 -mt-10">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              500+
            </h2>

            <p className="text-gray-500 mt-2">
              Available Houses
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              150+
            </h2>

            <p className="text-gray-500 mt-2">
              Trusted Landlords
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              20+
            </h2>

            <p className="text-gray-500 mt-2">
              Locations
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              24/7
            </h2>

            <p className="text-gray-500 mt-2">
              Customer Support
            </p>
          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Pangisha?
          </h2>

          <p className="text-gray-500 mt-3">
            Everything you need to find your next home.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8">

            <div className="text-5xl">🏠</div>

            <h3 className="text-2xl font-semibold mt-6">
              Verified Listings
            </h3>

            <p className="text-gray-600 mt-3 leading-7">
              Browse quality listings from trusted landlords with
              complete information and images.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8">

            <div className="text-5xl">🔍</div>

            <h3 className="text-2xl font-semibold mt-6">
              Smart Search
            </h3>

            <p className="text-gray-600 mt-3 leading-7">
              Filter properties by location, bedrooms, price and
              property type to quickly find your ideal home.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8">

            <div className="text-5xl">❤️</div>

            <h3 className="text-2xl font-semibold mt-6">
              Save Favorites
            </h3>

            <p className="text-gray-600 mt-3 leading-7">
              Keep a shortlist of your favourite properties and
              revisit them anytime after logging in.
            </p>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-blue-600">

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl font-bold text-white">
            Ready to Find Your New Home?
          </h2>

          <p className="text-blue-100 mt-5 text-lg">
            Explore hundreds of listings and connect with landlords in minutes.
          </p>

          <Link
            to="/properties"
            className="inline-block mt-8 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Properties
          </Link>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

<footer className="bg-gray-900 text-gray-300">

  <div className="max-w-7xl mx-auto px-6 py-14">

    <div className="grid md:grid-cols-4 gap-10">

      {/* Logo & About */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Pangisha Smart House
        </h2>

        <p className="mt-4 text-gray-400 leading-7">
          A modern property rental platform that connects tenants
          with trusted landlords across Kenya. Find your perfect
          home quickly and securely.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Quick Links
        </h3>

        <ul className="space-y-3">

          <li>
            <Link
              to="/"
              className="hover:text-white"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/properties"
              className="hover:text-white"
            >
              Properties
            </Link>
          </li>

          <li>
            <Link
              to="/favorites"
              className="hover:text-white"
            >
              Favorites
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-white"
            >
              Login
            </Link>
          </li>

        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Contact
        </h3>

        <ul className="space-y-3">

          <li>📍 Nairobi, Kenya</li>

          <li>📞 +254 700 000 000</li>

          <li>✉️ support@pangisha.co.ke</li>

        </ul>
      </div>

      {/* Social */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Follow Us
        </h3>

        <div className="flex gap-4 text-2xl">

          <a
            href="#"
            className="hover:text-white transition"
          >
            🌐
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            📘
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            📷
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            💼
          </a>

        </div>

      </div>

    </div>

    {/* Bottom */}
    <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Pangisha Smart House. All rights reserved.
      </p>

      <div className="flex gap-6 mt-4 md:mt-0 text-sm">

        <Link
          to="#"
          className="hover:text-white"
        >
          Privacy Policy
        </Link>

        <Link
          to="#"
          className="hover:text-white"
        >
          Terms of Service
        </Link>

      </div>

    </div>

  </div>

</footer>

    </div>
  );
}