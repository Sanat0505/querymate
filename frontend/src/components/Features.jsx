import React from "react";

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose <span className="text-primary-500">Querymate</span>?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary-100 text-primary-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v2h6v-2m0-4v2m-6-2v2m-4 2v2m10-10l6-6M4 12v2m12 0v-2m2-2V8m0-4v2m-4 4V8m-2 4v-2m4 0H8m0 0V8m4 0H8"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Simplified Workflow
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automate repetitive tasks and streamline your processes with ease.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary-100 text-primary-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10l1-2m0 0l4-4m-4 4h4m12 2h-6m-4 0h-4m6 0l4-4m0 0l1 2m-5 8v6m-4 0v-6m4 0h-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Scalable Solutions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Scale your business without worrying about infrastructure.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary-100 text-primary-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h8m-4 4h0M4 12h0m16 0h0M5 17h0m10 0h0M15 21h0m-6 0h0m10-12V7h-3l-2-4M9 5h6m6 0h0m0 6h0m-4-2V3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get support whenever you need it from our expert team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
