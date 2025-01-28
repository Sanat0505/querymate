import React from "react";
import ContactUs from "./ContactUs";
import sanatImage from "../assets/images/sanat1.png";
import asmaImage from "../assets/images/asma.png";
import anushkaImage from "../assets/images/anushka.png";
import aartiImage from "../assets/images/aarti.png";
import shehlaImage from "../assets/images/shehla.png";
import Product from "./Product";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const teamMembers = [
  {
    name: "Sanatkumar Kakadiya",
    role: "Full Stak Developer",
    description:
      "Passionate about web development, particularly in D-Apps(Decentrelized Applications development using bloackchain)",
    image: sanatImage,
    github: "https://github.com/Sanat0505/",
    linkedin: "https://www.linkedin.com/in/sanat-kakadiya-90a2b6190/",
  },
  {
    name: "Anushka Jajal",
    role: "Backend developer",
    description:
      "I am a backend developer specializing in Python and Django, with a strong foundation in building scalable web applications. ",
    image: anushkaImage,
    github: "https://github.com/Annnu04",
    linkedin: "https://www.linkedin.com/in/anushka-jajal-687760307/",
  },
  {
    name: "Asmaa Abubader",
    role: "Data Analyst",
    description:
      "A UX Designer in progress ( as entry level). Having a solid knowledge using Mysql",
    image: asmaImage,
    github: "https://github.com/as650",
    linkedin: "#",
  },
  {
    name: "Aarti Majumdar",
    role: "QA Specialist",
    description:
      "Deeply committed to advancing web and API development, utilizing  frontend development expertise to build responsive, intuitive, and high-performing digital solutions.",
    image: aartiImage,
    github: "#",
    linkedin: "https://www.linkedin.com/in/aarti-majumdar-4b2395172/",
  },
  {
    name: "Shehla Shehla",
    role: "Backend Developer",
    description:
      "A dedicated and enthusiastic individual with a passion for Software Development and Backend Development.",
    image: shehlaImage,
    github: "https://github.com/ENGRSHEHLA",
    linkedin: "https://www.linkedin.com/in/shehla-shehla-634865211/",
  },
];

const Team = () => {
  return (
    <div
      id="team"
      className="min-h-screen bg-silver_main text-black rounded-lg border-2 border-black"
    >
      {/* About Section */}
      <section className="py-10 px-5 text-center">
        <h2 className="lg:text-4xl text-3xl font-semibold mb-4">
          Meet Our Team
        </h2>
        <p className="lg:text-2xl text-lg">
          We are a group of dedicated students in development and design,
          focused on building innovative tech solutions and advancing our skills
          through hands-on projects.
        </p>
      </section>

      {/* Team Section */}

      <section className="flex flex-wrap items-center justify-center gap-8 p-5 md:p-10 max-w-6xl mx-auto">
        {/* <Tooltip
          className="max-lg:hidden"
          id="my-tooltip"
          style={{ backgroundColor: "rgb(0, 0, 0)", color: "#C0C0C0" }}
        /> */}
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white hover:cursor-pointer rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            // data-tooltip-id="my-tooltip"
            // data-tooltip-content={member.description}
            // data-tooltip-place={`${index + 1 < 4 ? "top" : "bottom"}`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[calc(50vh-64px)] object-cover object-center"
            />
            <div className="p-6 text-justify">
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="text-lg flex justify-center items-center gap-2 text-gray-500">
                  <a target="_blank" href={member.github}>
                    <FaGithub className="hover:text-black" />
                  </a>
                  <a target="_blank" href={member.linkedin}>
                    <FaLinkedin className="hover:text-blue_main" />
                  </a>
                </div>
              </div>

              {/* <p className="mt-3 text-gray-700">{member.description}</p> */}
            </div>
          </div>
        ))}
      </section>

      <Product />

      <ContactUs />
    </div>
  );
};

export default Team;
