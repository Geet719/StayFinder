import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

function ListingPage3() {
  const navigate = useNavigate();

 const {
  title, setTitle,
  description, setDescription,
  rent, setRent,
  city, setCity,
  landmark, setLandmark,
  category, setCategory,
  frontEndImage1, setFrontEndImage1,
  frontEndImage2, setFrontEndImage2,
  frontEndImage3, setFrontEndImage3,
  backEndImage1, setBackEndImage1,
  backEndImage2, setBackEndImage2,
  backEndImage3, setBackEndImage3,
} = useContext(listingDataContext);

  const { serverUrl } = useContext(authDataContext);

  const handleSubmit = async () => {
    try {
      // Validate all required fields
      if (!title || !description || !rent || !city || !landmark || !category) {
        alert("Please fill in all required fields");
        return;
      }

      // Validate images
      if (!backEndImage1 || !backEndImage2 || !backEndImage3) {
        alert("Please upload all three images");
        return;
      }

      

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);

      const response = await axios.post(
        `${serverUrl}/api/listings/add`, 
        formData, 
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        alert("Listing submitted successfully!");
        navigate("/");
        setTitle("")
        setDescription("");
        setRent("");
        setCity("");

        setLandmark("");
        setCategory("");    
        setFrontEndImage1("");
        setFrontEndImage2("");
        setFrontEndImage3("");
        setBackEndImage1("");
        setBackEndImage2("");
        setBackEndImage3("");

      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      console.error("Error response data:", error.response?.data);
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         "Submission failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-[#f14242]">
        Review Your Listing
      </h1>

      <div className="w-full max-w-4xl bg-gray-50 shadow-md rounded-lg p-6 space-y-4">
        {/* Details */}
        <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">Title:</span> {title}</p>
          <p><span className="font-semibold">Description:</span> {description}</p>
          <p><span className="font-semibold">Rent:</span> ₹{rent}</p>
          <p><span className="font-semibold">City:</span> {city}</p>
          <p><span className="font-semibold">Landmark:</span> {landmark}</p>
          <p><span className="font-semibold">Category:</span> {category}</p>
        </div>

        {/* Image Previews */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Preview Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {frontEndImage1 && <img src={frontEndImage1} alt="Image 1" className="w-full h-48 object-cover rounded-md border" />}
            {frontEndImage2 && <img src={frontEndImage2} alt="Image 2" className="w-full h-48 object-cover rounded-md border" />}
            {frontEndImage3 && <img src={frontEndImage3} alt="Image 3" className="w-full h-48 object-cover rounded-md border" />}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-[#f14242] text-white rounded-full font-semibold hover:bg-red-600 transition"
          >
            Submit Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingPage3;
