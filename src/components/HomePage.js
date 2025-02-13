import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-75 py-4 z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-yellow-500 text-2xl font-bold">EasyRent</h1>
          <div className="space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-yellow-500 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-yellow-500 cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-yellow-500 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-yellow-500 cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => navigate("/register")}
              className="hover:text-yellow-500 cursor-pointer"
            >
              Login/Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        id="home"
        className="flex flex-col items-center justify-center h-screen pt-16"
        style={{
          backgroundImage: `url(home1.jpg)`, // Use the correct path to your image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-6">
          <h1 className="text-yellow-500 text-4xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-white-900 text-lg mb-6">
            Discover the perfect house for rent or lease with ease. Our platform
            bridges the gap between tenants and property owners.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Features</h2>
          <p className="text-lg text-gray-400 mb-8">
            Discover the amazing features that make our platform stand out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-500 mb-2">
                Seamless Listings
              </h3>
              <p className="text-gray-400">
                Effortlessly browse or list properties for rent.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-500 mb-2">
                Advanced Filters
              </h3>
              <p className="text-gray-400">
                Narrow down your search by location, price, and more.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-500 mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-400">
                Make payments and communicate securely on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div
        id="about"
        className="bg-black text-white py-20 flex items-center justify-center"
      >
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="regis-1.jpg" // Replace with actual image URL
              alt="About Us"
              className="w-full rounded-lg"
            />
          </div>
          {/* Text Section */}
          <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400 mb-4">
              Welcome to EasyRent, your one-stop solution for effortless house
              rentals and lease management.
            </p>
            <p className="text-gray-400 mb-6">
              We are dedicated to bridging the gap between tenants and property
              owners, providing a seamless and transparent platform for all your
              rental needs.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">EasyRent</h3>
            <p className="text-gray-400">
              Simplifying house rentals with seamless technology.
            </p>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul>
              <li>
                <a href="#home" className="text-gray-400 hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-yellow-500"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-yellow-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-yellow-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
