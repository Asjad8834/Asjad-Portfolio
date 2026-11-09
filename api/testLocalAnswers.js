import generateLocalAnswer from "./localAnswers.js";

const queries = [
  "What technologies does Asjad know?",
  "Tell me about VaultPay",
  "Where did Asjad study?",
  "Tell me about Sachi",
  "What certifications does Asjad have?",
  "What was his internship at Ethnus?",
];

for (const query of queries) {
  console.log("\n=================================");
  console.log("QUESTION:", query);
  console.log("=================================\n");

  const answer = generateLocalAnswer(query);

  console.log(answer || "NO LOCAL ANSWER");
}