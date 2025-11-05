import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ProfileIcon = () => {
  const { authUser } = useAuthContext();

  return (
    <Link to="/profile">
      <div className="avatar online mx-2">
        <div className="w-12 rounded-full">
          <img src={authUser.profilePicture} alt="user avatar" />
        </div>
      </div>
    </Link>
  );
};

export default ProfileIcon;
