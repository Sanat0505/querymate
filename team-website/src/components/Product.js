import React from "react";

export default function Product() {
  return (
    <div
      id="product"
      className="p-10 text-black rounded-lg border-2 border-black"
    >
      <h2 className="lg:text-4xl text-3xl font-semibold mb-4 text-center">
        Check Out <span className="font-bold">QueryMate</span>
      </h2>
      <div
        className="w-full h-[600px] border rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onClick={() => window.open("https://tb-querymate.vercel.app", "_blank")}
      >
        <iframe
          src="https://tb-querymate.vercel.app"
          className="w-full h-full cursor-pointer"
          title="QueryMate"
          style={{
            overflow: "hidden",
            scrollbarWidth: "none", // Hide scrollbar in Firefox
          }}
        ></iframe>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
