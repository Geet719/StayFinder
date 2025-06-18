import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "How do I book a property?",
    answer:
      "Browse listings, select your dates, and click on 'Book Now'. You’ll be redirected to complete the payment.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, bookings can be cancelled before the check-in date. Go to 'My Bookings' and click on 'Cancel Booking'.",
  },
  {
    question: "How do I update my profile?",
    answer:
      "Visit the 'Profile' page from the menu. You can update your name, email, and upload a profile picture.",
  },
  {
    question: "What if my payment fails?",
    answer:
      "If your payment fails, no booking will be created. You can try again or use a different payment method.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Scroll to the bottom of this page and use the contact support button. Our team will get back to you within 24 hours.",
  },
];

const HelpCenter = () => {
  return (
    <>
      <Nav />
      <div className="pt-[100px] min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#f14242] mb-6">
            Help Center
          </h1>
          <p className="text-gray-600 text-center mb-10">
            Find answers to common questions. Still need help? Contact us below.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-4">
              Reach out to our support team for assistance.
            </p>
            <a
              href="mailto:support@stayfinder.com"
              className="inline-block bg-[#f14242] text-white px-6 py-2 rounded-full hover:bg-red-600 transition mb-4"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenter;
