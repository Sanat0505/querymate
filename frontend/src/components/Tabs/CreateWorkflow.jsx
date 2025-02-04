import React, { useEffect, useRef, useState } from "react";
import BpmnView from "./BpmnView";
import { HfInference } from "@huggingface/inference";
import {generateBPMNXML} from "../../services/generateWorkflows"
import {setBpmnXml} from "../../store/DataSlice"
import { toast } from 'react-toastify';
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

  const client = new HfInference(`${process.env.REACT_APP_HFINTERFACETOKEN}`);


  const cleanJsonResponse = (response) => {
    try {
      // Remove backticks and any non-JSON text (e.g., "```json" and "```")
      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}") + 1;
      const cleanedResponse = response.substring(jsonStart, jsonEnd);
  
      // Parse the cleaned JSON
      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Error cleaning/parsing JSON response:", error);
      throw new Error("Failed to process the JSON response.");
    }
  };
  

  const generateWorkflow = async (e) => {
    // e.preventDefault();
    if (!bpmnDesc.trim()) return;
    
    const userMessage = { role: "user", content: `Role and Objective:
You are an expert in Business Process Modeling (BPMN). Your task is to generate a structured BPMN workflow based on the following user query. The workflow should comprehensively outline the steps needed to resolve the query and follow BPMN best practices.

Output Format:
The response must be in JSON format with the following structure:

"elements": An array of objects representing BPMN elements, where each object must include:

"type": One of the BPMN element types ("startEvent", "task", "exclusiveGateway", "endEvent", "subProcess").
"name": A descriptive, human-readable name for the element.
"taskType": (Required for "task" elements) The task classification:
"user" (performed by a human),
"manual" (offline/manual process),
"service" (system-automated task).
"outgoing": (must needed for "exclusiveGateway" and "parallelGateway" elements) An array of indices indicating the next possible steps.
"elements": (For "subProcess" elements) A nested array containing tasks that belong to the subprocess.
"sequenceFlows": An array representing connections between BPMN elements. Each object must contain:

"sourceRef": Index of the source element in the "elements" array.
"targetRef": Index of the target element in the "elements" array.
BPMN Workflow Design Rules:
Every process must start with a "startEvent" and end with an "endEvent".
Decision points should be represented as "exclusiveGateway" or "parallelGateway" with valid "outgoing" connections.
Tasks should be categorized appropriately as "user", "manual", or "service".
Ensure correct flow connections using "sequenceFlows", avoiding any broken links or undefined references.
Example Output:
{
  "elements": [
    { "type": "startEvent", "name": "Start Process" },
    { "type": "task", "name": "Verify User Request", "taskType": "user" },
    { "type": "exclusiveGateway", "name": "Is User Verified?", "outgoing": [3, 4] },
    { "type": "task", "name": "Approve Request", "taskType": "manual" },
    { "type": "task", "name": "Reject Request", "taskType": "manual" },
    { "type": "endEvent", "name": "Process Completed" }
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
Now, generate the BPMN workflow for the following user description:
User request: "${bpmnDesc}"

Ensure the output adheres to BPMN best practices and contains a well-structured sequence of tasks, decision points, and workflow elements.
          ` };
    setMessages((prev) => [...prev, userMessage]);
    setBpmnDesc("");
    setIsLoading(true);

    // try {
    //   const chatCompletion = await client.chatCompletion({
    //     model: "NousResearch/Hermes-3-Llama-3.1-8B",
    //     messages: [...messages, userMessage],
    //     max_tokens: 1000,
    //   });
    //   // toast.promise(chatCompletion,{pending : "Generating workflow...",success:"Workflow is generated successfully.",error:"An error occurred while generating the workflow."})

    //   const generatedAnswer = chatCompletion.choices[0].message.content.trim();
    //   const botMessage = { role: "Querymate", content: generatedAnswer };
    //   setMessages((prev) => [...prev, botMessage]);
    //   setBotMessage(JSON.parse(botMessage.content))
    //   setBpmnXml(generateBPMNXML(JSON.parse(generatedAnswer)));
    //   console.log("bpmnXml",bpmnXml)
    // } catch (error) {
    //   console.error("Error fetching answer:", error.message);
    //   setMessages((prev) => [
    //     ...prev,
    //     { role: "Querymate", content: "An error occurred while generating the workflow." },
    //   ]);
    //   // toast.error("An error occurred while generating the workflow.")
    // } finally {
    //   setIsLoading(false);
    //   // toast.success("Workflow is generated successfully.")
    // }

    toast.promise(
      client.chatCompletion({
        model: "NousResearch/Hermes-3-Llama-3.1-8B",
        messages: [...messages, userMessage],
        max_tokens: 4000,
      }),
      {
        pending: "Generating workflow...", // Pending toast message
        success: "Workflow generated successfully!", // Success toast message
        error: "An error occurred while generating the workflow.", // Error toast message
      }
    )
      .then((chatCompletion) => {
        const generatedAnswer = chatCompletion.choices[0].message.content.trim();
        const cleanedJson = cleanJsonResponse(generatedAnswer); // Clean and parse JSON
      const botMessage = { role: "Querymate", content: JSON.stringify(cleanedJson, null, 2) };

        // const botMessage = { role: "Querymate", content: generatedAnswer };
        
        console.log("bpmnXml", botMessage.content, generatedAnswer);
        // setMessages((prev) => [...prev, botMessage]);
        // setBotMessage(JSON.parse(botMessage.content));
        // setBpmnXml(generateBPMNXML(JSON.parse(generatedAnswer)));
        setMessages((prev) => [...prev, botMessage]);
      setBotMessage(cleanedJson);
      setBpmnXml(generateBPMNXML(cleanedJson));
      })
      .catch((error) => {
        console.error("Error fetching answer:", error.message);
        setMessages((prev) => [
          ...prev,
          { role: "Querymate", content: "An error occurred while generating the workflow." },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  toast.success("Workflow generated successfully...")
  // console.log(botMessage)
  // console.log(generateBPMNXML(JSON.parse(botMessage)))
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
    // <div className="workflow-creator">
    <div className="w-full h-auto lg:h-[88vh] max-h-[88vh] overflow-y-scroll bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">

      <h1 className="text-center text-2xl font-bold my-4">Workflow Creator</h1>
      {/* <div className="chat-container min-h-5" style={{ overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}> */}
        {/* {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))} */}
        {/* {isLoading && <div className="loading-message">Generating workflow...</div>}
        <div ref={chatEndRef}></div>
      </div> */}
      <textarea
        // value={bpmnDesc}
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
