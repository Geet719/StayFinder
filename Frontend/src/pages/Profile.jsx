import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";

function Profile() {
  const { user, setUserData } = useContext(UserDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
      setPreview(user.profileImage || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (profileImage) data.append("profileImage", profileImage);

    try {
      const response = await axios.put(`${serverUrl}/api/user/update`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUserData(response.data.user); // Update context
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Update failed");
    }
  };

  if (!user) {
    return (
      <div className="mt-[100px] text-center text-gray-600">Loading profile...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 bg-white rounded-lg shadow-md mt-[100px]">
      <h2 className="text-2xl font-bold text-center text-[#f14242] mb-6">
        My Profile
      </h2>

      {message && <p className="text-center mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full border bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {editMode && (
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full"
          />
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Name"
          className={`w-full border p-2 rounded ${editMode ? "" : "bg-gray-100"}`}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Email"
          className={`w-full border p-2 rounded ${editMode ? "" : "bg-gray-100"}`}
        />

        {editMode ? (
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#f14242] text-white py-2 rounded hover:bg-red-600"
            >
              Save
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-600"
              onClick={() => {
                setEditMode(false);
                setFormData({ name: user.name, email: user.email });
                setPreview(user.profileImage || "");
                setProfileImage(null);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full bg-[#f14242] text-white py-2 rounded hover:bg-red-600"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;
