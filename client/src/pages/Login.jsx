import  { useState } from "react";
import { useUser } from "../store/auth"; // Import the useUser hook
import { Link } from "react-router-dom"; // useNavigate for navigation after login

const Login = () => {
  const { signin } = useUser(); // Access the login function from the context
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", formdata.email);
    console.log("Password:", formdata.password);

    setLoading(true); // Show loader when API is hit
    try {
      // Call the login function from context to update global state
      await signin(formdata.email, formdata.password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Hide loader after API call completes
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="login.jpg" // Replace with your image URL
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-r from-green-50 to-green-200 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
            Welcome Back
          </h2>
          <p className="text-green-600 text-center mb-6">
            Login to your account and start exploring.
          </p>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-green-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formdata.email}
                onChange={(e) =>
                  setformdata({
                    ...formdata,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-green-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formdata.password}
                onChange={(e) =>
                  setformdata({
                    ...formdata,
                    password: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
              >
                {loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Additional Links */}
          <div className="text-center mt-4">
            <p className="text-green-600">
              Don&apos;t have an account?{" "}
              <Link to={"/signup"} className="text-green-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="text-green-600 mt-2">
              Forgot your password?{" "}
              <a
                href="/reset-password"
                className="text-green-500 hover:underline"
              >
                Reset it here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
