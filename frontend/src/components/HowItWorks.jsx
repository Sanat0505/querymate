import React from 'react';
import { FaUser, FaBrain, FaProjectDiagram, FaTasks, FaCheckCircle } from "react-icons/fa"; // Import icons

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          How <span className="text-primary-500">Querymate</span> Works?
        </h2>
        {/* <p className="mt-4 text-gray-600 dark:text-gray-300">
          Querymate automates query resolution using AI-driven BPMN workflows, making support faster and more efficient.
        </p> */}

        {/* Workflow Path */}
        <div className="relative flex flex-col items-center mt-10 space-y-10 md:space-y-0 md:flex-row md:justify-between">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-500 text-white p-4 rounded-full text-3xl">
              <FaUser />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">User Submits a Query</h3>
            {/* <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
              Users enter their queries, such as "How can I reset my password?" or "I need a refund."
            </p> */}
          </div>

          {/* Connecting Line */}
          <div className="hidden md:block w-24 h-1 bg-primary-500"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-500 text-white p-4 rounded-full text-3xl">
              <FaBrain />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">AI Classifies the Query</h3>
            {/* <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
              Querymate identifies whether the query can be answered automatically or if it needs human intervention.
            </p> */}
          </div>

          {/* Connecting Line */}
          <div className="hidden md:block w-24 h-1 bg-primary-500"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-500 text-white p-4 rounded-full text-3xl">
              <FaProjectDiagram />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">BPMN Workflow is Generated</h3>
            {/* <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
              If escalated, a BPMN workflow is created and assigned to an admin for resolution.
            </p> */}
          </div>

          {/* Connecting Line */}
          <div className="hidden md:block w-24 h-1 bg-primary-500"></div>

          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-500 text-white p-4 rounded-full text-3xl">
              <FaTasks />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Tasks are Completed</h3>
            {/* <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
              Admins complete tasks within the workflow, ensuring a systematic approach to resolution.
            </p> */}
          </div>

          {/* Connecting Line */}
          <div className="hidden md:block w-24 h-1 bg-primary-500"></div>

          {/* Step 5 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-500 text-white p-4 rounded-full text-3xl">
              <FaCheckCircle />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Query is Resolved</h3>
            {/* <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
              Once all tasks are completed, Querymate notifies the user with a detailed solution.
            </p> */}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
