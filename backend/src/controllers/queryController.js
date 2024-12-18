const Query = require("../models/queryModel");
const axios = require("axios");
const { classifyQuery } = require("../services/huggingFaceService");

// Submit a Query
const submitQuery = async (req, res) => {
  const { queryText } = req.body;
  let automatedResponse = "";
  let status = "";
  try {
    // Use Hugging Face service to classify the query
    const classification = await classifyQuery(
      `Classify this query as "Automated" or "Escalated": ${queryText}`
    );
    // Save the query in the database
    if (classification === "Automated") {
      automatedResponse = await classifyQuery(queryText);
      status = "Done";
    }
    const query = new Query({
      userId: req.user.id,
      queryText,
      classification,
      response: automatedResponse,
      status: status,
    });
    console.log("classification", classification);
    await query.save();
    res.status(201).json({
      message: "Query submitted",
      classification,
      response: automatedResponse || "Query escalated to admin.",
    });
  } catch (error) {
    console.log("eror", error);
    res.status(500).json({ message: "Error submitting query", error });
  }
};

// Get User Queries
const getUserQueries = async (req, res) => {
  try {
    const queries = await Query.find({ userId: req.user.id });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching queries", error });
  }
};
// parse the description
const parseDescription = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    // Call NLP model to parse description
    const response = await classifyQuery(
      `Convert this process description into structured BPMN JSON. The JSON format should look like this:
        {
          "elements": [
            { "type": "startEvent", "name": "Start" },
            { "type": "task", "name": "Task Name" },
            { "type": "endEvent", "name": "End" }
          ],
          "connections": [
            { "source": "Start", "target": "Task Name" },
            { "source": "Task Name", "target": "End" }
          ]
        }
        Convert the following description: ${description}`
    );
    // console.log("responseNNN", response);

    // Example output from model
    const parsedElements = JSON.parse(response);

    // Send parsed structure to frontend
    // console.log("parsedElements", parsedElements);
    res.json({ bpmnStructure: parsedElements });
  } catch (error) {
    console.error("Error parsing description:", error.message);
    res.status(500).json({ error: "Failed to parse description" });
  }
};

module.exports = { submitQuery, getUserQueries, parseDescription };
