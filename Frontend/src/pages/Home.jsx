import React, { useState, useEffect, useContext } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import axios from "axios";
import ListingGrid from "../components/ListingGrid";
import { authDataContext } from "../context/AuthContext";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    minRent: "",
    maxRent: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    fetchListings();
  }, [appliedFilters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/listings`, {
        params: appliedFilters,
      });
      setListings(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch listings");
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      city: "",
      category: "",
      minRent: "",
      maxRent: "",
    });
    setAppliedFilters({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#f14242]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-[#f14242]">{error}</h2>
      </div>
    );
  }

  return (
    <>
    <div className="max-h-screen bg-gray-100">
      <Nav />
      <div className=" h-auto bg-gray-50 mt-12 p-4"> {/* Adjusted padding to account for fixed navbar */}
        
        
        {/* Filters Section */}
        <div className="bg-white shadow-lg mt-12 p-6 mb-4 rounded-lg max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            🔍 Find Your Perfect Stay
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={filters.city}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f14242]"
            />
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f14242]"
            >
              <option value="">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="PG">PG</option>
              <option value="Cottage">Cottage</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Tent">Tent</option>
              <option value="Cabin">Cabin</option>
              <option value="Studio">Studio</option>
            </select>
            <input
              type="number"
              name="minRent"
              placeholder="Min Rent ₹"
              value={filters.minRent}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f14242]"
            />
            <input
              type="number"
              name="maxRent"
              placeholder="Max Rent ₹"
              value={filters.maxRent}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f14242]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handleSearch}
              className="bg-[#f14242] hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-400 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-full transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ListingGrid listings={listings} />
        </div>
        
      </div>
      <Footer />
       </div>
    </>
   
  );
}

export default Home;
