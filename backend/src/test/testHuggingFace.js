const fetch = require("node-fetch");
const huggingFaceApiToken = process.env.HUGGING_FACE_API_TOKEN; // Ensure token is stored in environment

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/NousResearch/Hermes-3-Llama-3.1-8B",
    {
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  return result;
}

query({ inputs: "Can you please let us know more details about yours?" }).then(
  (response) => {
    console.log(JSON.stringify(response));
  }
);
