import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import hero_bg from "../assets/images/bg_img.png"


const HeroSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const toggleModal = (login) => {
    setLogin(login);
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Revolutionizing Your Business with <span className="text-primary-500">Querymate</span>
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Our product simplifies complex workflows, saves time, and empowers
          businesses to scale effortlessly. Join thousands of businesses who
          trust us.
        </p>
        <button
          onClick={() => toggleModal(true)}
          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Get started
        </button>
        <button
          onClick={() => toggleModal(false)}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Contact Us
        </button>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          src={hero_bg}
          alt="Hero image"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              {isLogin ? "SignIn" : "Sign Up"}
            </h2>
            {isLogin ? <SignIn /> : <SignUp />}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => toggleModal(false)}
                className="text-gray-600 dark:text-gray-400 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => setLogin(!isLogin)}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
