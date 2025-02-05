import React from "react";
import { FaBrain, FaProjectDiagram, FaBolt, FaUsers, FaClock, FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          About <span className="text-primary-500">Querymate</span>
        </h2>
        <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Querymate is an  <span className="font-bold">AI-powered workflow automation platform</span> that transforms query management by  <span className="font-bold">automating responses and streamlining complex support workflows using BPMN</span>.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          {/* Feature 1: AI-Powered Query Handling */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 text-4xl">
              <FaBrain />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI-Powered Query Handling
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Querymate  <span className="font-bold">classifies queries automatically</span>, deciding whether to provide an instant solution or escalate it to an admin.
            </p>
          </div>

          {/* Feature 2: BPMN Workflow Automation */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 text-4xl">
              <FaProjectDiagram />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              BPMN Workflow Automation
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Escalated queries trigger  <span className="font-bold">BPMN-based workflows</span>, ensuring an  <span className="font-bold">organized and efficient</span> query resolution.
            </p>
          </div>

          {/* Feature 3: Faster & Smarter Resolutions */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 text-4xl">
              <FaBolt />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Faster & Smarter Resolutions
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              AI-driven responses and  <span className="font-bold">task-based admin workflows</span> drastically  <span className="font-bold">reduce resolution time</span>.
            </p>
          </div>

          {/* Feature 4: User-Friendly Interface */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 text-4xl">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              User-Friendly Interface
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Querymate offers a simple and  <span className="font-bold">intuitive dashboard</span> for both users and admins to manage and track queries.
            </p>
          </div>

          {/* Feature 5: Saves Time & Effort */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 text-4xl">
              <FaClock />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Saves Time & Effort
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              AI automation and smart workflows <span className="font-bold">eliminate manual inefficiencies</span>, enabling faster resolutions.
            </p>
          </div>

          {/* Feature 6: Reliable & Scalable */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 text-4xl">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reliable & Scalable
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Built to handle <span className="font-bold">high query volumes</span>, Querymate <span className="font-bold">scales effortlessly</span> with business growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
