import { MongoClient } from "mongodb";
/**
 * ANCHOR: AIQuery
 * AIQuery is a class that simplifies the process of interacting with a MongoDB database
 * by allowing users to make advanced queries using natural language text. It utilizes
 * the OpenAI GPT-4 model to generate executable TypeScript code based on the given query,
 * roles, schemas, and database type, allowing for flexible and dynamic database interactions.
 *
 * The class requires an API key for OpenAI, a connected MongoClient instance, a set of JSON schemas, a list of allowed roles,
 * a database type, and any additional logic to be provided upon instantiation. The main functionality
 * is provided thro