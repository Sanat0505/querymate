import React, { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import ReactBpmn from "react-bpmn";
import BpmnView from "./BpmnView";

// const generateBpmnXml = (bpmnStructure) => {
//   const { elements, connections } = bpmnStructure;

//   const elementsXml = elements
//     .map((el) => {
//       if (el.type === "startEvent") {
//         return `<bpmn:startEvent id="${el.name.replace(/\s+/g, "_")}" name="${el.name}" />`;
//       } else if (el.type === "task") {
//         return `<bpmn:task id="${el.name.replace(/\s+/g, "_")}" name="${el.name}" />`;
//       } else if (el.type === "endEvent") {
//         return `<bpmn:endEvent id="${el.name.replace(/\s+/g, "_")}" name="${el.name}" />`;
//       }
//       return "";
//     })
//     .join("\n");

//   const connectionsXml = connections
//     .map((conn) => {
//       return `<bpmn:sequenceFlow id="${conn.source.replace(/\s+/g, "_")}_to_${conn.target.replace(
//         /\s+/g,
//         "_"
//       )}" sourceRef="${conn.source.replace(/\s+/g, "_")}" targetRef="${conn.target.replace(/\s+/g, "_")}" />`;
//     })
//     .join("\n");

//   return `
//     <?xml version="1.0" encoding="UTF-8"?>
//     <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
//                       xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
//                       xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
//                       xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
//                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//                       id="Definitions_1">
//       <bpmn:process id="Process_1" isExecutable="true">
//         ${elementsXml}
//         ${connectionsXml}
//       </bpmn:process>
//     </bpmn:definitions>
//   `;
// };


const WorkflowCreator = () => {
  // const modelerRef = useRef();

  // Example BPMN structure
  const bpmnStructure = {
    elements: [
      { type: "startEvent", name: "New Employee Joins" },
      { type: "task", name: "Assign Onboarding Buddy" },
      { type: "task", name: "Schedule Welcome Meeting" },
      { type: "task", name: "Check Laptop Requirement" },
      { type: "task", name: "Assign Laptop" },
      { type: "task", name: "Buddy Completes Introductory Tour" },
      { type: "endEvent", name: "Conclude Onboarding Process" },
    ],
    connections: [
      { source: "New Employee Joins", target: "Assign Onboarding Buddy" },
      { source: "Assign Onboarding Buddy", target: "Schedule Welcome Meeting" },
      { source: "Schedule Welcome Meeting", target: "Check Laptop Requirement" },
      { source: "Check Laptop Requirement", target: "Assign Laptop" },
      { source: "Assign Laptop", target: "Buddy Completes Introductory Tour" },
      { source: "Buddy Completes Introductory Tour", target: "Conclude Onboarding Process" },
    ],
  };

  // Generate BPMN XML from the structure
  // const bpmnXml = generateBpmnXml(bpmnStructure);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Workflow Creator</h1>
      {/* <form > */}
        <textarea
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Describe your workflow..."
        ></textarea>
        <button
          // type="submit"
          // onClick={generateWorkflow}
          className="mt-4 w-full bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
          // disabled={isLoading} // Disable button while loading
        >
          {/* {isLoading ? "Loading..." : "Submit"} */}
          Generate Workflow
        </button>
        {/* </form> */}
        <div
        // id="bpmn-container"
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop:"10px"
        }}
      >
      {/* <ReactBpmn 
      url="./pizzaDiagram.bpmn"
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
      /> */}
      <BpmnView />
      </div>
    </div>
  );
};

export default WorkflowCreator;
