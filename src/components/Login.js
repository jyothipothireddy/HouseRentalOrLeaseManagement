import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make API call for login
        const response = await fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (response.ok) {
          const data = await response.json();
          // Store the token in localStorage (or use cookies depending on your app)
          localStorage.setItem("authToken", data.token);

          alert("Login Successful!");

          // Redirect based on the user role
          const userRole = data.user.role; // Assuming the role is returned with the user data
          navigate(userRole === "tenant" ? "/tenant-dashboard" : "/owner-dashboard");
        } else {
          const errorData = await response.json();
          setErrors({ server: errorData.message || "Login failed. Please check your credentials." });
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.properties.market/in/blog/wp-content/uploads/2024/01/5-Most-Lavish-And-Expensive-Celebrity-Owned-Houses-In-Hyderabad-1200x900.png')", // Replace with your desired background image URL
      }}
    >
      <div className="bg-white bg-opacity-60 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {errors.server && <p className="text-center text-red-600">{errors.server}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-red-800 hover:underline">
            Register here
          </a>
        </p>
        <p className="text-center text-gray-700 text-sm mt-2">
          <a href="/forgot-password" className="text-red-800 hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
