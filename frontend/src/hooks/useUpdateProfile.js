import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async (updatedData) => {
    const success = handleInputErrors({ updatedData });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedData }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};

export default useUpdateProfile;

function handleInputErrors({ updatedData }) {
  if (updatedData.username == null || updatedData.username == "") {
    toast.error("Username cannot be empty");
    return false;
  }
  if (updatedData.fullName == null || updatedData.fullName == "") {
    toast.error("FullName cannot be empty");
    return false;
  }
  if (updatedData.email == null || updatedData.email == "") {
    toast.error("Email cannot be empty");
    return false;
  }
  if (updatedData.phoneNumber == null || updatedData.phoneNumber == "") {
    toast.error("Phone Number cannot be empty");
    return false;
  }
  if (updatedData.bio == null || updatedData.bio == "") {
    toast.error("Bio cannot be empty");
    return false;
  }
  return true;
}
