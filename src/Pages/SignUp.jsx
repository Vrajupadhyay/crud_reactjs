import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import Loader from "../Components/Loader";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      toast.error("Please fill all the details");
      return;
    }

    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);

    // dispatch create account action
    const response = dispatch(createAccount(formData));
    if (message) {
      toast.success("Account created successfully");
      navigate("/");
    } else if (error) {
      toast.error(error);
    } else {
      toast.error("Something went wrong");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="hero h-screen pt-5 bg-base-200">
        <div className="content">
          <div className="text-center bg-base-200">
            <h1 className="text-4xl text-blue-500 font-bold">
              Registration Page
            </h1>
          </div>
          {loading && (
            <p>
              <Loader />
            </p>
          )}
          {/* toast message */}
          {/* {error && toast.error(error)}
          {message && toast.success(message)} */}
          <div className="card w-full mt-5 shadow-2xl bg-base-100">
            <form
              className="card-body w-full"
              noValidate
              onSubmit={createNewAccount}
            >
              <div className="form-control mb-4">
                <input
                  type="text"
                  placeholder="Enter your name.."
                  className="input input-bordered mt-1"
                  name="fullName"
                  id="fullName"
                  value={signupData.fullName}
                  onChange={handleUserInput}
                />
              </div>
              <div className="form-control mb-4">
                <input
                  type="email"
                  placeholder="Enter your email.."
                  className="input input-bordered mt-1"
                  name="email"
                  id="email"
                  value={signupData.email}
                  onChange={handleUserInput}
                />
              </div>
              <div className="form-control mb-4">
                <input
                  type="password"
                  placeholder="Enter your password.."
                  className="input input-bordered mt-1"
                  name="password"
                  id="password"
                  value={signupData.password}
                  onChange={handleUserInput}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <p className="mt-2">
                  Already have an account ?{" "}
                  <Link to="/login" className="link text-accent cursor-pointer">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
