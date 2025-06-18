import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#f14242]">
              StayFinder
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover unique stays and make your travels memorable with
              StayFinder. Verified listings, secure bookings, and great support.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-[#f14242] transition">
                <i className="fab fa-facebook h-5 w-5"></i>
              </a>
              <a href="#" className="hover:text-[#f14242] transition">
                <i className="fab fa-twitter h-5 w-5"></i>
              </a>
              <a href="#" className="hover:text-[#f14242] transition">
                <i className="fab fa-instagram h-5 w-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-white transition">
                  Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/listingpage1"
                  className="hover:text-white transition"
                >
                  Become a Host
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/help-center" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-white transition">
                  Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="hover:text-white transition"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} StayFinder. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <select className="bg-gray-800 border border-gray-600 text-sm text-gray-400 px-3 py-1 rounded">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">Français</option>
            </select>
            <select className="bg-gray-800 border border-gray-600 text-sm text-gray-400 px-3 py-1 rounded">
              <option value="inr">₹ INR</option>
              <option value="usd">$ USD</option>
              <option value="eur">€ EUR</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
