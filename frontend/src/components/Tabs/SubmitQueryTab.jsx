import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { submitQueryApi } from "../../services/api";

const SubmitQueryTab = () => {
  const [query, setQuery] = useState(""); // State for user query input
  const [answer, setAnswer] = useState(""); // Full AI-generated answer
  const [typingAnswer, setTypingAnswer] = useState(""); // Typing effect text
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const client = new HfInference("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");

  // Function to handle user query submission
  const userSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a query!");
      return;
    }

    setIsLoading(true);
    setAnswer("");
    setTypingAnswer("");

    try {
      const chatCompletion = await client.chatCompletion({
        model: "NousResearch/Hermes-3-Llama-3.1-8B",
        messages: [{ role: "user", content:  `${query}` }],
        max_tokens: 500,
      });

      const generatedAnswer = chatCompletion.choices[0].message.content.trim();
      setAnswer(generatedAnswer);
      console.log("chatCompletion",chatCompletion)

      // Start typing effect with the updated logic
      // startTypewritingEffect(generatedAnswer);
     const response = await submitQueryApi(query)
    } catch (error) {
      console.error("Error fetching answer:", error.message);
      alert("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function for the typewriting effect
  const startTypewritingEffect = (text) => {
    let index = "-1";
    setTypingAnswer(""); // Reset typing answer before starting

    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingAnswer((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval); // Stop when the full text is displayed
      }
    }, 10); // Adjust typing speed here
  };

  // Render formatted text including bullet points if present
  const renderFormattedAnswer = () => {
    if (!answer) return null;

    // Check if the response contains bullet points
    const lines = answer.split("\n");
    const bulletPoints = lines.filter((line) => line.trim().startsWith("-") || line.trim().startsWith("•") || /^\d+\./.test(line));

    if (bulletPoints.length > 0) {
      return (
        <ul className="list-disc pl-6">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point.replace(/^-|•|\d+\./, "").trim()}</li> // Cleaning the bullet prefix
          ))}
        </ul>
      );
    }
    return <p>{typingAnswer}</p>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Submit Your Query</h3>
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
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* Display the formatted answer */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Answer:</h4>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-800 dark:text-white">
          {isLoading ? "Wait for a moment..." : renderFormattedAnswer()}
        </div>
      </div>
    </div>
  );
};

export default SubmitQueryTab;
