import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "tenant", // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (
      !formData.password ||
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    console.log(formData); // Log the data to see if everything looks good
  
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", formData);
      alert(response.data.message); 
  
      // Redirect based on role
      navigate("/login");
    } catch (error) {
      setErrors({ server: error.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJm-cwiuUFpWwkW3LYuQb3AlpufJaPxdlKw&s')"
      }}
    >
      <div className="bg-white bg-opacity-30 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h1>
        
        {errors.server && <p className="text-center text-red-600">{errors.server}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
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

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="tenant">Tenant</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-900 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-red-900 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
