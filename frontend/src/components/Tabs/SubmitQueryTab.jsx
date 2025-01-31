import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { submitQueryApi, createWorkflowApi } from "../../services/api";
import {generateBPMNXML} from "../../services/generateWorkflows"
import {toast} from "react-toastify"

const SubmitQueryTab = ({userData}) => {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("Workflow name");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const client = new HfInference(`${process.env.REACT_APP_HFINTERFACETOKEN}`);

  const userSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a query!");
      return;
    }

    setIsLoading(true);
    setAnswer("");

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

    try {
//       const classificationResponse = await client.chatCompletion({
//         model: "NousResearch/Hermes-3-Llama-3.1-8B",
//         messages: [
//           {
//             role: "user",
//             content: `You are an intelligent assistant trained to classify customer support queries into two categories: "Automated" or "Escalated." Use the following criteria:

// 1. Automated Queries:
//    -> Queries that can be addressed using predefined responses, FAQs, or standard procedures.
//    ->Examples:
//      -> "How can I reset my password?"
//      -> "What is your refund policy?"
//      -> "What are your business hours?"

// 2. Escalated Queries:
//    -> Queries that require human intervention, manual review, or access to account-specific or sensitive information.
//    -> Examples:
//      -> "Can you check my order status?"
//      -> "I was charged twice for a subscription. Can you process a refund?"
//      -> "My account has been suspended. Can you help?"

// Now, based on the above criteria, classify the following query into one of the two categories:
// "${query}"

// Respond with one word only: "Automated" or "Escalated".
// `,
//           },
//         ],
//         max_tokens: 500,
//       });

//       const classification = classificationResponse.choices[0].message.content.trim().toLowerCase();

const res = await submitQueryApi(query)
      if (res.classification === "Automated") {
         setAnswer(res?.response);
        toast.success("Your query has been automatically solved by AI...!")
      } else if (res.classification==="Escalated") {
        // await submitQueryApi({ queryText: query, classification: "Escalated" });
        setAnswer(res?.response);
        
        const bpmnDesc = await client.chatCompletion({
                  model: "NousResearch/Hermes-3-Llama-3.1-8B",
                  messages: [
                    {
                      role: "user",
                      content: `
 Role and Objective:
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
Now, generate the BPMN workflow for the following user query:
User Query: "${query}"

Ensure the output adheres to BPMN best practices and contains a well-structured sequence of tasks, decision points, and workflow elements.
`
                    },
                  ],
                  max_tokens: 1000,
                });
          
              const classification = bpmnDesc.choices[0].message.content.trim();
              const cleanedJson = cleanJsonResponse(classification);
              console.log("classification",cleanedJson);
              const bpmnXml = await generateBPMNXML(cleanedJson);
              console.log("bpmnXml",bpmnXml);
              toast.info("Your query has been escalated to the admin team for review.")
              await createWorkflowApi({bpmnXml,query,userData, name})
      
      } else {
        setAnswer("Unexpected classification result. Please try again.");
        toast.info("Unexpected classification result. Please try again.")
      }
    } catch (error) {
      console.error("Error processing query:", error.message);
      toast.error("An error occurred while processing the query.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedAnswer = () => {
    if (!answer) return null;

    const lines = answer.split("\n");
    const bulletPoints = lines.filter(
      (line) =>
        line.trim().startsWith("-") ||
        line.trim().startsWith("•") ||
        /^\d+\./.test(line)
    );

    if (bulletPoints.length > 0) {
      return (
        <ul className="list-disc pl-6">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point.replace(/^-|•|\d+\./, "").trim()}</li>
          ))}
        </ul>
      );
    }

    const paragraphs = answer.split("\n\n").filter((para) => para.trim().length > 0);

    return (
      <div>
        {paragraphs.map((para, index) => (
          <p key={index} className="mb-4">
            {para.trim()}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-auto lg:h-[88vh] max-h-[88vh] overflow-scroll bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Submit Your Query
      </h3>
      <form onSubmit={userSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Describe your query..."
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Answer:
        </h4>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-800 dark:text-white">
          {isLoading ? "Processing your query..." : renderFormattedAnswer()}
        </div>
      </div>
    </div>
  );
};

export default SubmitQueryTab;
