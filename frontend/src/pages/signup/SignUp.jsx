import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phoneNumber: "",
  });

  const { signup, loading } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10 bg-gray-800 text-gray-200
                        placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
                        placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-300">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
                        placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
                            placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
                            placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Phone Number
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full input input-bordered h-10 bg-gray-800 text-gray-200
                            placeholder-gray-400 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={inputs.phoneNumber}
              onChange={(e) =>
                setInputs({ ...inputs, phoneNumber: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckBoxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            className="text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-gray-800 text-gray-300 hover:bg-gray-700 border-none"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
