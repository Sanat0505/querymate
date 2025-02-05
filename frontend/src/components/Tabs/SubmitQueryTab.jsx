import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { submitQueryApi, createWorkflowApi } from "../../services/api";
import {generateBPMNXML} from "../../services/generateWorkflows"
import {toast} from "react-toastify"
// const Groq = require("groq-sdk");
// const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY });
const client = new HfInference(`${process.env.REACT_APP_HFINTERFACETOKEN}`);
const client2 = new HfInference(`${process.env.REACT_APP_HFINTERFACETOKEN2}`);

const SubmitQueryTab = ({userData}) => {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("Workflow name");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const userSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a query!");
      return;
    }

    setIsLoading(true);
    setAnswer("");
// console.log("${process.env.REACT_APP_HFINTERFACETOKEN2}",`${process.env.REACT_APP_HFINTERFACETOKEN2}`)
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
      const classificationResponse = await client.chatCompletion({
        model: "NousResearch/Hermes-3-Llama-3.1-8B",
        messages: [
          {
            role: "user",
            content: `
            Classify the following user query into either:
1️. **Automated Response** - If the issue can be resolved using predefined steps from the knowledge base.  
2️. **Escalated to Admin** - If the issue requires manual review due to security risks, billing disputes, advanced technical problems, or account restrictions.  

Ensure that:  
- **Security, Fraud, or Account Compromise Issues** → Always escalated.  
- **Billing Disputes (e.g., incorrect charges, failed refunds)** → Always escalated.  
- **Technical Failures (e.g., data loss, system bugs, API errors)** → Always escalated.  
- **General Inquiries (FAQs, how-to questions, common errors, simple troubleshooting)** → Automated Response.  

  Based on below queries, you can classify accordingly,
  "Query	Classification"
"How do I reset my password?"->Automated
"I forgot my username, how can I recover it?"->Automated
"Why is my account locked?"	->Escalated
"I am unable to log in despite entering the correct credentials."->	Escalated
"Can I change my registered email address?"	->Automated
"My 2FA code is not working, what should I do?"->	Escalated
"How do I enable two-factor authentication?"->	Automated
"How do I delete my account permanently?"	->Escalated
"How do I update my payment method?"->	Automated
"I was charged twice for my subscription. Can I get a refund?"	->Escalated
"Why is my payment failing?"	->Escalated
"How do I cancel my subscription?"	->Automated
"Can I change my billing cycle?"	->Automated
"How do I get an invoice for my purchase?"	->Automated
"I canceled my subscription, but I was still charged."	->Escalated
"Can I get a refund for my last payment?"->	Escalated
"Where is my order?"	->Automated
"Can I track my order?"	->Automated
"My order is delayed, what should I do?"	->Escalated
"Can I change the shipping address for my order?"	->Escalated
"How long does delivery take?"	->Automated
"I received the wrong item, what should I do?"	->Escalated
"How do I cancel my order?"	->Automated
"Do you offer international shipping?"	->Automated
"The website is not loading for me. What should I do?"	->Automated
"Why am I getting an error while making a payment?"->	Escalated
"My app keeps crashing, how can I fix it?"	->Escalated
"How do I report a bug in the app?"	->Escalated
"How do I clear my cache and cookies?"	->Automated
"Why is my account not syncing across devices?"->	Escalated
"How do I update my profile details?"->	Automated
"Can I export my data from your platform?"	->Automated
"How do I use feature X?"->	Automated
"Can I integrate this product with my existing software?"->	Escalated
"Is there an API available?"	->Automated
"Can you provide a custom solution for my company?"->	Escalated
"What are the pricing plans for your services?"	->Automated
"What are your working hours?"	->Automated
"How do I contact customer support?"	->Automated
"Do you have a physical store?"	->Automated
"Can I schedule a call with your support team?"->	Escalated
"Do you offer discounts for students?"->	Automated
"How do I unsubscribe from emails?"->	Automated
"How do I reset my password?"	->Automated
"Can I change my email address?"	->Automated
"Why was my account locked?"	->Escalated
"I forgot my username, how do I recover it?"	->Automated
"How can I enable two-factor authentication?"	->Automated
"My login attempts keep failing, what should I do?"	->Escalated
"How do I delete my account permanently?"	->Escalated
"Why is my two-factor authentication not working?"	->Escalated
"How do I change my phone number for login verification?"	->Automated
"I keep getting a CAPTCHA verification, how can I disable it?"	->Automated
"How can I update my payment method?"	->Automated
"Can I switch my billing cycle from monthly to yearly?"	->Automated
"I was charged twice, how do I get a refund?"	->Escalated
"Why is my payment failing?"	->Escalated
"Can I get an invoice for my last purchase?"->	Automated
"How do I cancel my subscription?"	->Automated
"I canceled my plan, but I was still charged."	->Escalated
"Do you offer refunds for accidental purchases?"	->Escalated
"How do I redeem a gift card or promo code?"	->Automated
"Can I change my credit card details for auto-renewal?"->	Automated
"Why is the website not loading?"->	Automated
"How do I report a bug in the app?"	->Escalated
"The app keeps crashing on my phone, what should I do?"->	Escalated
"Why am I getting a 500 error when trying to log in?"->	Escalated
"How can I clear my cache and cookies?"->	Automated
"Why does my session keep expiring?"->	Automated
"I lost all my saved data, can it be recovered?"	->Escalated
"Why am I getting an invalid token error?"	->Escalated
"How do I enable dark mode in the app?"	->Automated
"Why is my two-factor authentication not sending a code?"->	Escalated
"Where is my order?"->	Automated
"How long does shipping take?"->	Automated
"Can I track my order?"->	Automated
"My package hasn’t arrived, what should I do?"->	Escalated
"I received the wrong item, can I get a replacement?"->	Escalated
"Can I change my shipping address after placing the order?"->	Escalated
"My order is marked as delivered but I haven’t received it."->	Escalated
"How do I return a product?"->	Automated
"Do you offer international shipping?"->	Automated
"Can I schedule a delivery for a specific date?"->	Automated
"How do I use feature X?"->	Automated
"Can I export my data from your platform?"->	Automated
"Do you offer API access?"->	Automated
"Can I integrate this product with my existing software?"->	Escalated
"Do you offer discounts for students or non-profits?"->	Automated
"How do I get early access to beta features?"->	Escalated
"Do you offer a free trial?"->	Automated
"Can you provide a custom plan for enterprise clients?"->	Escalated
"What happens if I exceed my usage limit?"	->Automated
"How do I request a demo of the product?"->	Automated
"What are your working hours?"	->Automated
"How do I contact customer support?"	->Automated
"Do you have a physical store?"	->Automated
"Can I schedule a call with your support team?"->	Escalated
"Do you have a refund policy?"->	Automated
"Can I speak with a manager?"	->Escalated
"What happens to my data after I delete my account?"	->Escalated
"Do you comply with GDPR regulations?"->	Escalated
"How do I unsubscribe from your emails?"->	Automated
"Where is your company headquartered?"->	Automated

Now, categorize the following query accordingly just "Automated" or "Escalted" :  

"${query}"  


Respond with one word only: "Automated" or "Escalated".
`,
          },
        ],
        max_tokens: 500,
      });

      const classification = classificationResponse.choices[0].message.content.trim().toLowerCase();


      // console.log(classification,"classification")

      if (classification === "automated") {
        // console.log('..............')
        const res = await client.chatCompletion({
          model: "NousResearch/Hermes-3-Llama-3.1-8B",
          messages: [
            {
              role: "user",
              content: `
  ${query}  
  `,
            },
          ],
          max_tokens: 1500,
        });
  
        const automatedResponse = res.choices[0].message.content.trim().toLowerCase();
        // console.log("automatedResponse",automatedResponse)
        await submitQueryApi(query,classification,automatedResponse,userData?.id);
         setAnswer(automatedResponse);
         toast.success("Your query has been automatically solved by AI...!")
      } else if (classification==="escalated") {
        // await submitQueryApi({ queryText: query, classification: "Escalated" });
        setAnswer("Your query has been escalted for review");
        
        const bpmnDesc = await client2.chatCompletion({
                  model: "NousResearch/Hermes-3-Llama-3.1-8B",
                  messages: [
                    {
                      role: "user",
                      content: `Role and Objective:
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
User request: "${query}"

Ensure the output adheres to BPMN best practices and contains a well-structured sequence of tasks, decision points, and workflow elements.
          `
                    },
                  ],
                  max_tokens: 4000,
                });
          
              const classification = bpmnDesc.choices[0].message.content.trim();
              
              // console.log("classificationbpmn",classification);
              const cleanedJson = cleanJsonResponse(classification);
              // console.log("classification",cleanedJson);
              const bpmnXml = await generateBPMNXML(cleanedJson);
              // console.log("bpmnXml",bpmnXml);
              toast.info("Your query has been escalated to the admin team for review.")
              await createWorkflowApi({bpmnXml,query,userData, name,cleanedJson})
      
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
