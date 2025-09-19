import React from "react";

const Page4 = () => {
  return (
    <div>
      <div className="relative w-full h-[600px] m-0 p-0 overflow-hidden">
        <img
          src="bottom.webp"
          alt="bottom"
          className="w-full h-full object-cover block"
        />
        <div className="absolute inset-0 ml-60 mt-40 text-white">
          <h3 className="text-[64px] font-semibold">
            We’re building the
            <br /> future of mental
            <br /> health care
          </h3>
          <button className="py-3 px-7 mt-6 bg-red-500 text-white font-medium rounded-lg">
            More about our impact
          </button>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-gray-300 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Alura</h2>
            <p className="text-sm">
              Empowering people with instant,<br /> stigma-free mental wellness
              support
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-sm">📍 Pune, Maharashtra, India</p>
            <p className="text-sm">📧 contact@Alura.com</p>
            <p className="text-sm">📞 +91 8788647725</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Alura. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Page4;
