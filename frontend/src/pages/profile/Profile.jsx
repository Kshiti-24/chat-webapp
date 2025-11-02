import { useAuthContext } from "../../context/authContext";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
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
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              disabled={true}
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
              placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={authUser.username}
              onChange={() => {}}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Full Name
              </span>
            </label>
            <input
              disabled={true}
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
              placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={authUser.fullName}
              onChange={() => {}}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">Email</span>
            </label>
            <input
              disabled={true}
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
              placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={authUser.email}
              onChange={() => {}}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Phone Number
              </span>
            </label>
            <input
              disabled={true}
              type="number"
              placeholder="Enter Phone Number"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
              placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={authUser.phoneNumber}
              onChange={() => {}}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">Bio</span>
            </label>
            <input
              disabled={true}
              type="text"
              placeholder="Enter Bio"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
              placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={authUser.bio}
              onChange={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
