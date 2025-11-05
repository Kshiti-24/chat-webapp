import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const Profile = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: authUser?._id || "",
    username: authUser?.username || "",
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    phoneNumber: authUser?.phoneNumber || "",
    bio: authUser?.bio || "",
  });
  const { updateProfile, loading } = useUpdateProfile();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async () => {
    await updateProfile(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full relative p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4"
          aria-label="Go back"
        >
          <BiArrowBack className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white" />
        </button>

        <div className="flex justify-center mb-4">
          <div className="avatar online w-16 rounded-full border-2 border-blue-500">
            <img src={authUser.profilePicture} alt="user avatar" />
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {["username", "fullName", "email", "phoneNumber", "bio"].map(
            (field) => (
              <div key={field}>
                <label className="label p-2">
                  <span className="text-base label-text text-gray-300 capitalize">
                    {field === "fullName" ? "Full Name" : field}
                  </span>
                </label>
                <input
                  name={field}
                  type={field === "phoneNumber" ? "number" : "text"}
                  placeholder={`Enter ${field}`}
                  disabled={!isEditing}
                  className={`w-full input input-bordered h-10 bg-gray-800 text-gray-200 placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950 ${
                    !isEditing ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            )
          )}
        </form>

        <div className="flex justify-end mt-4 gap-3">
          {!isEditing ? (
            <button
              onClick={handleEditToggle}
              className="btn btn-outline btn-sm text-gray-200 border-gray-400 hover:bg-gray-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary btn-sm text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={handleEditToggle}
                className="btn btn-outline btn-sm text-gray-200 border-gray-400 hover:bg-gray-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
