import {
  retrieveKnowledge,
  formatRetrievedKnowledge,
} from "./retrieveKnowledge.js";

const queries = [
  "What technologies does Asjad know?",
  "Tell me about VaultPay",
  "Where did Asjad study?",
  "What was his internship at Ethnus?",
];

for (const query of queries) {
  console.log(`\nQUESTION: ${query}`);

  const results = retrieveKnowledge(query);

  console.log(formatRetrievedKnowledge(results));
}