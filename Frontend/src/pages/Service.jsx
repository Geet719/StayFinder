import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaHome, FaUsers, FaHandshake, FaShieldAlt } from "react-icons/fa";

const services = [
  {
    title: "Verified Stays",
    icon: <FaShieldAlt className="h-10 w-10 text-[#f14242]" />,
    description:
      "All properties listed on StayFinder go through a verification process to ensure a safe and trustworthy experience.",
  },
  {
    title: "Host Support",
    icon: <FaHandshake className="h-10 w-10 text-[#f14242]" />,
    description:
      "We help hosts every step of the way—from listing their property to managing bookings and resolving issues.",
  },
  {
    title: "24/7 Customer Care",
    icon: <FaUsers className="h-10 w-10 text-[#f14242]" />,
    description:
      "Our support team is always ready to assist you with any questions or concerns, day or night.",
  },
  {
    title: "Flexible Booking",
    icon: <FaHome className="h-10 w-10 text-[#f14242]" />,
    description:
      "Choose from short or long-term stays, with easy booking and cancellation options to suit your needs.",
  },
];

function Services() {
  return (
    <>
      <Nav />
      <div className="pt-[100px] min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center text-[#f14242] mb-4">
            Our Services
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            StayFinder provides a seamless experience for both travelers and
            hosts. We offer a suite of services designed to ensure comfort,
            security, and ease of use.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  {service.icon}
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
