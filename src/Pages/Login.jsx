import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for displaying the options acc to role
  const role = useSelector((state) => state?.auth?.role);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    try {
      // Send the email and password in the request body
      const response = await dispatch(
        login({ email: loginData.email, password: loginData.password })
      );

      // Check if the response is successful
      if (response.payload?.status === "success") {
        // Display success toast and navigate to the home page
        toast.success(response.payload.message);
        navigate("/");
      } else {
        // Display error toast if login is unsuccessful
        toast.error(response.payload.message);
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      toast.error("Failed to login");
      console.error(error);
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="hero h-screen pt-5 bg-base-200">
        <div className="content">
          <div className="text-center bg-base-200">
            <h1 className="text-4xl text-blue-500 font-bold">Login Page</h1>
          </div>
          <div className="card w-full mt-5 shadow-2xl bg-base-100">
            <form className="card-body w-full" noValidate onSubmit={onLogin}>
              <div className="form-control mb-4">
                <input
                  type="email"
                  placeholder="Enter your email.."
                  className="input input-bordered mt-1"
                  name="email"
                  id="email"
                  value={loginData.email}
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
                  value={loginData.password}
                  onChange={handleUserInput}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                {isLoggedIn && role === "ADMIN" && (
                  <p className="mt-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">
                      Signup
                    </Link>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Login;
