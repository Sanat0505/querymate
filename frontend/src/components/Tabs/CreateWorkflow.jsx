import React, { useState } from "react";
import WorkflowViewer from "../WorkflowViwer";
import bpmn from "../../assets/images/bpmn.png"

// Mock AI function to simulate workflow generation
// const generateWorkflow = (query) => {
//     if (query.toLowerCase().includes("onboarding")) {
//       return `
//         <?xml version="1.0" encoding="UTF-8"?>
//         <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//           <process id="OnboardingProcess" isExecutable="true">
//             <startEvent id="StartEvent_1" name="Start Onboarding"/>
//             <sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
//             <task id="Task_1" name="Verify Documents"/>
//             <sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Gateway_1"/>
//             <exclusiveGateway id="Gateway_1" name="Approval Needed?"/>
//             <sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2" conditionExpression="approved"/>
//             <task id="Task_2" name="Manager Approval"/>
//             <sequenceFlow id="Flow_4" sourceRef="Task_2" targetRef="EndEvent_1"/>
//             <sequenceFlow id="Flow_5" sourceRef="Gateway_1" targetRef="EndEvent_1" conditionExpression="!approved"/>
//             <endEvent id="EndEvent_1" name="Onboarding Complete"/>
//           </process>
//         </definitions>`;
//     }
//     return null;
//   };
  
  
//   const WorkflowCreator = () => {
//     const [query, setQuery] = useState("");
//     const [workflowXml, setWorkflowXml] = useState(null);
  
//     const handleGenerate = () => {
//       const xml = generateWorkflow(query);
//       if (xml) {
//         console.log("Generated BPMN XML:", xml); // Debug log
//         setWorkflowXml(xml);
//       } else {
//         alert("No matching workflow found. Please refine your query.");
//       }
//     };
  
//     return (
//       <div className="p-6 bg-gray-100 rounded shadow">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Workflow Creator</h1>
//         <textarea
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Describe your workflow (e.g., onboarding employees, handling refunds)..."
//           className="w-full p-4 border border-gray-300 rounded-lg mb-4"
//         ></textarea>
//         <button
//           onClick={handleGenerate}
//           className="bg-primary-400 text-white px-4 py-2 rounded hover:bg-primary-600"
//         >
//           Generate Workflow
//         </button>
//         <div className="mt-6">
//           {workflowXml ? <WorkflowViewer xmlData={workflowXml} /> : <p className="text-gray-600">No workflow generated yet.</p>}
//         </div>
//       </div>
//     );
//   };
  
//   export default WorkflowCreator;

const WorkflowCreator = () => {
    const [query, setQuery] = useState("");
    // const [workflowXml, setWorkflowXml] = useState(null);
    const [bpmnXml, setBpmnXml] = useState('');
  
    const handleGenerate = () => {
      const xml = generateWorkflow(query);
      if (xml) {
        setWorkflowXml(xml);
      } else {
        alert("No matching workflow found. Please refine your query.");
      }
    };
  
    const handleBpmnGenerated = (bpmnStructure) => {
      // Convert the parsed structure to BPMN XML (dummy example)
      const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_1">
          <bpmn:process id="Process_1" isExecutable="true">
            <bpmn:startEvent id="StartEvent_1" name="Start" />
            <bpmn:task id="Task_1" name="${bpmnStructure.tasks[0].name}" />
            <bpmn:endEvent id="EndEvent_1" name="End" />
            <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
            <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
          </bpmn:process>
        </bpmn:definitions>
      `;
  
      setBpmnXml(xml);
    };
    
    return (
      <div className="p-6 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Smart Workflow Creator</h1>
        <textarea
          value="Create a workflow for Customer Support Escalation"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your workflow (e.g., onboarding employees, handling refunds)..."
          className="w-full p-4 border border-gray-300 rounded-lg mb-4"
        ></textarea>
        <button
          // onClick={handleGenerate}
          className="mt-4 w-full bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
        >
          Generate Workflow
        </button>
        <div id="bpmn-container" style={{ width: "100%", height: "500px", border: "1px solid #ccc", marginTop: "20px" }}></div>
        {bpmnXml && <WorkflowCreator bpmnXml={bpmnXml} />}
        <img src={bpmn}/>
      </div>
    );
  };
  
  export default WorkflowCreator;