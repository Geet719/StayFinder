import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";

function ListingPage1() {
  const navigate = useNavigate();

  const {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
  } = useContext(listingDataContext);

  const handleImageUpload = (e, setBackend, setFrontend, otherImages) => {
    const file = e.target.files[0];
    if (file) {
      // Check if this image is already uploaded in other sections
      const isDuplicate = otherImages.some(img => 
        img && img.name === file.name && img.size === file.size
      );

      if (isDuplicate) {
        alert("This image is already uploaded in another section. Please upload a different image.");
        return;
      }

      setBackend(file);
      setFrontend(URL.createObjectURL(file));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!title || !description || !rent || !city) {
      alert("Please fill all required fields");
      return;
    }
    navigate("/listingpage2");
  };

  const handleImage1Upload = (e) => {
    handleImageUpload(e, setBackEndImage1, setFrontEndImage1, [backEndImage2, backEndImage3]);
  };

  const handleImage2Upload = (e) => {
    handleImageUpload(e, setBackEndImage2, setFrontEndImage2, [backEndImage1, backEndImage3]);
  };

  const handleImage3Upload = (e) => {
    handleImageUpload(e, setBackEndImage3, setFrontEndImage3, [backEndImage1, backEndImage2]);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-auto p-4">
      <form
        onSubmit={handleNext}
        className="max-w-[900px] w-[100%] flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center p-4 bg-[#f14242] rounded-full"
          >
            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <div className="text-lg bg-[#f14242] text-white px-6 py-2 rounded-full shadow-md font-semibold">
            Setup Your Home
          </div>
        </div>

        <h1 className="text-2xl font-bold">Setup your home</h1>
        <p className="text-gray-600">Add your home details to get started</p>

        {/* Form Fields */}
        <label className="flex justify-between items-center">
          <span className="text-lg font-semibold">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[70%] h-[40px] border border-gray-300 rounded-md px-3"
            placeholder="Enter title"
          />
        </label>

        <label className="flex justify-between items-center">
          <span className="text-lg font-semibold">Description:</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[70%] h-[40px] border border-gray-300 rounded-md px-3"
            placeholder="Enter description"
          />
        </label>

        <label className="flex justify-between items-center">
          <span className="text-lg font-semibold">Home Rent:</span>
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="w-[70%] h-[40px] border border-gray-300 rounded-md px-3"
            placeholder="Enter rent"
          />
        </label>

        {[1, 2, 3].map((num) => (
          <label key={num} className="flex justify-between items-center">
            <span className="text-lg font-semibold">Image {num}:</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (num === 1) handleImage1Upload(e);
                if (num === 2) handleImage2Upload(e);
                if (num === 3) handleImage3Upload(e);
              }}
              className="w-[70%] h-[40px] border border-gray-300 rounded-md px-3"
            />
          </label>
        ))}

        <label className="flex justify-between items-center">
          <span className="text-lg font-semibold">City:</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[70%] h-[40px] border border-gray-300 rounded-md px-3"
            placeholder="Enter city"
          />
        </label>

        <label className="flex justify-between items-center">
          <span className="text-lg font-semibold">Landmark:</span>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-[70%] h-[40px] border border-gray-300 rounded-md px-3"
            placeholder="Enter landmark"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-[#f14242] text-white rounded-md hover:bg-red-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingPage1;
