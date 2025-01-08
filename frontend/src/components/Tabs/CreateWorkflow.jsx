import React, { useEffect, useRef, useState } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import ReactBpmn from "react-bpmn";
import BpmnView from "./BpmnView";
import { HfInference } from "@huggingface/inference";
import {generateBPMNXML} from "../../services/generateWorkflows"
import {setBpmnXml} from "../../store/DataSlice"
// import { useDispatch, useSelector } from "react-redux";

const WorkflowCreator = () => {
  // const modelerRef = useRef();
  const [bpmnDesc, setBpmnDesc] = useState(""); 
  const [messages, setMessages] = useState([]); // Chat messages
  const [botMessage, setBotMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [bpmnXml, setBpmnXml] = useState(""); // Loading state
  const chatEndRef = useRef(null);
  // const bpmnXml = useSelector((state) => state.data.bpmnXml);
  // const dispatch = useDispatch();

  const client = new HfInference("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");


  const generateWorkflow = async (e) => {
    // e.preventDefault();
    if (!bpmnDesc.trim()) return;
    
    const userMessage = { role: "user", content: `You are an expert in business process modeling. Generate a process description for a BPMN diagram. The output should be a structured JSON object with two main parts:

1. **elements**: An array of objects where each object describes a BPMN element. Each element has:
   - "type": The type of BPMN element (e.g., "startEvent", "task", "exclusiveGateway", "endEvent").
   - "name": A human-readable name for the element.
   - Additional properties depending on the type:
     - If the type is "task", include "taskType" (one of "user", "manual", or "service").
     - If the type is a gateway (e.g., "exclusiveGateway", "parallelGateway", "inclusiveGateway"), include "outgoing", which is an array of indices pointing to the next elements.
     - If the type is a "subProcess", include an "elements" array describing the tasks inside the sub-process.

2. **sequenceFlows**: An array of objects representing the connections between elements. Each object should have:
   - "sourceRef": The index of the source element in the "elements" array.
   - "targetRef": The index of the target element in the "elements" array.

Example of the required JSON output format:

{
  "elements": [
    { "type": "startEvent", "name": "Start" },
    { "type": "task", "name": "Task 1", "taskType": "user" },
    { "type": "exclusiveGateway", "name": "Decision", "outgoing": [3, 4] },
    { "type": "task", "name": "Task A", "taskType": "manual" },
    { "type": "task", "name": "Task B", "taskType": "user" },
    { "type": "endEvent", "name": "End" }
  ],
  "sequenceFlows": [
    { "sourceRef": 0, "targetRef": 1 },
    { "sourceRef": 1, "targetRef": 2 },
    { "sourceRef": 2, "targetRef": 3 },
    { "sourceRef": 2, "targetRef": 4 },
    { "sourceRef": 3, "targetRef": 5 },
    { "sourceRef": 4, "targetRef": 5 }
  ]
}
: ${bpmnDesc}` };
    setMessages((prev) => [...prev, userMessage]);
    setBpmnDesc("");
    setIsLoading(true);

    try {
      const chatCompletion = await client.chatCompletion({
        model: "NousResearch/Hermes-3-Llama-3.1-8B",
        messages: [...messages, userMessage],
        max_tokens: 1000,
      });

      const generatedAnswer = chatCompletion.choices[0].message.content.trim();
      const botMessage = { role: "bot", content: generatedAnswer };
      setMessages((prev) => [...prev, botMessage]);
      setBotMessage(JSON.parse(botMessage.content))
      setBpmnXml(generateBPMNXML(JSON.parse(generatedAnswer)));
      console.log("bpmnXml",bpmnXml)
    } catch (error) {
      console.error("Error fetching answer:", error.message);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "An error occurred while generating the workflow." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateWorkflow();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,botMessage]);


 const userClick = () => {
  const processDescription = botMessage;
  console.log(botMessage)
  // dispatch(setBpmnXml(generateBPMNXML(processDescription)));
  // setBpmnXml(generateBPMNXML(botMessage));
  // console.log(generateBPMNXML(botMessage));
 }

  return (
    // <div>
    //   <h1 className="text-center text-2xl font-bold my-4">Workflow Creator</h1>
    //   {/* <form > */}
    //     <textarea
    //       // value={query}
    //       onChange={(e) => setBpmnDesc(e.target.value)}
    //       className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    //       placeholder="Describe your workflow..."
    //     ></textarea>
    //     <button
    //       type="submit"
    //       onClick={generateWorkflow}
    //       className="mt-4 w-full bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
    //       // disabled={isLoading} // Disable button while loading
    //     >
    //       {/* {isLoading ? "Loading..." : "Submit"} */}
    //       Generate Workflow
    //     </button>
    //     {/* </form> */}
    //     <div
    //     // id="bpmn-container"
    //     style={{
    //       width: "100%",
    //       height: "500px",
    //       border: "1px solid #ccc",
    //       borderRadius: "4px",
    //       marginTop:"10px"
    //     }}
    //   >
    //   <BpmnView />
    //   </div>
    // </div>
    <div className="workflow-creator">
      <h1 className="text-center text-2xl font-bold my-4">Workflow Creator</h1>
      <div className="chat-container" style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
        {isLoading && <div className="loading-message">Generating workflow...</div>}
        <div ref={chatEndRef}></div>
      </div>
      <textarea
        value={bpmnDesc}
        onChange={(e) => setBpmnDesc(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your workflow and press Enter..."
        className="w-full p-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
        rows="3"
      ></textarea>
   <button
          type="submit"
          onClick={userClick}
          className="mt-4 w-full bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
          // disabled={isLoading} // Disable button while loading
        >
          {/* {isLoading ? "Loading..." : "Submit"} */}
          Generate Workflow
        </button>
<div
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop:"10px"
        }}
      >
      <BpmnView bpmnXml={bpmnXml}/>
      </div>
    </div>
  );
};

export default WorkflowCreator;
