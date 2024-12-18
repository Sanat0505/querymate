const { HfInference } = require("@huggingface/inference");

const classifyQuery = async (queryText) => {
  const client = new HfInference("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");
  try {
    const chatCompletion = await client.chatCompletion({
      model: "NousResearch/Hermes-3-Llama-3.1-8B",
      messages: [
        {
          role: "user",
          content: `${queryText}`,
        },
      ],
      max_tokens: 500,
    });

    const result = chatCompletion.choices[0].message.content.trim();
    if (result.toLowerCase().includes("automated")) {
      return "Automated";
    } else if (result.toLowerCase().includes("escalated")) {
      return "Escalated";
    }
    // const result = response.data.choices[0].message?.content || "Unknown";
    return result;
  } catch (error) {
    console.error("Error classifying query:", error.message);
    // res.status(500).json({ error: "Failed to classify query" });
  }
};

module.exports = { classifyQuery };
