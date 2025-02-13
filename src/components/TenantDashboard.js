import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TenantDashboard = () => {
  // State for tenant data, properties, payments, complaints, and notifications
  const [tenantProfile, setTenantProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
  });
  const [appliedProperties, setAppliedProperties] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    setAppliedProperties([
      {
        id: 1,
        title: "Apartment in Goa",
        location: "Goa",
        rent: "₹15,000",
        status: "Pending Approval",
      },
      {
        id: 2,
        title: "Villa in Pune",
        location: "Pune",
        rent: "₹25,000",
        status: "Approved",
      },
    ]);
    setPaymentHistory([
      { id: 1, date: "2025-01-01", amount: "₹15,000", status: "Paid" },
      { id: 2, date: "2025-02-01", amount: "₹25,000", status: "Pending" },
    ]);
    setComplaints([
      { id: 1, issue: "Leaking roof", status: "Resolved" },
      { id: 2, issue: "Broken AC", status: "Pending" },
    ]);
    setNotifications([
      "Your rent is due on 2025-02-01.",
      "Lease agreement expires in 30 days.",
      "New property matching your preferences is available!",
    ]);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white">
        <div className="p-4 text-lg font-bold text-center border-b border-gray-600">
          Tenant Dashboard
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link to="/profile" className="p-2 hover:bg-gray-700 cursor-pointer block">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/property-list" className="p-2 hover:bg-gray-700 cursor-pointer block">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/payment-history" className="p-2 hover:bg-gray-700 cursor-pointer block">
                Payment History
              </Link>
            </li>
            <li>
              <Link to="/lease-management" className="p-2 hover:bg-gray-700 cursor-pointer block">
                Lease Management
              </Link>
            </li>
            <li>
              <Link to="/support" className="p-2 hover:bg-gray-700 cursor-pointer block">
                Support
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="p-2 hover:bg-gray-700 cursor-pointer block">
                Notification
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-green-200 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome, {tenantProfile.name}</h1>
          <p className="text-gray-700">Email: {tenantProfile.email}</p>
          <p className="text-gray-700">Phone: {tenantProfile.phone}</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold mb-2">Total Properties</h2>
            <p className="text-2xl font-bold text-blue-600">
              {appliedProperties.length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold mb-2">Payments</h2>
            <p className="text-2xl font-bold text-green-600">
              {paymentHistory.length} transactions
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold mb-2">Complaints</h2>
            <p className="text-2xl font-bold text-red-600">
              {complaints.length} complaints
            </p>
          </div>
        </div>

        {/* Properties Applied For */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Properties Applied For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {appliedProperties.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold">{property.title}</h3>
                <p className="text-gray-600">Location: {property.location}</p>
                <p className="text-gray-600">Rent: {property.rent}</p>
                <p
                  className={`font-bold ${
                    property.status === "Approved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {property.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Payment History</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Date</th>
                <th className="border-b p-2">Amount</th>
                <th className="border-b p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="p-2 border-b">{payment.date}</td>
                  <td className="p-2 border-b">{payment.amount}</td>
                  <td className="p-2 border-b">
                    <span
                      className={
                        payment.status === "Paid"
                          ? "text-green-600 font-bold"
                          : "text-yellow-600 font-bold"
                      }
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications Panel */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Notifications Panel</h2>
          <ul className="space-y-2">
            {notifications.map((note, index) => (
              <li
                key={index}
                className="p-2 border-b last:border-0 text-sm text-gray-600"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;
