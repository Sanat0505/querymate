import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { submitQueryApi } from "../../services/api";

const SubmitQueryTab = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const client = new HfInference("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");

  const userSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a query!");
      return;
    }

    setIsLoading(true);
    setAnswer("");

    try {
      const classificationResponse = await client.chatCompletion({
        model: "NousResearch/Hermes-3-Llama-3.1-8B",
        messages: [
          {
            role: "user",
            content: `Here are some examples:
- "How can I reset my password?" → Automated
- "What is your refund policy?" → Automated
- "Can you check my order status?" → Escalated
- "I was charged twice for a subscription. Can you process a refund?" → Escalated

Now classify the following query: ${query}`,
          },
        ],
        max_tokens: 500,
      });

      const classification = classificationResponse.choices[0].message.content.trim().toLowerCase();

      if (classification.includes("automated")) {
        const chatCompletion = await client.chatCompletion({
          model: "NousResearch/Hermes-3-Llama-3.1-8B",
          messages: [{ role: "user", content: query }],
          max_tokens: 500,
        });

        const generatedAnswer = chatCompletion.choices[0].message.content.trim();
        setAnswer(generatedAnswer);
      } else if (classification.includes("escalated")) {
        await submitQueryApi({ queryText: query, classification: "Escalated" });
        setAnswer("Your query has been escalated to the admin team for review.");
      } else {
        setAnswer("Unexpected classification result. Please try again.");
      }
    } catch (error) {
      console.error("Error processing query:", error.message);
      alert("An error occurred while processing the query.");
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
