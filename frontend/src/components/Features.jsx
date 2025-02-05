import React from "react";
import {ClockIcon, LightBulbIcon, ScaleIcon} from "@heroicons/react/solid"

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Why Choose <span className="text-primary-500">Querymate</span>?
        </h2>
        {/* <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
        Why Choose <span className="text-primary-500">Querymate</span>?
        </h2> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary-100 text-primary-500 rounded-full">
              <LightBulbIcon className="h=6 w-6"/>
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
              <ScaleIcon className="h-6 w-6" />
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
              <ClockIcon className="h-6 w-6" />
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
