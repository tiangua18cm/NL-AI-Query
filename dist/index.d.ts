import { MongoClient } from "mongodb";
/**
 * ANCHOR: AIQuery
 * AIQuery is a class that simplifies the process of interacting with a MongoDB database
 * by allowing users to make advanced queries using natural language text. It utilizes
 * the OpenAI GPT-4 model to generate executable TypeScript code based on the given query,
 * roles, schemas, and database type, allowing for flexible and dynamic database interactions.
 *
 * The class requires an API ke