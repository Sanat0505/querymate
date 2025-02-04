const Query = require("../models/queryModel");
const axios = require("axios");
const { classifyQuery } = require("../services/huggingFaceService");

// Submit a Query
const submitQuery = async (req, res) => {
  const { queryText,classification, automatedResponse, userId } = req.body;
  // let automatedResponse = "";
  console.log("classification", classification, userId);
  let status = "";
  try {
    // Use Hugging Face service to classify the query
    //     const classification = await classifyQuery(
    //       `
    // Classify the following user query into either:
    // 1️. **Automated Response** - If the issue can be resolved using predefined steps from the knowledge base.
    // 2️. **Escalated to Admin** - If the issue requires manual review due to security risks, billing disputes, advanced technical problems, or account restrictions.

    // Ensure that:
    // - **Security, Fraud, or Account Compromise Issues** → Always escalated.
    // - **Billing Disputes (e.g., incorrect charges, failed refunds)** → Always escalated.
    // - **Technical Failures (e.g., data loss, system bugs, API errors)** → Always escalated.
    // - **General Inquiries (FAQs, how-to questions, common errors, simple troubleshooting)** → Automated Response.

    //   Based on below queries, you can classify accordingly,
    //   "Query	Classification"
    // "How do I reset my password?"->Automated
    // "I forgot my username, how can I recover it?"->Automated
    // "Why is my account locked?"	->Escalated
    // "I am unable to log in despite entering the correct credentials."->	Escalated
    // "Can I change my registered email address?"	->Automated
    // "My 2FA code is not working, what should I do?"->	Escalated
    // "How do I enable two-factor authentication?"->	Automated
    // "How do I delete my account permanently?"	->Escalated
    // "How do I update my payment method?"->	Automated
    // "I was charged twice for my subscription. Can I get a refund?"	->Escalated
    // "Why is my payment failing?"	->Escalated
    // "How do I cancel my subscription?"	->Automated
    // "Can I change my billing cycle?"	->Automated
    // "How do I get an invoice for my purchase?"	->Automated
    // "I canceled my subscription, but I was still charged."	->Escalated
    // "Can I get a refund for my last payment?"->	Escalated
    // "Where is my order?"	->Automated
    // "Can I track my order?"	->Automated
    // "My order is delayed, what should I do?"	->Escalated
    // "Can I change the shipping address for my order?"	->Escalated
    // "How long does delivery take?"	->Automated
    // "I received the wrong item, what should I do?"	->Escalated
    // "How do I cancel my order?"	->Automated
    // "Do you offer international shipping?"	->Automated
    // "The website is not loading for me. What should I do?"	->Automated
    // "Why am I getting an error while making a payment?"->	Escalated
    // "My app keeps crashing, how can I fix it?"	->Escalated
    // "How do I report a bug in the app?"	->Escalated
    // "How do I clear my cache and cookies?"	->Automated
    // "Why is my account not syncing across devices?"->	Escalated
    // "How do I update my profile details?"->	Automated
    // "Can I export my data from your platform?"	->Automated
    // "How do I use feature X?"->	Automated
    // "Can I integrate this product with my existing software?"->	Escalated
    // "Is there an API available?"	->Automated
    // "Can you provide a custom solution for my company?"->	Escalated
    // "What are the pricing plans for your services?"	->Automated
    // "What are your working hours?"	->Automated
    // "How do I contact customer support?"	->Automated
    // "Do you have a physical store?"	->Automated
    // "Can I schedule a call with your support team?"->	Escalated
    // "Do you offer discounts for students?"->	Automated
    // "How do I unsubscribe from emails?"->	Automated
    // "How do I reset my password?"	->Automated
    // "Can I change my email address?"	->Automated
    // "Why was my account locked?"	->Escalated
    // "I forgot my username, how do I recover it?"	->Automated
    // "How can I enable two-factor authentication?"	->Automated
    // "My login attempts keep failing, what should I do?"	->Escalated
    // "How do I delete my account permanently?"	->Escalated
    // "Why is my two-factor authentication not working?"	->Escalated
    // "How do I change my phone number for login verification?"	->Automated
    // "I keep getting a CAPTCHA verification, how can I disable it?"	->Automated
    // "How can I update my payment method?"	->Automated
    // "Can I switch my billing cycle from monthly to yearly?"	->Automated
    // "I was charged twice, how do I get a refund?"	->Escalated
    // "Why is my payment failing?"	->Escalated
    // "Can I get an invoice for my last purchase?"->	Automated
    // "How do I cancel my subscription?"	->Automated
    // "I canceled my plan, but I was still charged."	->Escalated
    // "Do you offer refunds for accidental purchases?"	->Escalated
    // "How do I redeem a gift card or promo code?"	->Automated
    // "Can I change my credit card details for auto-renewal?"->	Automated
    // "Why is the website not loading?"->	Automated
    // "How do I report a bug in the app?"	->Escalated
    // "The app keeps crashing on my phone, what should I do?"->	Escalated
    // "Why am I getting a 500 error when trying to log in?"->	Escalated
    // "How can I clear my cache and cookies?"->	Automated
    // "Why does my session keep expiring?"->	Automated
    // "I lost all my saved data, can it be recovered?"	->Escalated
    // "Why am I getting an invalid token error?"	->Escalated
    // "How do I enable dark mode in the app?"	->Automated
    // "Why is my two-factor authentication not sending a code?"->	Escalated
    // "Where is my order?"->	Automated
    // "How long does shipping take?"->	Automated
    // "Can I track my order?"->	Automated
    // "My package hasn’t arrived, what should I do?"->	Escalated
    // "I received the wrong item, can I get a replacement?"->	Escalated
    // "Can I change my shipping address after placing the order?"->	Escalated
    // "My order is marked as delivered but I haven’t received it."->	Escalated
    // "How do I return a product?"->	Automated
    // "Do you offer international shipping?"->	Automated
    // "Can I schedule a delivery for a specific date?"->	Automated
    // "How do I use feature X?"->	Automated
    // "Can I export my data from your platform?"->	Automated
    // "Do you offer API access?"->	Automated
    // "Can I integrate this product with my existing software?"->	Escalated
    // "Do you offer discounts for students or non-profits?"->	Automated
    // "How do I get early access to beta features?"->	Escalated
    // "Do you offer a free trial?"->	Automated
    // "Can you provide a custom plan for enterprise clients?"->	Escalated
    // "What happens if I exceed my usage limit?"	->Automated
    // "How do I request a demo of the product?"->	Automated
    // "What are your working hours?"	->Automated
    // "How do I contact customer support?"	->Automated
    // "Do you have a physical store?"	->Automated
    // "Can I schedule a call with your support team?"->	Escalated
    // "Do you have a refund policy?"->	Automated
    // "Can I speak with a manager?"	->Escalated
    // "What happens to my data after I delete my account?"	->Escalated
    // "Do you comply with GDPR regulations?"->	Escalated
    // "How do I unsubscribe from your emails?"->	Automated
    // "Where is your company headquartered?"->	Automated

    // Now, categorize the following query accordingly:

    // "${queryText}"

    // Respond with one word only: "Automated" or "Escalated".
    // `
    //     );
    // Save the query in the database
    // if (classification === "Automated") {
    //   automatedResponse = await classifyQuery(queryText);
    //   status = "Completed";
    // }
    const query = new Query({
      userId: userId,
      queryText,
      classification,
      response: automatedResponse,
      status: status,
    });
    console.log("classification", classification);
    await query.save();
    res.status(201).json({
      message: "Query submitted",
      userId: req.user.id,
      queryText,
      classification,
      status: status || "Pending",
      response:
        automatedResponse ||
        "Your query has been escalated to the admin team for review.",
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
