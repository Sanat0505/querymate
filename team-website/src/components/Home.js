import React from "react";
import Team from "./Team";
import "../assets/styles/style.css";
import heroImage from "../assets/images/hero_image.png";
import SwiperComponent from "./Swiper";
import About from "./About";

const Home = () => (
  <>
    <div className=" bg-black rounded-lg mx-auto min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="font-semibold text-silver_main text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl block pt-12 ">
        INNOVATE, AUTOMATE, ELEVATE
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center p-6 sm:px-12">
        {/* Hero Image Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 animate__animated animate__backInLeft">
          <img
            src={heroImage}
            alt="Tech solutions hero image"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-justify md:text-left animate__animated animate__backInRight">
          <p className="text-silver_main text-justify leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl">
            <span className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl block mb-4">
              Welcome to TECHBLEND
            </span>
            – a platform where emerging student talent in design, development,
            and digital strategy converges. Our team of passionate is dedicated
            to learning and exploring advanced technologies such as Blockchain
            Technology, AI and Full stake development while creating impactful
            digital solutions.
            <br />
            <br />
            As students, our goal is to bring fresh perspectives to the field
            and develop future-ready skills by working on real-world projects.
            Join us at TechBlend as we build innovative and meaningful digital
            experiences together, one project at a time.
          </p>
        </div>
      </div>
    </div>
    {/* <SwiperComponent /> */}
    <About />
    <Team />
  </>
);

export default Home;
