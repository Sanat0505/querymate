import React from "react";
import "../assets/styles/style.css";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const About = () => (
  <div
    id="about"
    className="bg-silver_main rounded-lg mx-auto min-h-screen md:min-h-0 px-4 sm:px-6 lg:px-8 py-8 border-2 border-black"
  >
    {/* Component Title */}
    <h2 className="text-center text-black text-3xl font-bold mb-8">About Us</h2>

    {/* Mission and Vision Grid */}
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Mission Card */}
      <div className="bg-black rounded-lg p-6 h-full flex flex-col text-justify">
        <h3 className="text-silver_main text-2xl font-semibold mb-4 flex items-center space-x-2">
          <FaBullseye /> <span>Mission</span>
        </h3>
        <p className="text-silver_main leading-relaxed flex-grow">
          We aim to create a user-friendly platform that makes AI-driven
          insights available to all, helping organizations identify
          inefficiencies and streamline operations. We will also be dedicated to
          providing exceptional support and resources, ensuring that our clients
          not only implement our solutions but also derive maximum value from
          them.
        </p>
      </div>

      {/* Vision Card */}
      <div className="bg-black rounded-lg p-6 h-full flex flex-col text-justify">
        <h3 className="text-silver_main text-2xl font-semibold mb-4 flex items-center space-x-2">
          <FaLightbulb /> <span>Vision</span>
        </h3>
        <p className="text-silver_main leading-relaxed flex-grow">
          We strive to be the first option for SMEs concerning next-gen business
          process mastery. We see a future where businesses are no longer
          limited by rigid, static workflows, but empowered by intelligent
          systems that continuously optimize themselves, simplify complex
          processes, foster collaborative innovations, and provide insights for
          decision-making. TechBlend will be synonymous with flexibility,
          providing organizations with the tools to not just survive but thrive
          in an unpredictable business landscape.
        </p>
      </div>
    </div>
  </div>
);

export default About;
