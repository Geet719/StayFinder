import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listingDataContext } from "../context/ListingContext";
import {
  FaHome,
  FaBuilding,
  FaHotel,
  FaMountain,
  FaTree,
  FaCampground,
  FaWarehouse,
  FaCube,
} from 'react-icons/fa';

const categories = [
  { name: 'Villa', icon: <FaHome /> },
  { name: 'Apartment', icon: <FaBuilding /> },
  { name: 'House', icon: <FaHotel /> },
  { name: 'Cottage', icon: <FaMountain /> },
  { name: 'Farmhouse', icon: <FaTree /> },
  { name: 'Tent', icon: <FaCampground /> },
  { name: 'Cabin', icon: <FaWarehouse /> },
  { name: 'Studio', icon: <FaCube /> },
  { name: 'PG', icon: <FaBuilding /> },
];

function ListingPage2() {
  const { setCategory } = useContext(listingDataContext);
  const [selectedCategory, setSelectedCategory] = useState(null); // ✅ added
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategory(category); // ✅ update global context
  };

  const handleNext = () => {
    if (selectedCategory) {
      navigate('/listingpage3');
      
    } else {
      alert("Please select a category before continuing.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-8 flex flex-col items-center">
      {/* Top Navigation */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <Link
          to="/listingpage1"
          className="inline-flex items-center p-2 sm:p-3 bg-[#f14242] rounded-full hover:bg-red-600"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <div className="text-center w-full sm:w-auto">
          <div className="text-base sm:text-lg bg-[#f14242] text-white px-5 sm:px-6 py-2 rounded-full shadow-md font-semibold mx-auto sm:mx-0">
            Setup Your Category
          </div>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Which of these best describes your place?
      </h1>
      <p className="text-gray-500 mb-6 text-center">
        Choose the category that best fits your property. Guests will use this to find the perfect stay.
      </p>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategorySelect(cat.name)}
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition duration-300 ${
              selectedCategory === cat.name
                ? 'border-[#f14242] bg-red-50'
                : 'border-gray-200 hover:border-[#f14242]'
            }`}
          >
            <div className="text-2xl text-[#f14242]">{cat.icon}</div>
            <div className="text-lg font-medium text-gray-700">{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-10">
        <button
          onClick={handleNext}
          className="bg-[#f14242] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingPage2;
